import Monster from "../Monster";

import MathPvp from "../../../services/MathPvp/MathPvp";

class SecondAnemoMonster extends Monster {
    side: string;
    name: string = "Butterfree";
    element: string = 'Air';
    level: number;
    isAlive: boolean = true;
    baseParam = {
        baseAttack: 110,
        baseHealthPoint: 460,
        baseDefense: 45
    };
    mathPvp: MathPvp; 
    attack: number;
    healthPoint: number;
    defense: number;

    skill = {
        name: 'Штормовой порыв',
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

export default SecondAnemoMonster