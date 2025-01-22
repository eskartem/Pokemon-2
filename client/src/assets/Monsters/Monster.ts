
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

class Monster {
    id = 0;
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