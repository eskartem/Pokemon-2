import  {useEffect, useRef, useState} from "react"

import './Buttons.css'
import MathPvp from "../../services/MathPvp/MathPvp";

import { Monsters } from "../../assets/Monsters/Monster";

interface buttonsProps {
        activeMonster: Monsters, 
        firstSelectedMonster: Monsters,
        secondSelectedMonster: Monsters,
        thirdSelectedMonster: Monsters,
        firstSelectedEnemyMonster: Monsters,
        secondSelectedEnemyMonster: Monsters,
        thirdSelectedEnemyMonster: Monsters,
        setSQueue: (sQueue: Monsters[]) => void,
        sQueue: Monsters[],
        setActiveMonster: (activeMonster: Monsters) => void,
        hpBarFirstMonster: number,
        hpBarSecondMonster: number,
        hpBarThirdMonster: number,
        hpBarFirstEnemyMonster: number,
        hpBarSecondEnemyMonster: number,
        hpBarThirdEnemyMonster: number,
        setHpBarFirstEnemyMonster: (hpBarFirstMonsterumber: number) => void,
        setHpBarFirstMonster: (hpBarSecondMonster: number) => void,
        setHpBarSecondEnemyMonster: (hpBarThirdMonster: number) => void,
        setHpBarSecondMonster: (hpBarFirstEnemyMonster: number) => void,
        setHpBarThirdEnemyMonster: (hpBarSecondEnemyMonster: number) => void,
        setHpBarThirdMonster: (hpBarThirdEnemyMonster: number) => void,
        enemyType: string
}

