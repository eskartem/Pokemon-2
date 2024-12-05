import Monster from "../Monster";

class FirstPyroMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Flareon';
    attack: number = 1000;
    healthPoint: number = 510;
    defense: number = 45;
    element: string = 'Fire';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Испепеляющий удар',
        scale: 1.4
    }
    weakening = {
        whirlpoolWeakening: false
    }   
}

export default FirstPyroMonster