import Monster from "../Monster";

import MathPvp from "../../../services/MathPvp/MathPvp";

class ThirdAnemoMonster extends Monster {
    side: string;
    name: string = "Zubat";
    element: string = 'Air';
    level: number;
    isAlive: boolean = true;
    baseParam = {
        baseAttack: 120,
        baseHealthPoint: 490,
        baseDefense: 55
    };
    mathPvp: MathPvp; 
    attack: number;
    healthPoint: number;
    defense: number;

    skill = {
        name: 'Воздушный клинок',
        scale: 1.1
    }

    constructor(side: string, level: number) {
        super();
        this.side = side;
        this.level = level;
        this.mathPvp = new MathPvp();
        const currentParam = this.mathPvp.calculateParam(
            this.baseParam.baseAttack,
            this.baseParam.baseHealthPoint,
            this.baseParam.baseDefense,
            this.level
        );
        this.attack = currentParam[0];
        this.healthPoint = currentParam[1];
        this.defense = currentParam[2];
    }

}

export default ThirdAnemoMonster