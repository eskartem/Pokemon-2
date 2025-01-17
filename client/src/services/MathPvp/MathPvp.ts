import { Monsters } from "../../assets/Monsters/Monster";
import { TCr } from "../server/types";

class MathPvp {
    
    dealingDamage = (healthPointFirst: number, healthPointSecond: number, 
        healthPointThird: number, attackedFirst: TCr, attackedSecond: TCr,
        attackedThird: TCr, attacking: TCr, action: string, mainTarget: TCr
    ): number[] => {
        if(action === 'baseAttack') {
            if (mainTarget === attackedFirst) {
                healthPointFirst = Math.round(healthPointFirst - attacking.ATK * this.defenceMultuplicator(attackedFirst.DEF))
            } else if (mainTarget === attackedSecond) {
                healthPointSecond = Math.round(healthPointSecond - attacking.ATK * this.defenceMultuplicator(attackedSecond.DEF))
            } else if (mainTarget === attackedThird) {
                healthPointThird = Math.round(healthPointThird - attacking.ATK * this.defenceMultuplicator(attackedThird.DEF))
            } return [healthPointFirst, healthPointSecond, healthPointThird]
        } else if (action === 'skill') {
            switch (attacking.name) {
                //Earth Skill's
                case "Земной импульс":
                    if (mainTarget === attackedFirst) {
                        healthPointFirst =Math.round(healthPointFirst - (attacking.ATK * 278) * this.defenceMultuplicator(attackedFirst.DEF))
                        healthPointSecond = Math.round(healthPointSecond - attacking.ATK * this.defenceMultuplicator(attackedSecond.DEF))
                        healthPointThird =Math.round(healthPointThird - attacking.ATK * this.defenceMultuplicator(attackedThird.DEF))
                    } else if (mainTarget === attackedSecond) {
                        healthPointFirst =Math.round(healthPointFirst - attacking.ATK) * this.defenceMultuplicator(attackedFirst.DEF)
                        healthPointSecond = Math.round(healthPointSecond - (attacking.ATK  * 278) * this.defenceMultuplicator(attackedSecond.DEF))
                        healthPointThird =Math.round(healthPointThird - attacking.ATK) * this.defenceMultuplicator(attackedThird.DEF)
                    } else if (mainTarget === attackedThird) {
                        healthPointFirst =Math.round(healthPointFirst - attacking.ATK * this.defenceMultuplicator(attackedFirst.DEF))
                        healthPointSecond = Math.round(healthPointSecond - attacking.ATK * this.defenceMultuplicator(attackedSecond.DEF))
                        healthPointThird =Math.round(healthPointThird - (attacking.ATK * 278) * this.defenceMultuplicator(attackedThird.DEF))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Гравитационная волна": 
                    if (mainTarget === attackedFirst) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            healthPointFirst = Math.round(healthPointFirst - (attacking.ATK * 278) * this.defenceMultuplicator(attackedFirst.DEF))
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedSecond) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            healthPointSecond = Math.round(healthPointSecond - (attacking.ATK * 278) * this.defenceMultuplicator(attackedSecond.DEF))
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedThird) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            healthPointThird = Math.round(healthPointThird - (attacking.ATK * 278) * this.defenceMultuplicator(attackedThird.DEF))
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Тектонический удар": 
                    if (mainTarget === attackedFirst) {
                        healthPointFirst = Math.round(healthPointFirst - (attacking.ATK * 278) * this.defenceMultuplicator(attackedFirst.DEF))
                    } else if (mainTarget === attackedSecond) {
                        healthPointSecond = Math.round(healthPointSecond - (attacking.ATK * 278) * this.defenceMultuplicator(attackedSecond.DEF))
                    } else if (mainTarget === attackedThird) {
                        healthPointThird = Math.round(healthPointThird - (attacking.ATK * 278) * this.defenceMultuplicator(attackedThird.DEF))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]    
                //Water Skill's
                case "Каскад":
                    if (mainTarget === attackedFirst) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            healthPointFirst = Math.round(healthPointFirst - (attacking.ATK * 278) * this.defenceMultuplicator(attackedFirst.DEF))
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            healthPointFirst = Math.round(healthPointFirst - attacking.ATK * this.defenceMultuplicator(attackedFirst.DEF)) 
                        }
                    } else if (mainTarget === attackedSecond) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            healthPointSecond = Math.round(healthPointSecond - (attacking.ATK * 278) * this.defenceMultuplicator(attackedSecond.DEF))
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            healthPointSecond = Math.round(healthPointSecond - attacking.ATK * this.defenceMultuplicator(attackedSecond.DEF))
                        }
                    } else if (mainTarget === attackedThird) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            healthPointThird = Math.round(healthPointThird - (attacking.ATK * 278) * this.defenceMultuplicator(attackedThird.DEF))
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            healthPointThird = Math.round(healthPointThird - attacking.ATK * this.defenceMultuplicator(attackedThird.DEF))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Волна разрушения":
                    if (mainTarget === attackedFirst) {
                        let damage = Math.round(attacking.ATK * 278)
                        healthPointFirst = healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.DEF)
                        if(healthPointFirst > 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage *  this.defenceMultuplicator(attackedSecond.DEF) * 0.5)
                            healthPointThird = Math.round(healthPointThird - damage * this.defenceMultuplicator(attackedThird.DEF) * 0.5)
                        } else if (healthPointFirst <= 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage * this.defenceMultuplicator(attackedSecond.DEF))
                            healthPointThird = Math.round(healthPointThird - damage * this.defenceMultuplicator(attackedThird.DEF))
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damage = Math.round(attacking.ATK * 278)
                        healthPointSecond = healthPointSecond - damage * this.defenceMultuplicator(attackedSecond.DEF)
                        if(healthPointSecond > 0) {
                            healthPointFirst = Math.round(healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.DEF) * 0.5)
                            healthPointThird = Math.round(healthPointThird - damage * this.defenceMultuplicator(attackedThird.DEF) * 0.5)
                        } else if (healthPointSecond <= 0) {
                            healthPointFirst = Math.round(healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.DEF))
                            healthPointThird = Math.round(healthPointThird - damage * this.defenceMultuplicator(attackedThird.DEF))
                        }
                    } else if (mainTarget === attackedThird) {
                        let damage = Math.round(attacking.ATK * 278)
                        healthPointThird = healthPointThird - damage * this.defenceMultuplicator(attackedThird.DEF)
                        if(healthPointThird > 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage * this.defenceMultuplicator(attackedSecond.DEF) * 0.5)
                            healthPointFirst = Math.round(healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.DEF)* 0.5)
                        } else if (healthPointThird <= 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage * this.defenceMultuplicator(attackedSecond.DEF))
                            healthPointFirst = Math.round(healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.DEF))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Ледяной шквал":
                    if (mainTarget === attackedFirst) {
                        healthPointFirst = Math.round(healthPointFirst - attacking.ATK * this.defenceMultuplicator(attackedFirst.DEF))
                    } else if (mainTarget === attackedSecond) {
                        healthPointSecond = Math.round(healthPointSecond - attacking.ATK * this.defenceMultuplicator(attackedSecond.DEF))
                    } else if (mainTarget === attackedThird) {
                        healthPointThird = Math.round(healthPointThird - attacking.ATK * this.defenceMultuplicator(attackedThird.DEF))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                //Fire Skill's
                case "Испепеляющий удар":
                    if (mainTarget === attackedFirst) {
                        let count = 0;
                        healthPointFirst = Math.round(healthPointFirst - (attacking.ATK * 278) * this.defenceMultuplicator(attackedFirst.DEF))
                        const glyba = setInterval(() => {
                            count++;
                            healthPointFirst = Math.round(healthPointFirst - attacking.ATK * this.defenceMultuplicator(attackedFirst.DEF) * 0.1)
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedSecond) {
                        let count = 0;
                        healthPointSecond = Math.round(healthPointSecond - (attacking.ATK * 278) * this.defenceMultuplicator(attackedSecond.DEF))
                        const glyba = setInterval(() => {
                            count++;
                            healthPointSecond = Math.round(healthPointSecond - attacking.ATK * this.defenceMultuplicator(attackedSecond.DEF) * 0.1)
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedThird) {
                        let count = 0;
                        healthPointThird = Math.round(healthPointThird - (attacking.ATK * 278) * this.defenceMultuplicator(attackedThird.DEF))
                        const glyba = setInterval(() => {
                            count++;
                            healthPointThird = Math.round(healthPointThird - attacking.ATK * this.defenceMultuplicator(attackedThird.DEF) * 0.1)
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Огненная буря":
                    healthPointFirst = Math.round(healthPointFirst - (attacking.ATK * 278) * this.defenceMultuplicator(attackedFirst.DEF))
                    healthPointSecond = Math.round(healthPointSecond - (attacking.ATK * 278) * this.defenceMultuplicator(attackedSecond.DEF))
                    healthPointThird = Math.round(healthPointThird - (attacking.ATK * 278) * this.defenceMultuplicator(attackedThird.DEF))
                    return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Пепельный взрыв":
                    if (mainTarget === attackedFirst) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            healthPointFirst = Math.round(healthPointFirst - (attackedFirst.ATK * 278) * this.defenceMultuplicator(attackedSecond.DEF))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            healthPointFirst = Math.round(healthPointFirst - attackedFirst.ATK * this.defenceMultuplicator(attackedFirst.DEF) * 2)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            healthPointSecond = Math.round(healthPointSecond - (attackedFirst.ATK * 278) * this.defenceMultuplicator(attackedSecond.DEF))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            healthPointSecond = Math.round(healthPointSecond - attackedFirst.ATK * this.defenceMultuplicator(attackedSecond.DEF) * 2)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } else if (mainTarget === attackedThird) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            healthPointThird = Math.round(healthPointThird - (attackedFirst.ATK * 278) * this.defenceMultuplicator(attackedThird.DEF))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            healthPointThird = Math.round(healthPointThird - attackedFirst.ATK * this.defenceMultuplicator(attackedThird.DEF) * 2)
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
                            healthPointFirst = Math.round(healthPointFirst - (attacking.ATK * (278 + 0.3)) * this.defenceMultuplicator(attackedFirst.DEF))
                        } else {
                            healthPointFirst = Math.round(healthPointFirst - (attacking.ATK * 278) * this.defenceMultuplicator(attackedFirst.DEF))
                        }
                    } else if (mainTarget === attackedSecond) {
                        if(mainTarget.element === "Water") {
                            healthPointSecond = Math.round(healthPointSecond - (attacking.ATK * (278 + 0.3)) * this.defenceMultuplicator(attackedSecond.DEF))
                        } else {
                            healthPointSecond = Math.round(healthPointSecond - (attacking.ATK * 278) * this.defenceMultuplicator(attackedSecond.DEF))
                        }
                    } else if (mainTarget === attackedThird) {
                        if(mainTarget.element === "Water") {
                            healthPointThird = Math.round(healthPointThird - (attacking.ATK * (278 + 0.3)) * this.defenceMultuplicator(attackedThird.DEF))
                        } else {
                            healthPointThird = Math.round(healthPointThird - (attacking.ATK * 278) * this.defenceMultuplicator(attackedThird.DEF))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Воздушный клинок":
                    healthPointFirst = Math.round(healthPointFirst - (attacking.ATK * 278) * this.defenceMultuplicator(attackedFirst.DEF))
                    healthPointSecond = Math.round(healthPointSecond - (attacking.ATK * (278 + 0.1) * this.defenceMultuplicator(attackedSecond.DEF)))
                    healthPointThird = Math.round(healthPointThird - (attacking.ATK * (278 + 0.2) * this.defenceMultuplicator(attackedThird.DEF)))
                    return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Циклон разрушения":
                    if (mainTarget === attackedFirst) {
                        healthPointFirst = Math.round(healthPointFirst - attacking.ATK * 278 * this.defenceMultuplicator(attackedFirst.DEF))
                    } else if (mainTarget === attackedSecond) {
                        healthPointSecond = Math.round(healthPointSecond - attacking.ATK * 278 * this.defenceMultuplicator(attackedSecond.DEF))
                    } else if (mainTarget === attackedThird) {
                        healthPointThird = Math.round(healthPointThird - attacking.ATK* 278 * this.defenceMultuplicator(attackedThird.DEF))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                default: return [healthPointFirst, healthPointSecond, healthPointThird]
            }
        } return [healthPointFirst, healthPointSecond, healthPointThird]
    }

    timeIsOut = (arr: TCr[]) => {
        const removedElement = arr.shift()
            if (removedElement) {
                arr.push(removedElement)
            } 
            return arr;
    }

    deathScan = (arr: Monsters[], attacked: Monsters) => {
        arr = arr.filter((item) => !(item.name === attacked.name && item.side === attacked.side))
        return arr
    }

    nextMove = (arr: TCr[], attacked: TCr, attacking: TCr, action: string) => {
        //if ((attacking.skill.name === "Тектонический удар" && action === "skill") && this.randomForTectonicImpact() === true) {
        //    return arr;
        //} else if ((attacking.skill.name === "Ледяной шквал" && action === "skill") && this.randomForIceSquall() === true) {
        //    this.timeIsOut(arr)
        //    const num = arr.indexOf(attacked)
        //    const [element] = arr.splice(num, 1);
        //    arr.push(element);
        //    return arr
        //} else {
            this.timeIsOut(arr)
            return arr;
        //}
    }

    sortQueuesByLevel = (a:TCr, b: TCr, c: TCr, d: TCr, e: TCr, f: TCr) => {
        let objects = [a, b, c, d, e,f]
        objects.sort((a: TCr, b: TCr) => {
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

    defenceMultuplicator = (baseDefence: number) => {     
        return (1 - (baseDefence / (130 + baseDefence)))
    }

    calculateParam = (baseAttack: number, baseHealthPoint: number, baseDefense: number, level: number) => {
        let ATK = baseAttack;
        let healthPoint = baseHealthPoint;
        let DEF = baseDefense;
        for (let i = 1; i <= level; i++) {
            ATK *= 1.2;  
            healthPoint *= 1.2;
            DEF *= 1.2;
        }
        return [Math.round(ATK), Math.round(healthPoint), Math.round(DEF)];
    }

    animation = (action: string) => {
        return action === 'skill'
    }

}

export default MathPvp