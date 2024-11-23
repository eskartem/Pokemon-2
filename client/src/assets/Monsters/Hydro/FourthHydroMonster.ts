import Monster from "../Monster";

class FourthHydroMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Squirtle';
    attack: number = 100;
    healthPoint: number = 470;
    defense: number = 50;
    element: string = 'Water';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Водоворот',
        scale: 1.7
    }
    weakening = {
        whirlpoolWeakening: false
    }      
}

export default FourthHydroMonster