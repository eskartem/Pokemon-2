import { TMessages, TUser, TUserResources } from "../server/types";

const TOKEN = 'token';

class Store {
    user: TUser | null = null;
    messages: TMessages = [];
    chatHash: string = 'empty chat hash';

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

    setUserResources(resources: TUserResources): void {
        if (this.user) {
            this.user.resources = resources;
        }
    }

    getUserResources(): TUserResources | null {
        return this.user ? this.user.resources : null;
    }

    addEggToInventory(): void {
        if (this.user) {
            if (this.user.resources) {
                this.user.resources.eggFragments += 1; // Увеличиваем количество яиц
            }
        }
    }
}

export default Store;
