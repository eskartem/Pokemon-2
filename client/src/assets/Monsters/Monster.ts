import { TStats } from "../../services/server/types"

interface baseParam {
    baseAttack: number,
    baseHealthPoint: number,
    baseDefense: number,
}

interface skill {
    name: string,
    scale: number
}

export type Monsters = {
    baseParam: baseParam
    name: string,
    attack: number,
    healthPoint: number,
    defense: number,
    element:string,
    level: number,
    skill: skill,
    isAlive: boolean
    side: string
}


//class Monster {
//    baseParam: baseParam = {
//        baseAttack: 1,
//        baseHealthPoint: 1,
//        baseDefense: 1
//    }
//    name: string = '';
//    attack: number = 100;
//    healthPoint: number = 150;
//    defense: number = 100;
//    element: string = '';
//    level: number = 1;
//    skill: skill = {
//        name: '',
//        scale: 1
//    };
//    side: string = '';
//    isAlive: boolean = true;
//}

class Monster {
    typeId = 1
    name = ''
    elementId = 1
    element= ''
    level = 1
    hp = 1
    attack = 1
    defense = 1
}

export default Monster;