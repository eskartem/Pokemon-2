import Monster from "../Monster";

import MathPvp from "../../../services/MathPvp/MathPvp";

class FirstAnemoMonster extends Monster {
    mathPvp: MathPvp; 
    side: string;
    name: string = "Farfetch'd";
    element: string = 'Air';
    level: number;
    isAlive: boolean = true;
    baseParam = {
        baseAttack: 150,
        baseHealthPoint: 520,
        baseDefense: 60
    };

    attack: number;
    healthPoint: number;
    defense: number;

    skill = {
        name: 'Циклон разрушения',
        scale : 1.5
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

export default FirstAnemoMonster