import { TGamer, TMessages, TUser, TInventory } from "../server/types";

const TOKEN = 'token';

class Store {
    user: TUser | null = null;
    messages: TMessages = [];
    gamers: TGamer[] = [];
    chatHash: string = 'empty chat hash';
    sceneHash: string = 'empty scene hash';
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

    setInventory(inventory: TInventory): void {
        this.inventory = inventory;
    }

    getInventory(): TInventory | null {
        return this.inventory;
    }

    clearInventory(): void {
        this.inventory = null;
    }

    getInventoryHash(): string {
        return this.inventoryHash;
    }
    
    setInventoryHash(hash: string): void {
        this.inventoryHash = hash;
    }
}

export default Store;