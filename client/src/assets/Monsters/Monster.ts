interface skill {
    name: string,
    scale: number
}

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
    element:string,
    level: number,
    skill: skill,
    isAlive: boolean
    side: string
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
    element: string = '';
    level: number = 1;
    side = '';
    skill: skill = {
        name: "",
        scale: 1
    }
    isAlive: boolean = true;
}

export default Monster;