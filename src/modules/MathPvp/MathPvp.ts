import { Monsters } from "../Monsters/Monster";

class MathPvp {

    dealingDamage = (healthPoint: number, attacking: Monsters, type: string, attacked: Monsters): number  => {
        if(type === 'baseAttack') {
            const damage = attacking.attack + 10 - (attacked.defense * 0.8);
            return healthPoint = healthPoint - damage;
        } else if (type === 'skill') {
            const damage = attacking.attack + 10 - (attacked.defense * 0.8);
            return healthPoint = healthPoint - damage;
        } else {
            return 0
        }
    }

    nextMove = (arr: Monsters[], attacked: Monsters, healthPoint: number) => {
        if(healthPoint <= 0) {
            arr = arr.filter((item) => item.name != attacked.name)
            console.log(arr)
        }
        const removedElement = arr.shift();
        if (removedElement) {
            arr.push(removedElement);
        } return arr;
    }

    sortQueuesByLevel = (a: Monsters, b: Monsters, c: Monsters, d: Monsters, e: Monsters, f: Monsters) => {
        let objects = [a, b, c, d, e,f]
        objects.sort((a: Monsters, b: Monsters) => {
            if (a.level === b.level) {
                return Math.random() - 0.5;
            }
            return b.level - a.level;
        });
        return objects;
    }

    isDead = (healthPoint: number) => {
        if(healthPoint <= 0) {
            return healthPoint = 0;
        } return healthPoint
    }
    

}

export default MathPvp