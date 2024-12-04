export type TError = {
    code: number;
    text: string;
}

export type TAnswer<T> = {
    result: 'ok' | 'error';
    data?: T;
    error?: TError;
}

type TGamer = {
    id: number;
    name: string;
    x: number;
    y: number;    
}

export type TUser = TGamer & {
    token: string;
    coins: number;
    crystals: number;
    eggFragments: number;
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

export type TUpdateSceneResponse = {
    gamers: TGamer[];
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
    id: number;
    name: string;
    lvl: number;
    element: EElement,
    rarity: ERarity,
    stats: TStats,
}

// ресы пользователя
export type TUserResources = {
    id: string,
    user_id: string,
    resource: number,
    resource_type: string
}

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

export type TTraderCatalog = TMarketCatalog;

export type TMap = {
    HEIGHT: number,
    WIDTH: number,
    IMAGE: string
}

export type TMapZone = {
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    type: string,
    element_id: number // надо название с помощью сложного запроса выдавать, а не само id, наругать бэкендеров.
}

export enum EStatus {
    open,
    sell,
    cancel
}

export type TMonster = {
    id: number,
    user_id: number,
    monster_type_id: number,
    level: number,
    hp: number,
    status: string
}