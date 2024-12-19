
interface baseParam {
    baseAttack: number,
    baseHealthPoint: number,
    baseDefense: number,
}

export type Monsters = {
    baseParam: baseParam
    name: string,
    attack: number,
    healthPoint: number,
    defense: number,
    elementType:string,
    level: number,
    skill: object,
    isAlive: boolean
}


class Monster {
    baseParam: baseParam = {
        baseAttack: 1,
        baseHealthPoint: 1,
        baseDefense: 1
    }
    name: string = '';
    attack: number = 100;
    healthPoint: number = 150;
    defense: number = 100;
    elementType: string = '';
    level: number = 1;
    skill: object = {};
    isAlive: boolean = true;
}

export default Monster;