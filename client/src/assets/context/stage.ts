import { createContext } from "react"

import Monster from "../Monsters/Monster"

import { Monsters } from "../Monsters/Monster"

interface stageContext{
    hpBarFirstMonster: number,
    hpBarSecondMonster: number,
    hpBarThirdMonster: number,
    hpBarFirstEnemyMonster: number,
    hpBarSecondEnemyMonster: number,
    hpBarThirdEnemyMonster: number,
    firstSelectedMonster: Monsters,
    secondSelectedMonster: Monsters,
    thirdSelectedMonster: Monsters,
    firstSelectedEnemyMonster: Monsters,
    secondSelectedEnemyMonster: Monsters,
    thirdSelectedEnemyMonster: Monsters,
    activeMonster: Monsters,
    sQueue: Monsters[],
    stageProps: {
      width: number,
      height: number,
    },
    setHpBarFirstEnemyMonster: (hpBarFirstMonsterumber: number) => void,
    setHpBarFirstMonster: (hpBarSecondMonster: number) => void,
    setHpBarSecondEnemyMonster: (hpBarThirdMonster: number) => void,
    setHpBarSecondMonster: (hpBarFirstEnemyMonster: number) => void,
    setHpBarThirdEnemyMonster: (hpBarSecondEnemyMonster: number) => void,
    setHpBarThirdMonster: (hpBarThirdEnemyMonster: number) => void,
    setSQueue: (sQueue: Monsters[]) => void,
    setActiveMonster: (activeMonster: Monsters) => void,
  }
  
  export const stageContext = createContext<stageContext>({
    hpBarFirstMonster: 0,
    hpBarSecondMonster: 0,
    hpBarThirdMonster: 0,
    hpBarFirstEnemyMonster: 0,
    hpBarSecondEnemyMonster: 0,
    hpBarThirdEnemyMonster: 0,
    firstSelectedMonster: new Monster,
    secondSelectedMonster: new Monster,
    thirdSelectedMonster: new Monster,
    firstSelectedEnemyMonster: new Monster,
    secondSelectedEnemyMonster: new Monster,
    thirdSelectedEnemyMonster: new Monster,
    activeMonster: new Monster,
    sQueue: [],
    stageProps: {
      width: 0,
      height: 0,
    },
    setHpBarFirstEnemyMonster: () => {},
    setHpBarFirstMonster: () => {},
    setHpBarSecondEnemyMonster: () => {},
    setHpBarSecondMonster: () => {},
    setHpBarThirdEnemyMonster: () => {},
    setHpBarThirdMonster: () => {},
    setSQueue: () => {},
    setActiveMonster: () => {},
  })