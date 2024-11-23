import Monster from "../Monster";

class SecondHydroMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Omanyte';
    attack: number = 110;
    healthPoint: number = 450;
    defense: number = 40;
    element: string = 'Water';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Каскад',
        scale: 1.5
    }
    weakening = {
        whirlpoolWeakening: false
    }      
}

export default SecondHydroMonster