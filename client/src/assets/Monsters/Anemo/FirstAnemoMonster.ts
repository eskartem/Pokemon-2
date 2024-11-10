import Monster from "../Monster";

class FirstAnemoMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Pidgey';
    attack: number = 130;
    healthPoint: number = 470;
    defense: number = 40;
    element: string = 'Air';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Удар ветра',
        scale: 1.3
    }   
}

export default FirstAnemoMonster
