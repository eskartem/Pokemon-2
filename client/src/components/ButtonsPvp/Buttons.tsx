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
    } = props;

    let action: string = ''

    const firstPlayerButton = useRef<HTMLDivElement>(null);
    const firstCombatMenuButton = useRef<HTMLDivElement>(null);
    const yourChoose = useRef<HTMLDivElement>(null);
    const secondPlayerButton = useRef<HTMLDivElement>(null);
    const secondCombatMenuButton = useRef<HTMLDivElement>(null);
    const enemyChoose = useRef<HTMLDivElement>(null);

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
        if(activeMonster.name === firstSelectedMonster.name || 
            activeMonster.name === secondSelectedMonster.name || 
            activeMonster.name === thirdSelectedMonster.name) 
        {
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
                        setHpBarFirstEnemyMonster,
                        setHpBarSecondEnemyMonster, 
                        setHpBarThirdEnemyMonster,
                        hpBarFirstEnemyMonster, 
                        hpBarSecondEnemyMonster,
                        hpBarThirdEnemyMonster,
                        firstSelectedEnemyMonster,
                        secondSelectedEnemyMonster,
                        thirdSelectedEnemyMonster,
                        activeMonster, 
                        action,
                        firstSelectedEnemyMonster,
                        sQueue
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
                        setHpBarFirstEnemyMonster,
                        setHpBarSecondEnemyMonster, 
                        setHpBarThirdEnemyMonster,
                        hpBarFirstEnemyMonster, 
                        hpBarSecondEnemyMonster,
                        hpBarThirdEnemyMonster,
                        firstSelectedEnemyMonster,
                        secondSelectedEnemyMonster,
                        thirdSelectedEnemyMonster,
                        activeMonster, 
                        action,
                        secondSelectedEnemyMonster,
                        sQueue
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
                        setHpBarFirstEnemyMonster,
                        setHpBarSecondEnemyMonster, 
                        setHpBarThirdEnemyMonster,
                        hpBarFirstEnemyMonster, 
                        hpBarSecondEnemyMonster,
                        hpBarThirdEnemyMonster,
                        firstSelectedEnemyMonster,
                        secondSelectedEnemyMonster,
                        thirdSelectedEnemyMonster,
                        activeMonster, 
                        action,
                        thirdSelectedEnemyMonster,
                        sQueue
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
                } else if(activeMonster.name === firstSelectedEnemyMonster.name || 
                    activeMonster.name === secondSelectedEnemyMonster.name || 
                    activeMonster.name === thirdSelectedEnemyMonster.name) 
        
        {
            return (<>
            <div ref={secondPlayerButton} className='showButton buttons'>
                <button id="test-battle-button-enemySkill's" onClick={() => {
                    hideOrShowButonns(secondPlayerButton)
                    hideOrShowButonns(secondCombatMenuButton)
                }}>Скилы</button>
                <button id="test-battle-button-enemyRetreat">Отступить</button>
            </div>

            <div ref={secondCombatMenuButton} className='hideButton buttons'>
                <button id="test-battle-button-enemyBaseAttack" onClick={() => {
                    action = 'baseAttack'
                    hideOrShowButonns(secondCombatMenuButton)
                    hideOrShowButonns(enemyChoose)
                }}>Атака</button>
                <button id="test-battle-button-enemySkill" onClick={() => {
                    action = 'skill'
                    hideOrShowButonns(secondCombatMenuButton)
                    hideOrShowButonns(enemyChoose)
                }}>{activeMonster.skill.name}</button>
                <button id="test-battle-button-backToEnemyMainMenu" onClick={() => {
                    hideOrShowButonns(secondCombatMenuButton)
                    hideOrShowButonns(secondPlayerButton)
                }}>Назад</button>
            </div>

            <div ref={enemyChoose} className='hideButton buttons'>
            {hpBarFirstMonster > 0 && (
                <button id="test-battle-button-attackFirstMonster" onClick={() => {
                    const healthPoint = mathPvp.dealingDamage(
                        setHpBarFirstMonster,
                        setHpBarSecondMonster, 
                        setHpBarThirdMonster,
                        hpBarFirstMonster, 
                        hpBarSecondMonster,
                        hpBarThirdMonster,
                        firstSelectedMonster,
                        secondSelectedMonster,
                        thirdSelectedMonster,
                        activeMonster, 
                        action,
                        firstSelectedMonster,
                        sQueue
                    )
                    setHpBarFirstMonster(hpBarFirstMonster = healthPoint[0])
                    setHpBarSecondMonster(hpBarSecondMonster = healthPoint[1])
                    setHpBarThirdMonster(hpBarThirdMonster = healthPoint[2])
                    setHpBarFirstMonster(hpBarFirstMonster)
                    setNewSQueue(firstSelectedMonster, hpBarFirstMonster)
                    hideOrShowButonns(enemyChoose)
                    ActiveButtonMenu()
                }}>Ударить {firstSelectedMonster.name}</button>
            )}
            {hpBarSecondMonster > 0 && (
                <button id="test-battle-button-attackSecondMonster" onClick={() => {
                    const healthPoint = mathPvp.dealingDamage(
                        setHpBarFirstMonster,
                        setHpBarSecondMonster, 
                        setHpBarThirdMonster,
                        hpBarFirstMonster, 
                        hpBarSecondMonster,
                        hpBarThirdMonster,
                        firstSelectedMonster,
                        secondSelectedMonster,
                        thirdSelectedMonster,
                        activeMonster, 
                        action,
                        secondSelectedMonster,
                        sQueue
                    )
                    setHpBarFirstMonster(hpBarFirstMonster = healthPoint[0])
                    setHpBarSecondMonster(hpBarSecondMonster = healthPoint[1])
                    setHpBarThirdMonster(hpBarThirdMonster = healthPoint[2])
                    setNewSQueue(secondSelectedMonster, hpBarSecondMonster)
                    hideOrShowButonns(enemyChoose)
                    ActiveButtonMenu()
                }}>Ударить {secondSelectedMonster.name}</button>
            )}
            {hpBarThirdMonster > 0 && (
                <button id="test-battle-button-attackThirdMonster" onClick={() => {
                    const healthPoint = mathPvp.dealingDamage(
                        setHpBarFirstMonster,
                        setHpBarSecondMonster, 
                        setHpBarThirdMonster,
                        hpBarFirstMonster, 
                        hpBarSecondMonster,
                        hpBarThirdMonster,
                        firstSelectedMonster,
                        secondSelectedMonster,
                        thirdSelectedMonster,
                        activeMonster, 
                        action,
                        thirdSelectedMonster,
                        sQueue
                    )
                    setHpBarFirstMonster(hpBarFirstMonster = healthPoint[0])
                    setHpBarSecondMonster(hpBarSecondMonster = healthPoint[1])
                    setHpBarThirdMonster(hpBarThirdMonster = healthPoint[2])
                    setNewSQueue(thirdSelectedMonster, hpBarThirdMonster)
                    hideOrShowButonns(enemyChoose)
                    ActiveButtonMenu()
                }}>Ударить {thirdSelectedMonster.name}</button>
            )}
                <button id="test-battle-button-backToEnemyCombatMenu"onClick={() => {
                    hideOrShowButonns(enemyChoose)
                    hideOrShowButonns(secondCombatMenuButton)
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
    
    return (<>
        <div className='buttonMenu'>
            <ActiveButtonMenu />
        </div>
    </>)
}

export default Buttons
