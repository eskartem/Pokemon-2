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

    WINV: {
        WIDTH: 32,
        HEIGHT: 18,
        LEFT: -16,
        BOTTOM: -9
    },
    
    winAspect: 16 / 9,
    canvasWidth: 1000,
    canvasHeight: 9/16 * 1000,
    tileSize: 1000 / 32,
    
    MAP: {
        WIDTH: 160,
        HEIGHT: 90,
    },


    CHAT_TIMESTAMP: 200, //ms
    SCENE_TIMESTAMP: 300, //ms

};

export default CONFIG;