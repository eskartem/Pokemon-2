import Monster from "../Monster";

class ThirdAnemoMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Zubat';
    attack: number = 120;
    healthPoint: number = 490;
    defense: number = 55;
    element: string = 'Air';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Воздушный клинок',
        scale: 1.1
    }   
}

export default ThirdAnemoMonster