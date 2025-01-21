import  {useEffect, useRef, useContext} from "react"

import './Buttons.css'
import MathPvp from "../../services/MathPvp/MathPvp";

import { stageContext } from "../../assets/context/stage";
import { TMonster } from "../../services/server/types";
import { ServerContext } from "../../App";

interface buttonsProps {
        //enemyType: string
        //animation: boolean
        //setAnimation: (Animation: boolean) => void
        //attackedPosition: string
        //setAttackedPosition: (attackedPosition: string) => void,
}

const Buttons: React.FC<buttonsProps> = (props: buttonsProps) => {
    const mathPvp = new MathPvp();

    const server = useContext(ServerContext)

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
        oppMonster,
        monster,
        setButtonClicked,
        setTime
    } = useContext(stageContext)


    let action: string = '';

    const firstPlayerButton = useRef<HTMLDivElement>(null);
    const yourChoose = useRef<HTMLDivElement>(null);
    const secondPlayerButton = useRef<HTMLDivElement>(null);
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


    useEffect(() => {
        ActiveButtonMenu()
    }, [activeMonster])

    const setSkill = (monsterId: number) => {
        switch (monsterId) {
            case 1:
                return 'Ледяной шквал'
            case 2:
                return 'Каскад'
            case 3:
                return 'Волна разрушений'
            case 4: 
                return 'Испепелящий удар'
            case 5:
                return 'Пепельный взрыв'
            case 6:
                return 'Огненная буря'
            case 7:
                return 'Гравитационная волна'
            case 8:
                return 'Земной импульс'
            case 9:
                return 'Тектонический удар'
            case 10:
                return 'Штормовой порыв'
            case 11:
                return 'Воздушный клинок'
            case 12:
                return 'Циклон разрушений'
        }
    }

    const activeMonsterInfo = (activeMonster: TMonster) => {
        switch(activeMonster) {
            case firstSelectedMonster:
                return monster[0]
            case secondSelectedMonster:
                return monster[1]
            case thirdSelectedMonster:
                return monster[2]
            case firstSelectedEnemyMonster:
                return oppMonster[0]
            case secondSelectedEnemyMonster:
                return oppMonster[1]
            case thirdSelectedEnemyMonster:
                return oppMonster[2]
            default:
                return 0
        }
    }
    
    const ActiveButtonMenu = () => {
        if(activeMonster === firstSelectedMonster || activeMonster === secondSelectedMonster || activeMonster === thirdSelectedMonster) {
            return (<>
                <div ref={firstPlayerButton} className='showButton buttons'>
                <button id="test-battle-button-yourBaseAttack" onClick={() => {
                        action = 'attack'
                        hideOrShowButonns(firstPlayerButton)
                        hideOrShowButonns(yourChoose)
                    }}>Атака</button>
                    <button id="test-battle-button-yourSkill" onClick={() => {
                        action = 'skill'
                        hideOrShowButonns(firstPlayerButton)
                        hideOrShowButonns(yourChoose)
                    }}>{setSkill(activeMonster.typeId)}</button>
                    <button id="test-battle-button-yourRetreat" onClick={() => {
                        action='escape'
                        server.actionUser(activeMonsterInfo(activeMonster), oppMonster[0], action)
                    }}>Отступить</button>
                </div>
                <div ref={yourChoose} className='hideButton buttons'>
                    {hpBarFirstEnemyMonster > 0 && (
                        <button id="test-battle-button-attackFirstEnemyMonster" onClick={() => {
                            server.actionUser(activeMonsterInfo(activeMonster), oppMonster[0], action)
                            server.stopBattleUpdate()
                            setTime(100)
                            setButtonClicked(true)
                            setSQueue(sQueue = mathPvp.nextMove(sQueue))
                        }}>Ударить {firstSelectedEnemyMonster.name}</button>
                    )}
                    {hpBarSecondEnemyMonster > 0 && (
                        <button id="test-battle-button-attackSecondEnemyMonster" onClick={() => {
                            server.actionUser(activeMonsterInfo(activeMonster), oppMonster[1], action)
                            server.stopBattleUpdate()
                            setTime(100)
                            setButtonClicked(true)
                            setSQueue(sQueue = mathPvp.nextMove(sQueue))
                        }}>Ударить {secondSelectedEnemyMonster.name}</button>
                    )}
                    {hpBarThirdEnemyMonster > 0 &&(
                        <button id="test-battle-button-attackThirdEnemyMonster" onClick={() => {
                            server.actionUser(activeMonsterInfo(activeMonster), oppMonster[2], action)
                            server.stopBattleUpdate()
                            setTime(100)
                            setButtonClicked(true)
                            setSQueue(sQueue = mathPvp.nextMove(sQueue))
                        }}>Ударить {thirdSelectedEnemyMonster.name}</button>
                    )}
                    <button id="test-battle-button-backToFirstCombatMenu" onClick={() => {
                        hideOrShowButonns(yourChoose)
                        hideOrShowButonns(firstPlayerButton)
                    }}>Назад </button>
                </div>
            </>)
        }else if(activeMonster === firstSelectedEnemyMonster || activeMonster === secondSelectedEnemyMonster || activeMonster === thirdSelectedEnemyMonster){
            return (<>
                <div ref={secondPlayerButton} className='showButton buttons'>
                <button id="test-battle-button-enemyBaseAttack" onClick={() => {
                        action = 'attack'
                        hideOrShowButonns(secondPlayerButton)
                        hideOrShowButonns(enemyChoose)
                    }}>Атака</button>
                    <button id="test-battle-button-enemySkill" onClick={() => {
                        action = 'skill'
                        hideOrShowButonns(secondPlayerButton)
                        hideOrShowButonns(enemyChoose)
                    }}>{setSkill(activeMonster.typeId)}</button>
                    <button id="test-battle-button-enemyRetreat" onClick={() => {
                        action='escape'
                        server.actionUser(activeMonsterInfo(activeMonster), monster[0], action)
                    }}>Отступить</button>
                </div>
                <div ref={enemyChoose} className='hideButton buttons'>
                    {hpBarFirstMonster > 0 && (
                        <button id="test-battle-button-attackFirstMonster" onClick={() => {
                            server.actionUser(activeMonsterInfo(activeMonster), monster[0], action)
                            server.stopBattleUpdate()
                            setTime(100)
                            setButtonClicked(true)
                            setSQueue(sQueue = mathPvp.nextMove(sQueue))
                        }}>Ударить {firstSelectedMonster.name}</button>
                    )}
                    {hpBarSecondMonster > 0 && (
                        <button id="test-battle-button-attackSecondMonster" onClick={() => {
                            server.actionUser(activeMonsterInfo(activeMonster), monster[1], action)
                            server.stopBattleUpdate()
                            setTime(100)
                            setButtonClicked(true)
                            setSQueue(sQueue = mathPvp.nextMove(sQueue))
                        }}>Ударить {secondSelectedMonster.name}</button>
                    )}
                    {hpBarThirdMonster > 0 &&(
                        <button id="test-battle-button-attackThirdMonster" onClick={() => {
                            server.actionUser(activeMonsterInfo(activeMonster), monster[2], action)
                            server.stopBattleUpdate()
                            setTime(100)
                            setButtonClicked(true)
                            setSQueue(sQueue = mathPvp.nextMove(sQueue))
                        }}>Ударить {thirdSelectedMonster.name}</button>
                    )}
                    <button id="test-battle-button-backToSecondCombatMenu" onClick={() => {
                        hideOrShowButonns(enemyChoose)
                        hideOrShowButonns(secondPlayerButton)
                    }}>Назад </button>
                </div>
            </>)
        } else {
            return(<></>)
        }
    }
    return (<>
        <div className='buttonMenu'>
            <ActiveButtonMenu />
        </div>
    </>)
}

export default Buttons
