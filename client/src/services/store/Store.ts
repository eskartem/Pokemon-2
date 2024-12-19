import { TGamer, TMessages, TUser, TInventory } from "../server/types";

const TOKEN = 'token';

class Store {
    user: TUser | null = null;
    messages: TMessages = [];
    gamers: TGamer[] = [];
    chatHash: string = 'empty_chat_hash';
    sceneHash: string = 'empty_scene_hash';
    marketHash: string = 'empty_market_hash';
    inventory: TInventory | null = null; // Добавляем инвентарь
    inventoryHash: string = 'empty inventory hash'; // Добавляем хеш инвентаря

    setToken(token: string): void {
        localStorage.setItem(TOKEN, token);
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN);
    }

    setUser(user: TUser): void {
        const { token } = user;
        this.setToken(token);
        this.user = user;
    }

    getUser(): TUser | null {
        return this.user;
    }

    clearUser(): void {
        this.user = null;
        this.setToken('');
    }

    addMessages(messages: TMessages): void {
        // TODO сделать, чтобы работало вот так
        //this.messages.concat(messages);
        // а вот это - плохой код!
        if (messages?.length) {
            this.messages = messages;
        }
    }

    getMessages(): TMessages {
        return this.messages;
    }

    clearMessages(): void {
        this.messages = [];
    }

    getChatHash(): string {
        return this.chatHash;
    }

    setChatHash(hash: string): void {
        this.chatHash = hash;
    }

    getSceneHash(): string {
        return this.sceneHash;
    }

    setSceneHash(hash: string): void {
        this.sceneHash = hash;
    }
    

    setGamers(gamers: TGamer[]) {
        this.gamers = gamers;
    }

    getGamers(): TGamer[] {
        return this.gamers;
    }
    
    getMarketHash(): string {
        return this.marketHash;
    }

    setMarketHash(hash: string): void {
        this.marketHash = hash;
    }

    clearAllHashes() {
        this.chatHash = 'empty_chat_hash';
        this.sceneHash = 'empty_scene_hash';
        this.marketHash = 'empty_market_hash';
    }
}

export default Store;