import Monster from "../Monster";

class SecondPyroMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Growlithe';
    attack: number = 150;
    healthPoint: number = 550;
    defense: number = 65;
    element: string = 'Fire';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Пепельный взрыв',
        scale: 1.5
    } 
    weakening = {
        whirlpoolWeakening: false
    }     
}

export default SecondPyroMonster