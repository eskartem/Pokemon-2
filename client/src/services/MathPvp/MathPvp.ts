import { Monsters } from "../../assets/Monsters/Monster";

class MathPvp {
    
    dealingDamage = (healthPointFirst: number, healthPointSecond: number, 
        healthPointThird: number, attackedFirst: Monsters, attackedSecond: Monsters,
        attackedThird: Monsters, attacking: Monsters, action: string, mainTarget: Monsters
    ): number[] => {
        if(action === 'baseAttack') {
            if (mainTarget === attackedFirst) {
                healthPointFirst = Math.round(healthPointFirst - attacking.attack * this.defenceMultuplicator(attackedFirst.defense))
            } else if (mainTarget === attackedSecond) {
                healthPointSecond = Math.round(healthPointSecond - attacking.attack * this.defenceMultuplicator(attackedSecond.defense))
            } else if (mainTarget === attackedThird) {
                healthPointThird = Math.round(healthPointThird - attacking.attack * this.defenceMultuplicator(attackedThird.defense))
            } return [healthPointFirst, healthPointSecond, healthPointThird]
        } else if (action === 'skill') {
            switch (attacking.skill.name) {
                //Earth Skill's
                case "Земной импульс":
                    if (mainTarget === attackedFirst) {
                        healthPointFirst =Math.round(healthPointFirst - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedFirst.defense))
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack * this.defenceMultuplicator(attackedSecond.defense))
                        healthPointThird =Math.round(healthPointThird - attacking.attack * this.defenceMultuplicator(attackedThird.defense))
                    } else if (mainTarget === attackedSecond) {
                        healthPointFirst =Math.round(healthPointFirst - attacking.attack) * this.defenceMultuplicator(attackedFirst.defense)
                        healthPointSecond = Math.round(healthPointSecond - (attacking.attack  * attacking.skill.scale) * this.defenceMultuplicator(attackedSecond.defense))
                        healthPointThird =Math.round(healthPointThird - attacking.attack) * this.defenceMultuplicator(attackedThird.defense)
                    } else if (mainTarget === attackedThird) {
                        healthPointFirst =Math.round(healthPointFirst - attacking.attack * this.defenceMultuplicator(attackedFirst.defense))
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack * this.defenceMultuplicator(attackedSecond.defense))
                        healthPointThird =Math.round(healthPointThird - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedThird.defense))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Гравитационная волна": 
                    if (mainTarget === attackedFirst) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            healthPointFirst = Math.round(healthPointFirst - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedFirst.defense))
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedSecond) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            healthPointSecond = Math.round(healthPointSecond - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedSecond.defense))
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedThird) {
                        let time = 0;
                        const GravitationalWave = setInterval(() => {
                            time++;
                            healthPointThird = Math.round(healthPointThird - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedThird.defense))
                            if (time === 5) {
                                clearInterval(GravitationalWave)
                            }
                        }, 1000)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Тектонический удар": 
                    if (mainTarget === attackedFirst) {
                        healthPointFirst = Math.round(healthPointFirst - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedFirst.defense))
                    } else if (mainTarget === attackedSecond) {
                        healthPointSecond = Math.round(healthPointSecond - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedSecond.defense))
                    } else if (mainTarget === attackedThird) {
                        healthPointThird = Math.round(healthPointThird - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedThird.defense))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]    
                //Water Skill's
                case "Каскад":
                    if (mainTarget === attackedFirst) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            healthPointFirst = Math.round(healthPointFirst - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedFirst.defense))
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            healthPointFirst = Math.round(healthPointFirst - attacking.attack * this.defenceMultuplicator(attackedFirst.defense)) 
                        }
                    } else if (mainTarget === attackedSecond) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            healthPointSecond = Math.round(healthPointSecond - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedSecond.defense))
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            healthPointSecond = Math.round(healthPointSecond - attacking.attack * this.defenceMultuplicator(attackedSecond.defense))
                        }
                    } else if (mainTarget === attackedThird) {
                        if (mainTarget.element === "Fire" || mainTarget.element === 'Air') {
                            healthPointThird = Math.round(healthPointThird - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedThird.defense))
                        } if (mainTarget.element === "Water" || mainTarget.element === 'Earth') {
                            healthPointThird = Math.round(healthPointThird - attacking.attack * this.defenceMultuplicator(attackedThird.defense))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Волна разрушения":
                    if (mainTarget === attackedFirst) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        healthPointFirst = healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.defense)
                        if(healthPointFirst > 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage *  this.defenceMultuplicator(attackedSecond.defense) * 0.5)
                            healthPointThird = Math.round(healthPointThird - damage * this.defenceMultuplicator(attackedThird.defense) * 0.5)
                        } else if (healthPointFirst <= 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage * this.defenceMultuplicator(attackedSecond.defense))
                            healthPointThird = Math.round(healthPointThird - damage * this.defenceMultuplicator(attackedThird.defense))
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        healthPointSecond = healthPointSecond - damage * this.defenceMultuplicator(attackedSecond.defense)
                        if(healthPointSecond > 0) {
                            healthPointFirst = Math.round(healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.defense) * 0.5)
                            healthPointThird = Math.round(healthPointThird - damage * this.defenceMultuplicator(attackedThird.defense) * 0.5)
                        } else if (healthPointSecond <= 0) {
                            healthPointFirst = Math.round(healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.defense))
                            healthPointThird = Math.round(healthPointThird - damage * this.defenceMultuplicator(attackedThird.defense))
                        }
                    } else if (mainTarget === attackedThird) {
                        let damage = Math.round(attacking.attack * attacking.skill.scale)
                        healthPointThird = healthPointThird - damage * this.defenceMultuplicator(attackedThird.defense)
                        if(healthPointThird > 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage * this.defenceMultuplicator(attackedSecond.defense) * 0.5)
                            healthPointFirst = Math.round(healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.defense)* 0.5)
                        } else if (healthPointThird <= 0) {
                            healthPointSecond = Math.round(healthPointSecond - damage * this.defenceMultuplicator(attackedSecond.defense))
                            healthPointFirst = Math.round(healthPointFirst - damage * this.defenceMultuplicator(attackedFirst.defense))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Ледяной шквал":
                    if (mainTarget === attackedFirst) {
                        healthPointFirst = Math.round(healthPointFirst - attacking.attack * this.defenceMultuplicator(attackedFirst.defense))
                    } else if (mainTarget === attackedSecond) {
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack * this.defenceMultuplicator(attackedSecond.defense))
                    } else if (mainTarget === attackedThird) {
                        healthPointThird = Math.round(healthPointThird - attacking.attack * this.defenceMultuplicator(attackedThird.defense))
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                //Fire Skill's
                case "Испепеляющий удар":
                    if (mainTarget === attackedFirst) {
                        let count = 0;
                        healthPointFirst = Math.round(healthPointFirst - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedFirst.defense))
                        const glyba = setInterval(() => {
                            count++;
                            healthPointFirst = Math.round(healthPointFirst - attacking.attack * this.defenceMultuplicator(attackedFirst.defense) * 0.1)
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedSecond) {
                        let count = 0;
                        healthPointSecond = Math.round(healthPointSecond - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedSecond.defense))
                        const glyba = setInterval(() => {
                            count++;
                            healthPointSecond = Math.round(healthPointSecond - attacking.attack * this.defenceMultuplicator(attackedSecond.defense) * 0.1)
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } else if (mainTarget === attackedThird) {
                        let count = 0;
                        healthPointThird = Math.round(healthPointThird - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedThird.defense))
                        const glyba = setInterval(() => {
                            count++;
                            healthPointThird = Math.round(healthPointThird - attacking.attack * this.defenceMultuplicator(attackedThird.defense) * 0.1)
                            if(count === 5) {
                                clearInterval(glyba)
                            }
                        }, 1000)
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Огненная буря":
                    healthPointFirst = Math.round(healthPointFirst - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedFirst.defense))
                    healthPointSecond = Math.round(healthPointSecond - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedSecond.defense))
                    healthPointThird = Math.round(healthPointThird - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedThird.defense))
                    return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Пепельный взрыв":
                    if (mainTarget === attackedFirst) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            healthPointFirst = Math.round(healthPointFirst - (attackedFirst.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedSecond.defense))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            healthPointFirst = Math.round(healthPointFirst - attackedFirst.attack * this.defenceMultuplicator(attackedFirst.defense) * 2)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } else if (mainTarget === attackedSecond) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            healthPointSecond = Math.round(healthPointSecond - (attackedFirst.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedSecond.defense))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            healthPointSecond = Math.round(healthPointSecond - attackedFirst.attack * this.defenceMultuplicator(attackedSecond.defense) * 2)
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        }
                    } else if (mainTarget === attackedThird) {
                        let damageBoost: boolean = false;
                        if(damageBoost === false) {
                            healthPointThird = Math.round(healthPointThird - (attackedFirst.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedThird.defense))
                            damageBoost = true
                            setTimeout(() => {
                                damageBoost = false;
                            }, 60000)
                        } else {
                            healthPointThird = Math.round(healthPointThird - attackedFirst.attack * this.defenceMultuplicator(attackedThird.defense) * 2)
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
                            healthPointFirst = Math.round(healthPointFirst - (attacking.attack * (attacking.skill.scale + 0.3)) * this.defenceMultuplicator(attackedFirst.defense))
                        } else {
                            healthPointFirst = Math.round(healthPointFirst - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedFirst.defense))
                        }
                    } else if (mainTarget === attackedSecond) {
                        if(mainTarget.element === "Water") {
                            healthPointSecond = Math.round(healthPointSecond - (attacking.attack * (attacking.skill.scale + 0.3)) * this.defenceMultuplicator(attackedSecond.defense))
                        } else {
                            healthPointSecond = Math.round(healthPointSecond - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedSecond.defense))
                        }
                    } else if (mainTarget === attackedThird) {
                        if(mainTarget.element === "Water") {
                            healthPointThird = Math.round(healthPointThird - (attacking.attack * (attacking.skill.scale + 0.3)) * this.defenceMultuplicator(attackedThird.defense))
                        } else {
                            healthPointThird = Math.round(healthPointThird - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedThird.defense))
                        }
                    } return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Воздушный клинок":
                    healthPointFirst = Math.round(healthPointFirst - (attacking.attack * attacking.skill.scale) * this.defenceMultuplicator(attackedFirst.defense))
                    healthPointSecond = Math.round(healthPointSecond - (attacking.attack * (attacking.skill.scale + 0.1) * this.defenceMultuplicator(attackedSecond.defense)))
                    healthPointThird = Math.round(healthPointThird - (attacking.attack * (attacking.skill.scale + 0.2) * this.defenceMultuplicator(attackedThird.defense)))
                    return [healthPointFirst, healthPointSecond, healthPointThird]
                case "Циклон разрушения":
                    if (mainTarget === attackedFirst) {
                        healthPointFirst = Math.round(healthPointFirst - attacking.attack * attacking.skill.scale * this.defenceMultuplicator(attackedFirst.defense))
                    } else if (mainTarget === attackedSecond) {
                        healthPointSecond = Math.round(healthPointSecond - attacking.attack * attacking.skill.scale * this.defenceMultuplicator(attackedSecond.defense))
                    } else if (mainTarget === attackedThird) {
                        healthPointThird = Math.round(healthPointThird - attacking.attack* attacking.skill.scale * this.defenceMultuplicator(attackedThird.defense))
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

    deathScan = (arr: Monsters[], attacked: Monsters) => {
        arr = arr.filter((item) => !(item.name === attacked.name && item.side === attacked.side))
        return arr
    }

    nextMove = (arr: Monsters[], attacked: Monsters, attacking: Monsters, action: string) => {
        if ((attacking.skill.name === "Тектонический удар" && action === "skill") && this.randomForTectonicImpact() === true) {
            return arr;
        } else if ((attacking.skill.name === "Ледяной шквал" && action === "skill") && this.randomForIceSquall() === true) {
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

    defenceMultuplicator = (baseDefence: number) => {     
        return (1 - (baseDefence / (130 + baseDefence)))
    }

    calculateParam = (baseAttack: number, baseHealthPoint: number, baseDefense: number, level: number) => {
        let attack = baseAttack;
        let healthPoint = baseHealthPoint;
        let defense = baseDefense;
        for (let i = 1; i <= level; i++) {
            attack *= 1.2;  
            healthPoint *= 1.2;
            defense *= 1.2;
        }
        return [Math.round(attack), Math.round(healthPoint), Math.round(defense)];
    }

    animation = (action: string) => {
        return action === 'skill'
    }

}

export default MathPvp