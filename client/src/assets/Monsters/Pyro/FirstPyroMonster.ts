import Monster from "../Monster";

import MathPvp from "../../../services/MathPvp/MathPvp";

class FirstPyroMonster extends Monster {
    side: string;
    name: string = 'Flareon';
    element: string = 'Fire';
    level: number;
    isAlive: boolean = true;
    baseParam = {
        baseAttack: 140,
        baseHealthPoint: 510,
        baseDefense: 45
    };
    mathPvp: MathPvp; 
    attack: number;
    healthPoint: number;
    defense: number;

    skill = {
        name: 'Испепеляющий удар',
        scale: 1.4
    };

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

export default FirstPyroMonster