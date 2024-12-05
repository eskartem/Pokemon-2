import { TGamer, TMessages, TUser } from "../server/types";

const TOKEN = 'token';

class Store {
    user: TUser | null = null;
    messages: TMessages = [];
    gamers: TGamer[] = [];
    chatHash: string = 'empty chat hash';
    sceneHash: string = 'empty scene hash';

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

    /*setMap(map: TGetMap): void {
        this.map = map;
    }

    getMap(): TGetMap | null {
        return this.getMap;
    }*/
}

export default Store;