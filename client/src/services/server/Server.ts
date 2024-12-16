import md5 from 'md5';
import CONFIG, { EDIRECTION } from "../../config";
import Store from "../store/Store";
import { TAnswer, TError, TMessagesResponse, TUser, TMarketCatalog, TMap, TMapZone, TUpdateSceneResponse, TSell, TResources, TInventory, TCreature, TInventory, TMonsters_level, TMonsterType } from "./types";

const { CHAT_TIMESTAMP, SCENE_TIMESTAMP, HOST } = CONFIG;

class Server {
    HOST = HOST;
    store: Store;
    chatInterval: NodeJS.Timer | null = null;
    sceneInterval: NodeJS.Timer | null = null;
    inventoryInterval: NodeJS.Timer | null = null; // Добавляем интервал для инвентаря
    showErrorCb: (error: TError) => void = () => {};

    constructor(store: Store) {
        this.store = store;
    }

    // посылает запрос и обрабатывает ответ
    private async request<T>(method: string, params: { [key: string]: string } = {}): Promise<T | null> {
        try {
            params.method = method;
            const token = this.store.getToken();
            if (token) {
                params.token = token;
            }
            const response = await fetch(`${this.HOST}/?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`);
            const answer: TAnswer<T> = await response.json();
            if (answer.result === 'ok' && answer.data) {
                return answer.data;
            }
            answer.error && this.setError(answer.error);
            return null;
        } catch (e) {
            console.log(e);
            this.setError({
                code: 9000,
                text: 'Unknown error',
            });
            return null;
        }
    }

    private setError(error: TError): void {
        this.showErrorCb(error);
    }

    showError(cb: (error: TError) => void) {
        this.showErrorCb = cb;
    }

    async login(login: string, password: string): Promise<boolean> {
        const rnd = Math.round(Math.random() * 100000);
        const hash = md5(`${md5(`${login}${password}`)}${rnd}`);
        const user = await this.request<TUser>('login', { login, hash, rnd: `${rnd}` });
        if (user) {
            this.store.setUser(user);
            return true;
        }
        return false;
    }

    async logout() {
        const result = await this.request<boolean>('logout');
        if (result) {
            this.store.clearUser();
        }
        return result;
    }

    registration(login: string, password: string, name: string): Promise<boolean | null> {
        const hash = md5(`${login}${password}`);
        return this.request<boolean>('registration', { login, hash, name });
    }

    sendMessage(message: string): void {
        this.request<boolean>('sendMessage', { message });
    }

    async getMessages(): Promise<TMessagesResponse | null> {
        const hash = this.store.getChatHash();
        const result = await this.request<TMessagesResponse>('getMessages', { hash });
        if (result) {
            this.store.setChatHash(result.hash);
            return result;
        }
        return null;
    }

    startChatMessages(cb: (hash: string) => void): void {
        this.chatInterval = setInterval(async () => {
            const result = await this.getMessages();
            if (result) {
                const { messages, hash } = result;
                this.store.addMessages(messages);
                cb(hash);
            }
        }, CHAT_TIMESTAMP);
    }

    stopChatMessages(): void {
        if (this.chatInterval) {
            clearInterval(this.chatInterval);
            this.chatInterval = null;
            this.store.clearMessages();
        }
    }

    async getMarketCatalog():Promise<TMarketCatalog | null> {
        const catalog = await this.request<TMarketCatalog>('getCatalog');
        if (catalog) {
            return catalog;
        }
        return null;
    }

    async buyItem(itemId: string): Promise<boolean | null> {
        const result = await this.request<boolean>('buyItem', { itemId });
        return result;
    }

    async getTraderCatalog(): Promise<TMarketCatalog | null> {
        const catalog = await this.request<TMarketCatalog>('getTraderCatalog');
        if (catalog) {
            return catalog;
        }
        return null;
    }

    async sell(token: string, objectId: string, amount: string): Promise<TSell | null> {
        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            throw new Error('Некорректное количество для продажи'); 
        }
        const result = await this.request<TSell>('sell', {token, type: 'merchant', amount, objectId});
        return result;
    }
    

    async sellExchanger(token: string, amount: string): Promise<TSell | null> {
        const result = await this.request<TSell>('sell', { token,  type: 'exchanger', amount });
        return result;
    }
    
    async getCatalog(token: string): Promise<boolean | null> {
        const result = await this.request<boolean>('getCatalog', { token });
        return result;
    }
    
    async buyFromTrader(id: string): Promise<boolean | null> {
        const result = await this.request<boolean>('buy', { id });
        return result;
    }

    async exchangeEggsForPokemon(): Promise<{ success: boolean }> {
        // Здесь должна быть логика для запроса на сервер
        return { success: true }; // Пример возврата. Настоящая логика может отличаться.
    }

    async getMap(): Promise<{MAP: TMap, mapZones: TMapZone[]} | null> {
        return await this.request<{MAP: TMap, mapZones: TMapZone[]}>('getMap');
    }

    async moveUser(direction: EDIRECTION): Promise<boolean | null> {
        return await this.request<boolean>('moveUser', { direction });
    }

    async updateScene(): Promise<TUpdateSceneResponse | null> {
        const hash = this.store.getSceneHash();
        const result = await this.request<TUpdateSceneResponse>('updateScene', { hash });
        if (result) {
            this.store.setSceneHash(result.hash);
            return result;
        }
        return null;
    }

    async getInventory(token: string): Promise<TInventory | null> {
        try {
            const catalog = await this.request<TInventory>('getInventory', { token });
            return catalog;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            return null;
        }
    }

    startSceneUpdate(cb: (result: TUpdateSceneResponse) => void): void {
        this.sceneInterval = setInterval(async () => {
            const result = await this.updateScene();
            if (result) {
                cb(result);
            }
        }, SCENE_TIMESTAMP);
    }

    stopSceneUpdate(): void {
        if (this.sceneInterval) {
            clearInterval(this.sceneInterval);
            this.sceneInterval = null;
        }
    }

    async getInventory(token: string): Promise<TInventory | null> {
        try {
            const catalog = await this.request<TInventory>('getInventory', { token });
            return catalog;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            return null;
        }
    }

    async upgradePokemon(token: string, monsterId: number): Promise<TMonsters_level | null> {
        const result = await this.request<TMonsters_level>('upgradePokemon', { token, monsterId: monsterId.toString() });
        return result;
    }    

    async addToTeam(token: string, monsterId: number): Promise<TMonsterType | null> {
        const result = await this.request<TMonsterType>('addToTeam', { token, monsterId: monsterId.toString() });
        return result;
    }    

    async removeFromTeam(token: string, monsterId: number): Promise<TMonsterType | null> {
        const result = await this.request<TMonsterType>('addToTeam', { token, monsterId: monsterId.toString() });
        return result;
    }   
}

export default Server;