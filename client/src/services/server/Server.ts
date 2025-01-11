import md5 from 'md5';
import CONFIG, { EDIRECTION } from "../../config";
import Store from "../store/Store";
import { TAnswer, TError, TMessagesResponse, TUser, TMarketCatalog, TMap, TMapZone, 
    TUpdateSceneResponse, TSell, TResources, TCreature, TInventory, TMonsters_level, 
    TCr, TUpdateMarketResponse, TMakeBet, 
    TCancelLot,
    TUserInfo,
    TMapInfo,
    TGamerBattle} from "./types";

const { CHAT_TIMESTAMP, SCENE_TIMESTAMP, MARKET_TIMESTAMP, HOST, BATTLE_TIMESTAMP } = CONFIG;

class Server {
    HOST = HOST;
    store: Store;
    chatInterval: NodeJS.Timer | null = null;
    sceneInterval: NodeJS.Timer | null = null;
    marketInterval: NodeJS.Timer | null = null;
    inventoryInterval: NodeJS.Timer | null = null; // Добавляем интервал для инвентаря
    battleInterval: NodeJS.Timer | null = null; 
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
            this.store.clearAllHashes();
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
            this.store.clearAllHashes();
        }
    }

    async updateMarket(): Promise<TUpdateMarketResponse | null> {
        const hash = this.store.getMarketHash();
        const result = await this.request<TUpdateMarketResponse>('updateLots', { hash });
        if (result) {
            this.store.setMarketHash(result.hash);
            return result;
        }
        return null;
    }

    startMarketUpdate(cb: (result: TUpdateMarketResponse) => void): void {
        this.marketInterval = setInterval(async () => {
            const result = await this.updateMarket();
            if (result) {
                cb(result);
            }
        }, MARKET_TIMESTAMP);
    }

    stopMarketUpdate(): void {
        if (this.marketInterval) {
            clearInterval(this.marketInterval);
            this.marketInterval = null;
            this.store.clearAllHashes();
        }
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
    

    async sellExchanger(amount: string): Promise<TSell | null> {
        const result = await this.request<TSell>('sell', { type: 'exchanger', amount });
        return result;
    }
    
    async getCatalog(): Promise<boolean | null> {
        const result = await this.request<boolean>('getCatalog');
        return result;
    }
    

    async exchangeEggsForPokemon(): Promise<{ success: boolean }> {
        // Здесь должна быть логика для запроса на сервер
        return { success: true }; // Пример возврата. Настоящая логика может отличаться.
    }

    async getMap(): Promise<TMapInfo | null> {
        return await this.request<TMapInfo>('getMap');
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

    async getInventory(): Promise<TInventory | null> {
        try {
            const catalog = await this.request<TInventory>('getInventory');
            return catalog;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            return null;
        }
    }

    async getUserInfo(): Promise<TUserInfo | null> {
        const result = await this.request<TUserInfo>('userInfo');
        if (result) return result;
        return null
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
            this.store.clearAllHashes();
        }
    }

    makeBet(lotId: number, bet: string) {
        return this.request<TMakeBet>('makeBet', { lotId: lotId.toString(), bet});
    }

    cancelLot(lotId: number) {
        return this.request<TCancelLot>('cancelLot', { lotId: lotId.toString()});
    }

    async upgradePokemon(monsterId: number): Promise<TMonsters_level | null> {
        const result = await this.request<TMonsters_level>('upgradePokemon', { monsterId: monsterId.toString() });
        return result;
    }    

    async addToTeam(monsterId: number): Promise<TCr | null> {
        const result = await this.request<TCr>('addToTeam', { monsterId: monsterId.toString() });
        return result;
    }    

    async removeFromTeam(monsterId: number): Promise<TCr | null> {
        const result = await this.request<TCr>('addToTeam', { monsterId: monsterId.toString() });
        return result;
    }   

    async getInfoAboutUpgrade(monsterId: number): Promise<TCr | null> {
        const result = await this.request<TCr>('getInfoAboutUpgrade', { monsterId: monsterId.toString() });
        return result;
    }    

    startBattleUpdate(cb: (result: TUpdateSceneResponse) => void): void {
        this.battleInterval = setInterval(async () => {
            const result = await this.updateBattle();
            if (result) {
                cb(result);
            }
        }, BATTLE_TIMESTAMP);
    }

    async updateBattle(): Promise<TUpdateSceneResponse | null> {
        const hash = this.store.getSceneHash();
        const result = await this.request<TUpdateSceneResponse>('updateBattle', { hash });
        if (result) {
            this.store.setSceneHash(result.hash);
            return result;
        }
        return null;
    }

    stopBattleUpdate(): void {
        if (this.battleInterval) {
            clearInterval(this.battleInterval);
            this.battleInterval = null;
            this.store.clearAllHashes();
        }
    }

    async getPlayerInBattle(): Promise<TGamerBattle[] | null> {
        return await this.request<TGamerBattle[]>('startBattle', {});
    }



}

export default Server;