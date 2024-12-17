export type TError = {
    code: number;
    text: string;
}

export type TAnswer<T> = {
    result: 'ok' | 'error';
    data?: T;
    error?: TError;
}

export enum EUserStatus {
    scout = 'scout',
    fight = 'fight', 
    offline = 'offline'
}

export type TGamer = {
    id: number;
    name: string;
    status: EUserStatus;
    x: number;
    y: number;
}

export type TUser = TGamer & {
    token: string;
    coins: number;
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
    stats: TStats,
}

export enum ETypeLot {
    monster = 'monster',
    item = 'item'
}

export enum ELotStatus {
    open = 'open',
    closed = 'closed',
    canceled = 'canceled'
}

export type TLot = {
    id: number;
    seller_id: number; // ID создателя лота / продавца
    datetime: string; // время создания лота
    start_cost: number; // начальная стоимость
    step_cost: number; // шаг ставки
    current_cost: number; // текущая стоимость
    buyer_id: number | null; // ID владельца ставки / покупателя
    type: ETypeLot; // тип лота 
    selling_id: number; // ID продаваемого объекта
    amount: number | null; // количество продаваемого ресурса, обязателен при типе item, не нужен при типе monster
    status: ELotStatus;  // статус лота
}

export type TUpdateMarketResponse = {
    lots: TLot[],
    hash: string
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

export enum EZones {
    town = 'town',
    chillzone = 'chillzone',
    dungeon = 'dungeon'
}

export type TMakeBet = {
    ableToMakeBet: boolean,
    ableToTakeMoney: boolean
}