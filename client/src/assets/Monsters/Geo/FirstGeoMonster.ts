import Monster from "../Monster";

class FirstGeoMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Bulbasaur';
    attack: number = 150;
    healthPoint: number = 500;
    defense: number = 60;
    element: string = 'Earth';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Тектонический удар',
        scale: 1.5
    }
    weakening = {
        whirlpoolWeakening: false
    }      
}

export default FirstGeoMonster