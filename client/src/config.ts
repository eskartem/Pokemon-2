export type TPoint = {
    x: number;
    y: number;
}

export enum EDIRECTION {
    LEFT = 'left',
    RIGHT = 'right',
    UP = 'up',
    DOWN = 'down',
};

export type TWINDOW = {
    LEFT: number;
    TOP: number;
    HEIGHT: number;
    WIDTH: number;
}

const CONFIG = {
    
    // udsu
    // HOST: 'http://monstaris:81/api',
    // dev
    HOST: 'http://server:80/api',

    // игровое окно, видимое пользователю
    WINV: {
        WIDTH: 47,
        HEIGHT: 22.5,
        LEFT: 0,
        BOTTOM: 0
    },
    //размеры карты
    MAP: {
        WIDTH: 160,
        HEIGHT: 90,
    },

    fovDistance: 5, // дальность поля зрения игрока
    
    winAspect: 16 / 9,
    tileSize: 40, // размер клетки в пикселях 
    nickFontSize: 16, // размер ника на карте в пикеслях

    CHAT_TIMESTAMP: 200, //ms
    SCENE_TIMESTAMP: 100, //ms
    MARKET_TIMESTAMP: 400, // ms
    BATTLE_TIMESTAMP: 400

};

export default CONFIG;