const Buttons: React.FC<buttonsProps> = (props: buttonsProps) => {

    const mathPvp = new MathPvp();
    let {activeMonster, 
        firstSelectedMonster,
        secondSelectedMonster,
        thirdSelectedMonster,
        firstSelectedEnemyMonster,
        secondSelectedEnemyMonster,
        thirdSelectedEnemyMonster,
        setSQueue,
        sQueue,
        setActiveMonster,
        hpBarFirstMonster,
        hpBarSecondMonster,
        hpBarThirdMonster,
        hpBarFirstEnemyMonster,
        hpBarSecondEnemyMonster,
        hpBarThirdEnemyMonster,
        setHpBarFirstEnemyMonster,
        setHpBarFirstMonster,
        setHpBarSecondEnemyMonster,
        setHpBarSecondMonster,
        setHpBarThirdEnemyMonster,
        setHpBarThirdMonster,
        enemyType
    } = props;

    let action: string = ''

    const firstPlayerButton = useRef<HTMLDivElement>(null);
    const firstCombatMenuButton = useRef<HTMLDivElement>(null);
    const yourChoose = useRef<HTMLDivElement>(null);

    const hideOrShowButonns = (props: any) => {
        if (props.current.classList.contains('showButton')) {
            props.current.classList.remove('showButton');
            props.current.classList.add('hideButton')
        } else {
            props.current.classList.remove('hideButton')
            props.current.classList.add('showButton')
        }
    }

    const setNewSQueue = (attacked: Monsters, healPoint: number) => {
        setSQueue(sQueue = mathPvp.nextMove(sQueue, attacked, healPoint, activeMonster, action))
        setActiveMonster(sQueue[0])
    }

    const ActiveButtonMenu = () => {
        if(activeMonster.side === 'yourSide') {
            return (<>
                <div ref={firstPlayerButton} className='showButton buttons'>
                    <button id="test-battle-button-yourSkill's" className="buttonsBorder" onClick={() => {
                        hideOrShowButonns(firstPlayerButton)
                        hideOrShowButonns(firstCombatMenuButton)
                    }}>Скилы</button>
                    <button id="test-battle-button-yourRetreat">Отступить</button>
                </div>
                <div ref={firstCombatMenuButton} className='hideButton buttons'>
                    <button id="test-battle-button-yourBaseAttack" onClick={() => {
                        action = 'baseAttack'
                        hideOrShowButonns(firstCombatMenuButton)
                        hideOrShowButonns(yourChoose)
                    }}>Атака</button>
                    <button id="test-battle-button-yourSkill" onClick={() => {
                        action = 'skill'
                        hideOrShowButonns(firstCombatMenuButton)
                        hideOrShowButonns(yourChoose)
                    }}>{activeMonster.skill.name}</button>
                    <button id="test-battle-button-backToYourMainMenu" onClick={() => {
                        hideOrShowButonns(firstCombatMenuButton)
                        hideOrShowButonns(firstPlayerButton)
                    }}>Назад</button>
                </div>
                <div ref={yourChoose} className='hideButton buttons'>
                {hpBarFirstEnemyMonster > 0 && (
                    <button id="test-battle-button-attackFirstEnemyMonster" onClick={() => {
                        const healthPoint = mathPvp.dealingDamage(
                            hpBarFirstEnemyMonster, 
                            hpBarSecondEnemyMonster,
                            hpBarThirdEnemyMonster,
                            firstSelectedEnemyMonster,
                            secondSelectedEnemyMonster,
                            thirdSelectedEnemyMonster,
                            activeMonster,
                            action,
                            firstSelectedEnemyMonster
                        )
                        setHpBarFirstEnemyMonster(hpBarFirstEnemyMonster = healthPoint[0])
                        setHpBarSecondEnemyMonster(hpBarSecondEnemyMonster = healthPoint[1])
                        setHpBarThirdEnemyMonster(hpBarThirdEnemyMonster = healthPoint[2])
                        setNewSQueue(firstSelectedEnemyMonster, hpBarFirstEnemyMonster)
                        hideOrShowButonns(yourChoose)
                        ActiveButtonMenu()
                    }}>Ударить {firstSelectedEnemyMonster.name}</button>
                )}
                {hpBarSecondEnemyMonster > 0 && (
                    <button id="test-battle-button-attackSecondEnemyMonster" onClick={() => {
                        const healthPoint = mathPvp.dealingDamage(
                            hpBarFirstEnemyMonster, 
                            hpBarSecondEnemyMonster,
                            hpBarThirdEnemyMonster,
                            firstSelectedEnemyMonster,
                            secondSelectedEnemyMonster,
                            thirdSelectedEnemyMonster,
                            activeMonster, 
                            action,
                            secondSelectedEnemyMonster
                        )
                        setHpBarFirstEnemyMonster(hpBarFirstEnemyMonster = healthPoint[0])
                        setHpBarSecondEnemyMonster(hpBarSecondEnemyMonster = healthPoint[1])
                        setHpBarThirdEnemyMonster(hpBarThirdEnemyMonster = healthPoint[2])
                        setNewSQueue(secondSelectedEnemyMonster, hpBarSecondEnemyMonster)
                        hideOrShowButonns(yourChoose)
                        ActiveButtonMenu()
                    }}>Ударить {secondSelectedEnemyMonster.name}</button>
                )}
                {hpBarThirdEnemyMonster > 0 &&(
                    <button id="test-battle-button-attackThirdEnemyMonster" onClick={() => {
                        const healthPoint = mathPvp.dealingDamage(
                            hpBarFirstEnemyMonster, 
                            hpBarSecondEnemyMonster,
                            hpBarThirdEnemyMonster,
                            firstSelectedEnemyMonster,
                            secondSelectedEnemyMonster,
                            thirdSelectedEnemyMonster,
                            activeMonster, 
                            action,
                            thirdSelectedEnemyMonster
                        )
                        setHpBarFirstEnemyMonster(hpBarFirstEnemyMonster = healthPoint[0])
                        setHpBarSecondEnemyMonster(hpBarSecondEnemyMonster = healthPoint[1])
                        setHpBarThirdEnemyMonster(hpBarThirdEnemyMonster = healthPoint[2])
                        setNewSQueue(thirdSelectedEnemyMonster, hpBarThirdEnemyMonster)
                        hideOrShowButonns(yourChoose)
                        ActiveButtonMenu()
                    }}>Ударить {thirdSelectedEnemyMonster.name}</button>
                )}
                <button id="test-battle-button-backToFirstCombatMenu" onClick={() => {
                    hideOrShowButonns(yourChoose)
                    hideOrShowButonns(firstCombatMenuButton)
                }}>Назад </button>
            </div>
            </>)
        } else {
            return(<></>)
        }
    }

    useEffect(() => {
        setHpBarFirstMonster(mathPvp.isDead(hpBarFirstMonster))
        setHpBarSecondMonster(mathPvp.isDead(hpBarSecondMonster))
        setHpBarThirdMonster(mathPvp.isDead(hpBarThirdMonster))
        setHpBarFirstEnemyMonster(mathPvp.isDead(hpBarFirstEnemyMonster))
        setHpBarSecondEnemyMonster(mathPvp.isDead(hpBarSecondEnemyMonster))
        setHpBarThirdEnemyMonster(mathPvp.isDead(hpBarThirdEnemyMonster))
    }, [hpBarFirstMonster, hpBarSecondMonster, hpBarThirdMonster, hpBarFirstEnemyMonster, hpBarSecondEnemyMonster, hpBarThirdEnemyMonster])

    //BotGame
    useEffect(() => {
        if(activeMonster.side === 'enemySide' && enemyType === 'bot') {
          const setAction: string = Math.random() < 0.5 ? 'baseAttack' : 'skill' ;
          const values = [firstSelectedMonster, secondSelectedMonster, thirdSelectedMonster];
          const randomValue = values[Math.floor(Math.random() * values.length)];
          setTimeout(() => {
            const healthPoint = mathPvp.dealingDamage(
                hpBarFirstMonster, 
                hpBarSecondMonster,
                hpBarThirdMonster,
                firstSelectedMonster,
                secondSelectedMonster,
                thirdSelectedMonster,
                activeMonster, 
                setAction,
                randomValue
            )
            setHpBarFirstMonster(hpBarFirstMonster = healthPoint[0])
            setHpBarSecondMonster(hpBarSecondMonster = healthPoint[1])
            setHpBarThirdMonster(hpBarThirdMonster = healthPoint[2])
            setNewSQueue(firstSelectedMonster, hpBarFirstMonster)
            ActiveButtonMenu()
          }, 5000)
        }
    }, [activeMonster])
    
    return (<>
        <div className='buttonMenu'>
            <ActiveButtonMenu />
        </div>
    </>)
}

export default Buttons
