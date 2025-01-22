import Monster from "../Monster";

import MathPvp from "../../../services/MathPvp/MathPvp";

class ThirdHydroMonster extends Monster {
    side: string;
    name: string = 'Poliwhirl';
    element: string = 'Water';
    level: number;
    isAlive: boolean = true;
    baseParam = {
        baseAttack: 120,
        baseHealthPoint: 500,
        baseDefense: 55
    };
    mathPvp: MathPvp; 
    attack: number;
    healthPoint: number;
    defense: number;

    skill = {
        name: 'Волна разрушения',
        scale: 1.2
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

export default ThirdHydroMonster