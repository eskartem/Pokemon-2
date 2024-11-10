import Monster from "../Monster";

class ThirdHydroMonster extends Monster {
    constructor(side: string, level: number) {
        super()
        this.side = side
        this.level = level
    }
    side: string = this.side;
    name: string = 'Poliwhirl';
    attack: number = 120;
    healthPoint: number = 500;
    defense: number = 55;
    element: string = 'Water';
    level: number = this.level;
    isAlive: boolean = true;
    skill = {
        name: 'Волна разрушения',
        scale: 1.2
    }    
}

export default ThirdHydroMonster