import Monster from "../Monster";

class ThirdGeoMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Sandshrew';
    attack: number = 90;
    healthPoint: number = 550;
    defense: number = 65;
    element: string = 'Earth';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Земной импульс',
        scale: 1.25
    }
    weakening = {
        whirlpoolWeakening: false
    }      
}

export default ThirdGeoMonster