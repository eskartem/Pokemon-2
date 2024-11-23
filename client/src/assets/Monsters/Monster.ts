interface skill {
    name: string,
    scale: number
}

interface weakening {
    whirlpoolWeakening: boolean;
}

export type Monsters = {
    name: string,
    attack: number,
    healthPoint: number,
    defense: number,
    element:string,
    level: number,
    skill: skill,
    isAlive: boolean
    side: string
    weakening: weakening

}

class Monster {
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
    weakening: weakening = {
        whirlpoolWeakening: false
    }
    isAlive: boolean = true;
}

export default Monster;