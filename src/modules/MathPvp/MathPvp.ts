import { Monsters } from "../Monsters/Monster";

class MathPvp {

    dealingDamage = (healthPoint: number, attacking: Monsters, type: string)  => {
        if(type === 'baseAttack') {
            const damage = Math.round(attacking.attack * Math.random() * (0.8 - 0.1) + 0.1);
            return healthPoint = healthPoint - damage;
        } else if (type === 'skill') {
            const damage = Math.round(attacking.attack * Math.random() * (0.8 - 0.1) + 0.1);
            return healthPoint = healthPoint - damage;
        } 
    }

    nextMove = (arr: Monsters[]) => {
        if(arr.length === 6) {
        const removedElement = arr.shift();
        if (removedElement) {
            arr.push(removedElement);
        }
        return arr;
    }
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

    isDead = (monster: Monsters, arr: Monsters[]) => {
        return arr.filter(item => item !== monster)
    }
    

}

export default MathPvp