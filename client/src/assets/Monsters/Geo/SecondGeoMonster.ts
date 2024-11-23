import Monster from "../Monster";

class SecondGeoMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Ratata';
    attack: number = 120;
    healthPoint: number = 480;
    defense: number = 50;
    element: string = 'Earth';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Глыбопад',
        scale: 1.2
    }
    weakening = {
        whirlpoolWeakening: false
    }      
}

export default SecondGeoMonster