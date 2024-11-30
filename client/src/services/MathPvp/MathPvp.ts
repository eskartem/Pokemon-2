import { Monsters } from "../../assets/Monsters/Monster";

class MathPvp {
    
    dealingDamage = (healthPointFirst: number, healthPointSecond: number, 
        healthPointThird: number, attackedFirst: Monsters, attackedSecond: Monsters,
        attackedThird: Monsters, attacking: Monsters, action: string, mainTarget: Monsters
    ): number[] => {
        if(action === 'baseAttack') {
            if (mainTarget === attackedFirst) {
                healthPointFirst = Math.round(healthPointFirst - attacking.attack)
            } else if (mainTarget === attackedSecond) {
                healthPointSecond = Math.round(healthPointSecond - attacking.attack)
            } else if (mainTarget === attackedThird) {
                healthPointThird = Math.round(healthPointThird - attacking.attack)
            } return [healthPointFirst, healthPointSecond, healthPointThird]
        } else if (action === 'skill') {
            switch (attacking.skill.name) {
                //Earth Skill's
                case "Земной импульс":
                    if (mainTarget === attackedFirst) {
                        healthPointFirst =Math.round(healthPointFirst - attacking.attack * attacking.skill.scale)
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack)
                        healthPointThird =Math.round(healthPointThird - attacking.attack)
                    } else if (mainTarget === attackedSecond) {
                        healthPointFirst =Math.round(healthPointFirst - attacking.attack)
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack  * attacking.skill.scale)
                        healthPointThird =Math.round(healthPointThird - attacking.attack)
                    } else if (mainTarget === attackedThird) {
                        healthPointFirst =Math.round(healthPointFirst - attacking.attack)
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack)
                        healthPointThird =Math.round(healthPointThird - attacking.attack * attacking.skill.scale)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Гравитационная волна": 
                    if (mainTarget === attackedFirst) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale)
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedSecond) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale)
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedThird) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale)
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Тектонический удар": 
                    if (mainTarget === attackedFirst) {
                            healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale)
                    } else if (mainTarget === attackedSecond) {
                            healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale)
                    } else if (mainTarget === attackedThird) {
                       healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]    
                //Water Skill's
                case "Каскад":
                    if (mainTarget === attackedFirst) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale)
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            healthPointFirst = Math.round(healthPointFirst - attacking.attack)
                        }
                    } else if (mainTarget === attackedSecond) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale)
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            healthPointSecond = Math.round(healthPointSecond - attacking.attack)
                        }
                    } else if (mainTarget === attackedThird) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale)
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            healthPointThird = Math.round(healthPointThird - attacking.attack)
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Волна разрушения":
                    if (mainTarget === attackedFirst) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        healthPointFirst = healthPointFirst - damage
                        if(healthPointFirst > 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage * 0.5)
                            healthPointThird = Math.round(healthPointThird - damage * 0.5)
                        } else if (healthPointFirst <= 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage)
                            healthPointThird = Math.round(healthPointThird - damage)
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        healthPointSecond = healthPointSecond - damage
                        if(healthPointSecond > 0) {
                            healthPointFirst = Math.round(healthPointFirst - damage * 0.5)
                            healthPointThird = Math.round(healthPointThird - damage * 0.5)
                        } else if (healthPointSecond <= 0) {
                            healthPointFirst = Math.round(healthPointFirst - damage)
                            healthPointThird = Math.round(healthPointThird - damage)
                        }
                    } else if (mainTarget === attackedThird) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        healthPointThird = healthPointThird - damage
                        if(healthPointThird > 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage * 0.5)
                            healthPointFirst = Math.round(healthPointFirst - damage * 0.5)
                        } else if (healthPointThird <= 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage)
                            healthPointFirst = Math.round(healthPointFirst - damage)
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Ледяной шквал":
                    if (mainTarget === attackedFirst) {
                        healthPointFirst = Math.round(healthPointFirst - attacking.attack)
                    } else if (mainTarget === attackedSecond) {
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack)
                    } else if (mainTarget === attackedThird) {
                        healthPointThird = Math.round(healthPointThird - attacking.attack)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                //Fire Skill's
                case "Испепеляющий удар":
                    if (mainTarget === attackedFirst) {
                        let count = 0;
                        healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale)
                        const glyba = setInterval(() => {
                            count++;
                            healthPointFirst = Math.round(healthPointFirst - attacking.attack * 0.1)
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedSecond) {
                        let count = 0;
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale)
                        const glyba = setInterval(() => {
                            count++;
                            healthPointSecond = Math.round(healthPointSecond - attacking.attack * 0.1)
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedThird) {
                        let count = 0;
                        healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale)
                        const glyba = setInterval(() => {
                            count++;
                            healthPointThird = Math.round(healthPointThird - attacking.attack * 0.1)
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Огненная буря":
                    healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale)
                    healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale)
                    healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale)
                    return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Пепельный взрыв":
                    if (mainTarget === attackedFirst) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            healthPointFirst = Math.round(healthPointFirst - attackedFirst.attack * attacking.skill.scale)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            healthPointFirst = Math.round(healthPointFirst - attackedFirst.attack * 2)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            healthPointSecond = Math.round(healthPointSecond - attackedFirst.attack * attacking.skill.scale)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            healthPointSecond = Math.round(healthPointSecond - attackedFirst.attack * 2)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } else if (mainTarget === attackedThird) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            healthPointThird = Math.round(healthPointThird - attackedFirst.attack * attacking.skill.scale)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            healthPointThird = Math.round(healthPointThird - attackedFirst.attack * 2)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                //Air Skill's
                case "Штормовой порыв":
                    if (mainTarget === attackedFirst) {
                        if(mainTarget.element === "Water") {
                            healthPointFirst = Math.round(healthPointFirst - attacking.attack * (attacking.skill.scale + 0.3))
                        } else {
                            healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale)
                        }
                    } else if (mainTarget === attackedSecond) {
                        if(mainTarget.element === "Water") {
                            healthPointSecond = Math.round(healthPointSecond - attacking.attack * (attacking.skill.scale + 0.3))
                        } else {
                            healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale)
                        }
                    } else if (mainTarget === attackedThird) {
                        if(mainTarget.element === "Water") {
                            healthPointThird = Math.round(healthPointThird - attacking.attack * (attacking.skill.scale + 0.3))
                        } else {
                            healthPointThird = Math.round(healthPointThird - attacking.attack * attacking.skill.scale)
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Воздушный клинок":
                    healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale)
                    healthPointSecond = Math.round(healthPointSecond - attacking.attack * (attacking.skill.scale + 0.1))
                    healthPointThird = Math.round(healthPointThird - attacking.attack * (attacking.skill.scale + 0.2))
                    return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Циклон разрушения":
                    if (mainTarget === attackedFirst) {
                        healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale)
                    } else if (mainTarget === attackedSecond) {
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale)
                    } else if (mainTarget === attackedThird) {
                        healthPointThird = Math.round(healthPointThird - attacking.attack* attacking.skill.scale)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                default: return [healthPointFirst, healthPointSecond, healthPointThird]
            }
        } return [healthPointFirst, healthPointSecond, healthPointThird]
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