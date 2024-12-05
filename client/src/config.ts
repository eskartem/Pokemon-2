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
        WIDTH: 32,
        HEIGHT: 18,
        LEFT: 0,
        BOTTOM: 0
    },
    //размеры карты
    MAP: {
        WIDTH: 160,
        HEIGHT: 90,
    },
    
    winAspect: 16 / 9,
    tileSize: 32, 

    CHAT_TIMESTAMP: 200, //ms
    SCENE_TIMESTAMP: 100, //ms

};

export default CONFIG;