export type Monster = {
    name: string;
    attack: number;
    healthPoint: number;
    defense: number;
    elementType: string;
    level: number;
}

class MathPvp {

    dealingDamage = (healthPoint: number, attacking: Monster, type: string)  => {
        if(type === 'baseAttack') {
            const damage = attacking.attack * Math.random() * (0.8 - 0.1) + 0.1;
            return healthPoint = healthPoint - damage;
        } else if (type === 'skill') {
            const damage = attacking.attack;
            return healthPoint = healthPoint - damage;
        } 
    }

    nextMove = (arr: any) => {
        const removedElement = arr.shift();
        arr.push(removedElement);
        return arr;
    }

    sortQueuesByLevel = (a: any, b: any, c: any, d: any, e: any, f: any) => {
        let objects = [a, b, c, d, e,f]
        objects.sort((a: any, b: any) => {
            if (a.level === b.level) {
                return Math.random() - 0.5;
            }
            return b.level - a.level;
        });
        return objects;
    }
    

}

export default MathPvp