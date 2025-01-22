import md5 from 'md5';
import CONFIG, { EDIRECTION } from "../../config";
import Store from "../store/Store";
import { TAnswer, TError, TMessagesResponse, TUser, TMap, TMapZone, 
    TUpdateSceneResponse, TSell, TResources, TInventory, TMonsters_level, 
    TCr, TUpdateMarketResponse, TMakeBet, ETypeLot, TMakeLot,
    TCancelLot,
    TUserInfo,
    TMapInfo,
    TGamerBattle,
    TUpdateBattleResponse,
    TMonster, THatchedResponse,
    TBattleInfo,
    TBalance,
    TBattle,
    TEBattle} from "./types";

const { CHAT_TIMESTAMP, SCENE_TIMESTAMP, MARKET_TIMESTAMP, HOST} = CONFIG;

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

    // методы для пользователя

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

    async getUserInfo(): Promise<TUserInfo | null> {
        const result = await this.request<TUserInfo>('userInfo');
        if (result) return result;
        return null
    }

    // методы для чата

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

    // методы для рынка

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
    
    async getCatalog(): Promise<boolean | null> { // для торговца
        const result = await this.request<boolean>('getCatalog');
        return result;
    }

    makeBet(lotId: number, bet: string) {
        return this.request<TMakeBet>('makeBet', { lotId: lotId.toString(), bet});
    }

    cancelLot(lotId: number) {
        return this.request<TCancelLot>('cancelLot', { lotId: lotId.toString()});
    }

    makeLot(type: ETypeLot, id: number, startCost: string, stepCost: string, amount: string | null) {
        return this.request<TMakeLot>('makeLot', {type, id: `${id}`,
            startCost, stepCost, amount: `${amount}`})
    }

    // методы для карты

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

    // методы для инвенторя

    async getInventory(): Promise<TInventory | null> {
        try {
            const catalog = await this.request<TInventory>('getInventory');
            return catalog;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            return null;
        }
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


    async hatchEgg(): Promise<THatchedResponse | null> {
        const result = await this.request<THatchedResponse>('hatchEgg');
        return result;
    }    

    startBattleUpdate(cb: (result: TUpdateBattleResponse) => void, TIMESTAMP: number): void {
        this.battleInterval = setInterval(async () => {
            const result = await this.updateBattle();
            if (result) {
                cb(result);
            }
        }, TIMESTAMP);
    }

    async updateBattle(): Promise<TUpdateBattleResponse | null> {
        const hash = this.store.getBattleHash();
        const result = await this.request<TUpdateBattleResponse>('updateBattle', { hash });
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

    async getMonsterInfo(monsterId: number): Promise<TMonster | null> {
        return await this.request<TMonster>('getInfoMonster', {monsterId: monsterId.toString()});
    } 

    async actionUser(monsterId1: number, monsterId2: number, action: string): Promise<TBattleInfo | null> {
        return await this.request<TBattleInfo>('actionUser', {monsterId1: monsterId1.toString(), monsterId2: monsterId2.toString(), action});
    }

    async startBattle(): Promise<TBattle | null> {
        return await this.request<TBattle>('startBattle');
    }

    async getQueue(fightId: number, sortQueue: string): Promise<number[] | null> {
        return await this.request<number[]>('getQueue', {fightId: fightId.toString(), queue: sortQueue});
    }

    async endBattle(fightId: number): Promise<TEBattle | null> {
        return await this.request<TEBattle>('endBattle', {fightId: fightId.toString()});
    }

    
}

export default Server;