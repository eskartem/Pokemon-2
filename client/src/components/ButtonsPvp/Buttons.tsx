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

    let action: string = '';
    let values = [firstSelectedMonster, secondSelectedMonster, thirdSelectedMonster]

    const firstPlayerButton = useRef<HTMLDivElement>(null);
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

    const setNewSQueue = (attacked: Monsters) => {
        setSQueue(sQueue = mathPvp.nextMove(sQueue, attacked, activeMonster, action))
        setActiveMonster(sQueue[0])
    }

    const ActiveButtonMenu = () => {
        if(activeMonster.side === 'yourSide') {
            return (<>
                <div ref={firstPlayerButton} className='showButton buttons'>
                <button id="test-battle-button-yourBaseAttack" onClick={() => {
                        action = 'baseAttack'
                        hideOrShowButonns(firstPlayerButton)
                        hideOrShowButonns(yourChoose)
                    }}>Атака</button>
                    <button id="test-battle-button-yourSkill" onClick={() => {
                        action = 'skill'
                        hideOrShowButonns(firstPlayerButton)
                        hideOrShowButonns(yourChoose)
                    }}>{activeMonster.skill.name}</button>
                    <button id="test-battle-button-yourRetreat">Отступить</button>
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
                            setNewSQueue(firstSelectedEnemyMonster)
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
                            setNewSQueue(secondSelectedEnemyMonster)
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
                            setNewSQueue(thirdSelectedEnemyMonster)
                            hideOrShowButonns(yourChoose)
                            ActiveButtonMenu()
                        }}>Ударить {thirdSelectedEnemyMonster.name}</button>
                    )}
                    <button id="test-battle-button-backToFirstCombatMenu" onClick={() => {
                        hideOrShowButonns(yourChoose)
                        hideOrShowButonns(firstPlayerButton)
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

    useEffect(() => {
        if(hpBarFirstMonster <= 0) {
            setSQueue(sQueue = mathPvp.deathScan(sQueue, firstSelectedMonster))
            values = mathPvp.deathScan(values, firstSelectedMonster)
        }
        values = values;
    }, [hpBarFirstMonster])

    useEffect(() => {
        if(hpBarSecondMonster <= 0) {
            setSQueue(sQueue = mathPvp.deathScan(sQueue, secondSelectedMonster))
            values = mathPvp.deathScan(values, secondSelectedMonster)
        }
        values = values;
    }, [hpBarSecondMonster])

    useEffect(() => {
        if(hpBarThirdMonster <= 0) {
            setSQueue(sQueue = mathPvp.deathScan(sQueue, thirdSelectedMonster)) 
            values = mathPvp.deathScan(values, thirdSelectedMonster)
        }
        values = values;
    }, [hpBarThirdMonster])

    useEffect(() => {
        if(hpBarFirstEnemyMonster <= 0) {
            setSQueue(sQueue = mathPvp.deathScan(sQueue, firstSelectedEnemyMonster))
        }
        values = values;
    }, [hpBarFirstEnemyMonster])

    useEffect(() => {
        if(hpBarSecondEnemyMonster <= 0) {
            setSQueue(sQueue = mathPvp.deathScan(sQueue, secondSelectedEnemyMonster))
        }
        values = values;
    }, [hpBarSecondEnemyMonster])

    useEffect(() => {
        if(hpBarThirdEnemyMonster <= 0) {
            setSQueue(sQueue = mathPvp.deathScan(sQueue, thirdSelectedEnemyMonster)) 
        }
        values = values;
    }, [hpBarThirdEnemyMonster])

    //BotGame
    useEffect(() => {
        if(activeMonster.side === 'enemySide' && enemyType === 'bot') {
            let setAction: string = Math.random() < 1 ? 'baseAttack' : 'skill' ;
            const randomValue = values[Math.floor(Math.random() * values.length)];
            console.log(randomValue);
            console.log(values);
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
                setNewSQueue(randomValue)
                ActiveButtonMenu()
            }, 3000)
        }
    }, [activeMonster])
    
    return (<>
        <div className='buttonMenu'>
            <ActiveButtonMenu />
        </div>
    </>)
}

export default Buttons
