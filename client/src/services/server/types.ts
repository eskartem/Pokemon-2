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

export type TGamerBattle =  {
    id: number
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

export type TUpdateBattleResponse = {
    gamers: TPlayers[]
    hash: string
}

export type TPlayers = {
    user_id: number,
    opponent_id: number
    monsters: number[],
    monster_opp: number[],
}

export type TMonster = {
    id: number
    typeId: number
    name: string
    elementId: number
    element: string
    level: number
    hp: number
    attack: number
    defense: number
}

export type TBattleInfo = {
    monsterId1: string
    damage1: number
    monsterId2: string
    damage2: number
    monsterId3: string
    damage3: number
    monsterId: string
    damage: number
    lostMonye: number
    lostCrystal: number
    result: boolean
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


export enum EMarketRes {
    crystal,
    eggFragment
}

export type TMarketItem = {
    name: EMarketRes,
    number: number,
    cost: number
}

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

export type TMakeLot = {
    ableToWithdrawResources?: boolean,
    ableToWithdrawMonster?: boolean,
    ableToCreateLot: boolean,
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

export type TCancelLot = {
    ableToCancel: boolean,
    ableToReturnToOwner: boolean,
    ableToReturnBet: boolean | string, // 'нет ставок на этом лоте'
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

export type TBattle = {
    user1: number,
    user2: number,
    fightId: number
}

export type TEBattle = {
    WinnerId: number,
    LoserId: number,
    money: number,
    eggsFragm: number
    crystal: number
}

export enum EActions {
    attack = 'attack',
    skill = 'skill',
    escape = 'escape'
} 





















