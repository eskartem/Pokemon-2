import Monster from "../Monster";

class SecondAnemoMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Butterfree';
    attack: number = 110;
    healthPoint: number = 460;
    defense: number = 45;
    element: string = 'Air';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Штормовой порыв',
        scale: 1.1
    }
    weakening = {
        whirlpoolWeakening: false
    }      
}

export default SecondAnemoMonster