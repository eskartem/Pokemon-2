import Monster from "../Monster";

class FirstHydroMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Magikarp';
    attack: number = 100;
    healthPoint: number = 450;
    defense: number = 40;
    element: string = 'Water';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Ледяной шквал',
        scale: 0
    }
    weakening = {
        whirlpoolWeakening: false
    }      
}

export default FirstHydroMonster