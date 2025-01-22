import  {useEffect, useRef, useContext, useMemo, useState} from "react"

import './Buttons.css'
import MathPvp from "../../services/MathPvp/MathPvp";

import { stageContext } from "../../assets/context/stage";
import { TMonster } from "../../services/server/types";
import { ServerContext } from "../../App";

const Buttons: React.FC = () => {
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
        setTime,
        setQueue,
        fightId,
        Queues,
        firstPlayer,
        secondPlayer
    } = useContext(stageContext)

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

    const [action, setAction] = useState<string>('')

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


        const ActiveButtonMenu = useMemo(() => <>
                <div ref={firstPlayerButton} className='showButton buttons'>
                <button id="test-battle-button-yourBaseAttack" onClick={() => {
                        setAction('attack')
                        hideOrShowButonns(firstPlayerButton)
                        hideOrShowButonns(yourChoose)
                    }}>Атака</button>
                    <button id="test-battle-button-yourSkill" onClick={() => {
                        setAction('skill')
                        hideOrShowButonns(firstPlayerButton)
                        hideOrShowButonns(yourChoose)
                    }}>{setSkill(activeMonster.typeId)}</button>
                    <button id="test-battle-button-yourRetreat" onClick={async () => {
                        setAction('escape')
                        const result = await server.actionUser(activeMonsterInfo(activeMonster), oppMonster[0], action)
                        if(result?.result === false) {
                            return
                        } else {
                            
                        }
                    }}>Отступить</button>
                </div>
                <div ref={yourChoose} className='hideButton buttons'>
                    {hpBarFirstEnemyMonster > 0 && (
                        <button id="test-battle-button-attackFirstEnemyMonster" onClick={() => {
                            if (action) {
                                server.actionUser(Queues[0], oppMonster[0], action)
                            }
                            setButtonClicked(true)
                            setQueue(fightId, Queues)
                            hideOrShowButonns(yourChoose)
                            hideOrShowButonns(firstPlayerButton)
                        }}>Ударить {firstSelectedEnemyMonster.name}</button>
                    )}
                    {hpBarSecondEnemyMonster > 0 && (
                        <button id="test-battle-button-attackSecondEnemyMonster" onClick={() => {
                            if (action) {
                                server.actionUser(Queues[0], oppMonster[1], action)
                            }
                            setButtonClicked(true)
                            setQueue(fightId, Queues)
                            hideOrShowButonns(yourChoose)
                            hideOrShowButonns(firstPlayerButton)
                        }}>Ударить {secondSelectedEnemyMonster.name}</button>
                    )}
                    {hpBarThirdEnemyMonster > 0 &&(
                        <button id="test-battle-button-attackThirdEnemyMonster" onClick={() => {
                            if (action) {
                                server.actionUser(Queues[0], oppMonster[2], action)
                            }
                            setButtonClicked(true)
                            setQueue(fightId, Queues)
                            hideOrShowButonns(yourChoose)
                            hideOrShowButonns(firstPlayerButton)
                        }}>Ударить {thirdSelectedEnemyMonster.name}</button>
                    )}
                    <button id="test-battle-button-backToFirstCombatMenu" onClick={() => {
                        hideOrShowButonns(yourChoose)
                        hideOrShowButonns(firstPlayerButton)
                    }}>Назад </button>
                </div>
            </>, [
                activeMonster,
                Queues,
                hpBarFirstEnemyMonster,
                hpBarSecondEnemyMonster,
                hpBarThirdEnemyMonster,
                monster,
                oppMonster,
                action
            ])
    
    return (<>
        <div className='buttonMenu'>
            {ActiveButtonMenu }
        </div>
    </>)
}

export default Buttons
