
export type Monsters = {
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