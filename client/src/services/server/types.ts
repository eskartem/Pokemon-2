export type TError = {
    code: number;
    text: string;
}

export type TAnswer<T> = {
    result: 'ok' | 'error';
    data?: T;
    error?: TError;
}


export type TMessage = {
    message: string;
    author: string;
    created: string;
}

export type TMessages = TMessage[];

export type TMessagesResponse = {
    messages: TMessages;
    hash: string;
}

// элементы стихии
export enum EElement {
    fire,
    water,
    earth,
    air,
    nonElement  // для нейтральных элементов карты (не знаю, есть ли смысл делать отедльный ETileElement, чтобы такого не было)
}

// редкость существ
export enum ERarity {
    common,
    rare,
    legendary
}

// статы существа
export type TStats = {
    hp: number, // health point
    ad: number, // attack dmg
    df: number, // defence
}

// само существо
export type TCreature = {
    name: string;
    lvl: number;
    element: EElement,
    rarity: ERarity,
    stats: TStats,
}

export type TUserResources = {
    coins: number;
    crystals: number;
    eggFragments: number;
};

export type TUser = {
    id: string; 
    name: string;
    token: string;
    resources: TUserResources; // Добавлено свойство resources
};

//существо на рынке
export type TMarketCreature = TCreature & {
    id: number;
    cost: number;
}

export enum EMarketRes {
    crystal,
    eggFragment
}

export type TMarketItem = {
    name: EMarketRes,
    number: number,
    cost: number
}

export type TMarketCatalog = {
    creatures: TMarketCreature[],
    resources: TMarketItem[]
}

// Типы ресурсов для обменника
export type TExchangerResources = {
    coins: number;  
    eggs: number;  
}

// Типы для параметров обменника
export type TExchanger = {
    requiredCoins: number; // Количество монет, необходимых для обмена
    updateCoins: (newCoins: number) => void; // Функция для обновления монет
    addEgg: () => void; // Функция для добавления яйца
    coins: number; // Количество текущих монет
};

