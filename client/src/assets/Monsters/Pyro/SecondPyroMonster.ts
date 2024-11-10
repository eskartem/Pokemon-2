import Monster from "../Monster";

class SecondPyroMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Charmander';
    attack: number = 110;
    healthPoint: number = 480;
    defense: number = 50;
    element: string = 'Fire';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Фениксова искра',
        scale: 1.1
    }   
}

export default SecondPyroMonster