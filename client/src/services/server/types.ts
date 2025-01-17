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
    nonElement  // для нейтральных элементов карты
}

// статы существа
export type TStats = {
    current_hp: number,
    max_HP: number,
    ATK: number, // attack dmg
    DEF: number, // defence
}

// само существо
export type TCreature = {
    id: number,
    name: string;
    lvl: number;
    element: EElement,
    stats: TStats,
    status: string
}

export enum ETypeLot {
    monster = 'monster',
    item = 'item'
}

export enum ELotStatus {
    open = 'open',
    closed = 'closed',
    canceled = 'cancelled'
}

export enum EMonsterStatus {
    inPocket = 'inPocket',
    inTeam = 'inTeam'
}

export type TLot = {
    id: number;
    seller_id: number;
    seller_name: string; // имя создателя лота / продавца
    datetime: string; // время создания лота
    start_cost: number; // начальная стоимость
    step_cost: number; // шаг ставки
    current_cost: number; // текущая стоимость
    buyer_name: string | null; // ID владельца ставки / покупателя
    type: ETypeLot; // тип лота 
    selling_id: number; // ID продаваемого объекта
    resource: string | null,
    monster_level: null,
    monster_name: number | null,
    current_monster_hp: number | null,
    max_HP: number | null,
    ATK: number | null,
    DEF: number | null,
    amount: number | null; // количество продаваемого ресурса, обязателен при типе item, не нужен при типе monster
    status: ELotStatus;  // статус лота
    image_source: string; // путь до картинки продаваемой вещи
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

export type TMapInfo = {
    MAP: TMap,
    mapZones: TMapZone[]
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

export type TUserInfo = {
    user: TUser;
    monsters: TCr[];
    inventory: TResource[];
}
 
export type TInventory = {
    monsters: TCr[];
    inventory: TResource[];
    balance: number;
}

export type TCr = {
    id: number;
    name: string;
    element: string;
    level: number;
    current_hp: number;
    max_HP: number;
    stats: TStats;
    ATK: number;
    DEF: number;
    status: string;
    asset: string;
};

export type TResource = {
    id: number;
    user_id: number;
    resource_id: number;
    resource_amount: number;
}

export type TBalance = {
    money: number;
}

export type TMonsters_level = {
    id: number,
    level: number,
    stats: TStats
}

export type TSell = {
    token: string,
    type: string,
    amount: string,
    resourceId: string,
    objectId: string | ''
}

export type TResources = {
    id: number,
    name: string,
    cost: number,
    exchange_cost: number
}

export type THashEgg = {
    id: number;
    name: string;
    element: string;
    level: number;
    base_hp: number;
    base_atk: number;
    base_def: number;
    asset: string;
}

export type THatchedResponse = {
    hatched: THashEgg;
    eggConsumed: boolean;
    eggs: number;
}



export type TMonsters = TCreature;

export type TCancelLot = {
    ableToCancel: boolean,
    ableToReturnToOwner: boolean,
    ableToReturnBet: boolean | string, // 'нет ставок на этом лоте'
}




















