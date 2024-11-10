import Monster from "../Monster";

class ThirdPyroMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Ponyta';
    attack: number = 120;
    healthPoint: number = 530;
    defense: number = 60;
    element: string = 'Fire';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Огненная буря',
        scale: 1.2
    }   
}

export default ThirdPyroMonster