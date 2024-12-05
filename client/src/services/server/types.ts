export type TError = {
    code: number;
    text: string;
}

export type TAnswer<T> = {
    result: 'ok' | 'error';
    data?: T;
    error?: TError;
}

export type TUser = {
    token: string;
    name: string;
    coins: number;
    crystals: number;
    eggFragments: number;
    x: number;
    y: number;
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

// ресы пользователя
export type TUserResources = {
    coins: number,
    crystals: number,
    eggFragments: number,
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

export enum EStatus {
    open,
    sell,
    cancel
}

export type TLot = {
    id: number,
    seller_name: string,
    datatime: number,
    start_cost: number,
    step_cost: number,
    current_cost: number,
    timestamp_cost: number,
    buyer_name: string,
    status: EStatus
}

export type TMap = {
    HEIGHT: number,
    WIDTH: number,
    IMAGE: string
}
