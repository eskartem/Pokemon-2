import Monster from "../Monster";

class FirstAnemoMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = "Farfetch'd";
    attack: number = 150;
    healthPoint: number = 520;
    defense: number = 60;
    element: string = 'Air';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Циклон разрушения',
        scale : 1.5
    }
    weakening = {
        whirlpoolWeakening: false
    }      
}

export default FirstAnemoMonster