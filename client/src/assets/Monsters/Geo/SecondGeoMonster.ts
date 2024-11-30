import Monster from "../Monster";

class SecondGeoMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Dugtrio';
    attack: number = 70;
    healthPoint: number = 520;
    defense: number = 55;
    element: string = 'Earth';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Гравитационная волна',
        scale: 0.25
    }
    weakening = {
        whirlpoolWeakening: false
    }      
}

export default SecondGeoMonster