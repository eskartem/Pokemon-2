import { Monsters } from "../../assets/Monsters/Monster";

type setHealthPoint = (healthPoint: number) => void; 

class MathPvp {
    
    dealingDamage = (setHealthPointFirst: setHealthPoint, setHealthPointSecond: setHealthPoint, setHealthPointThird: setHealthPoint,
        healthPointFirst: number, healthPointSecond: number, healthPointThird: number, attackedFirst: Monsters, attackedSecond: Monsters,
        attackedThird: Monsters, attacking: Monsters, action: string, mainTarget: Monsters, arr: Monsters[]
    ): number[] => {
        if(action === 'baseAttack') {
            if (mainTarget === attackedFirst) {
                setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack))
                
            } else if (mainTarget === attackedSecond) {
                setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack))
            } else if (mainTarget === attackedThird) {
                
                setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack))
            } return [healthPointFirst, healthPointSecond, healthPointThird]
        } else if (action === 'skill') {
            switch (attacking.skill.name) {
                case "Земной импульс":
                    if (mainTarget === attackedFirst) {
                        setHealthPointFirst(healthPointFirst =Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                        setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack))
                        setHealthPointThird(healthPointThird =Math.round(healthPointThird - attacking.attack))
                    } else if (mainTarget === attackedSecond) {
                        setHealthPointFirst(healthPointFirst =Math.round(healthPointFirst - attacking.attack))
                        setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack  * attacking.skill.scale))
                        setHealthPointThird(healthPointThird =Math.round(healthPointThird - attacking.attack))
                    } else if (mainTarget === attackedThird) {
                        setHealthPointFirst(healthPointFirst =Math.round(healthPointFirst - attacking.attack))
                        setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack))
                        setHealthPointThird(healthPointThird =Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Гравитационная волна": 
                    if (mainTarget === attackedFirst) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedSecond) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedThird) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Глыбопад":
                    if (mainTarget === attackedFirst) {
                        let count = 0;
                        setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                        const glyba = setInterval(() => {
                            count++;
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * 0.1))
                            if(count === 4) {
                                clearInterval(glyba)
                            }
                        }, 2000)
                    } else if (mainTarget === attackedSecond) {
                        let count = 0;
                        setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                        const glyba = setInterval(() => {
                            count++;
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * 0.1))
                            if(count === 4) {
                                clearInterval(glyba)
                            }
                        }, 2000)
                    } else if (mainTarget === attackedThird) {
                        let count = 0;
                        setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                        const glyba = setInterval(() => {
                            count++;
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * 0.1))
                            if(count === 4) {
                                clearInterval(glyba)
                            }
                        }, 2000)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Тектонический удар": 
                    if (mainTarget === attackedFirst) {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                    } else if (mainTarget === attackedSecond) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                    } else if (mainTarget === attackedThird) {
                        setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]    
                case "Каскад":
                    if (mainTarget === attackedFirst) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack))
                        }
                    } else if (mainTarget === attackedSecond) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack))
                        }
                    } else if (mainTarget === attackedThird) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Волна разрушения":
                    if (mainTarget === attackedFirst) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        setHealthPointFirst(healthPointFirst = healthPointFirst - damage)
                        if(healthPointFirst > 0) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - damage * 0.5))
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - damage * 0.5))
                        } else if (healthPointFirst <= 0) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - damage))
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - damage))
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        setHealthPointSecond(healthPointSecond = healthPointSecond - damage)
                        if(healthPointSecond > 0) {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - damage * 0.5))
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - damage * 0.5))
                        } else if (healthPointSecond <= 0) {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - damage))
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - damage))
                        }
                    } else if (mainTarget === attackedThird) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        setHealthPointThird(healthPointThird = healthPointThird - damage)
                        if(healthPointThird > 0) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - damage * 0.5))
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - damage * 0.5))
                        } else if (healthPointThird <= 0) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - damage))
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - damage))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Испепеляющий удар":
                    if (mainTarget === attackedFirst) {
                        let count = 0;
                        setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                        const glyba = setInterval(() => {
                            count++;
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * 0.1))
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedSecond) {
                        let count = 0;
                        setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                        const glyba = setInterval(() => {
                            count++;
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * 0.1))
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedThird) {
                        let count = 0;
                        setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                        const glyba = setInterval(() => {
                            count++;
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * 0.1))
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Фениксова искра": 
                    if (mainTarget === attackedFirst) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        let blastDamage = Math.round(attacking.attack * (attacking.skill.scale + 0.2))
                        setHealthPointFirst(healthPointFirst = healthPointFirst - damage)
                        if (healthPointFirst <= 0) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - blastDamage))
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - blastDamage))
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        let blastDamage = Math.round(attacking.attack * (attacking.skill.scale + 0.2))
                        setHealthPointSecond(healthPointSecond = healthPointSecond - damage)
                        if (healthPointSecond <= 0) {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - blastDamage))
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - blastDamage))
                        }
                    } else if (mainTarget === attackedThird) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        let blastDamage = Math.round(attacking.attack * (attacking.skill.scale + 0.2))
                        setHealthPointThird(healthPointThird = healthPointThird - damage)
                        if (healthPointThird <= 0) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - blastDamage))
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - blastDamage))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Огненная буря":
                    setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                    setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                    setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                    return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Пепельный взрыв":
                    if (mainTarget === attackedFirst) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attackedFirst.attack * attacking.skill.scale))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attackedFirst.attack * 2))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attackedFirst.attack * attacking.skill.scale))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attackedFirst.attack * 2))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } else if (mainTarget === attackedThird) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attackedFirst.attack * attacking.skill.scale))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attackedFirst.attack * 2))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Штормовой порыв":
                    if (mainTarget === attackedFirst) {
                        if(mainTarget.element === "Water") {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * (attacking.skill.scale + 0.3)))
                        } else {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                        }
                    } else if (mainTarget === attackedSecond) {
                        if(mainTarget.element === "Water") {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * (attacking.skill.scale + 0.3)))
                        } else {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                        }
                    } else if (mainTarget === attackedThird) {
                        if(mainTarget.element === "Water") {
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * (attacking.skill.scale + 0.3)))
                        } else {
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Воздушный клинок":
                    setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                    setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * (attacking.skill.scale + 0.1)))
                    setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * (attacking.skill.scale + 0.2)))
                    return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Циклон разрушения":
                    if (mainTarget === attackedFirst) {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                    } else if (mainTarget === attackedSecond) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                    } else if (mainTarget === attackedThird) {
                        setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack* attacking.skill.scale))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Водоворот":
                    setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale))
                    setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                    setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                    return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Ледяной шквал":
                    if (mainTarget === attackedFirst) {
                        setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack))
                    } else if (mainTarget === attackedSecond) {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack))
                    } else if (mainTarget === attackedThird) {
                        setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Удар ветра":
                    if (mainTarget === attackedFirst) {
                        let damageBonus: boolean = false;
                        if(damageBonus === false){
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack *  attacking.skill.scale))
                        } else {
                            setHealthPointFirst(healthPointFirst = Math.round(healthPointFirst - attacking.attack * (attacking.skill.scale + 0.2)))
                            damageBonus = true;
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damageBonus: boolean = false;
                        if(damageBonus){
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale))
                            damageBonus = true
                        } else {
                            setHealthPointSecond(healthPointSecond = Math.round(healthPointSecond - attacking.attack * (attacking.skill.scale + 0.2)))
                            damageBonus = true
                        }
                    } else if (mainTarget === attackedThird) {
                        let damageBonus: boolean = false;
                        if(damageBonus){
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale))
                            damageBonus = true
                        } else {
                            setHealthPointThird(healthPointThird = Math.round(healthPointThird - attacking.attack * (attacking.skill.scale + 0.2)))
                            damageBonus = true
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                default: return [healthPointFirst, healthPointSecond, healthPointThird]
            }
        } else {
            return [healthPointFirst, healthPointSecond, healthPointThird]
        }
    }

    timeIsOut = (arr: Monsters[]) => {
        const removedElement = arr.shift()
            if (removedElement) {
                arr.push(removedElement)
            } 
            return arr;
    }

    nextMove = (arr: Monsters[], attacked: Monsters, healthPoint: number, attacking: Monsters, action: string) => {
        if(healthPoint <= 0) {
            arr = arr.filter((item) => item.name !== attacked.name)
        }
        if ((attacking.skill.name === "Тектонический удар" && action === "skill") && this.randomForTectonicImpact() === true) {
            return arr;
        }
        if ((attacking.skill.name === "Ледяной шквал" && action === "skill") && this.randomForIceSquall() === true) {
            this.timeIsOut(arr)
            const num = arr.indexOf(attacked)
            const [element] = arr.splice(num, 1);
            arr.push(element);
            return arr
        } else {
            this.timeIsOut(arr)
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

    isDead = (healthPoint: number) => {
        if(healthPoint <= 0) {
            return healthPoint = 0;
        } return healthPoint
    }

    randomForTectonicImpact = () => {
        return Math.random() < 0.1;
    }

    randomForIceSquall = () => {
        return Math.random() < 0.5;
    }

}

export default MathPvp