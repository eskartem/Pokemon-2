import  {useEffect, useRef, useContext, useMemo, useState} from "react"
import { ServerContext } from "../../App";
import { TMonster, EActions } from "../../services/server/types";
import { stageContext } from "../../assets/context/stage";
import MathPvp from "../../services/MathPvp/MathPvp";

import './Buttons.css'

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
        setTime,
        setQueue,
        fightId,
        Queues,
        firstPlayer,
        secondPlayer
    } = useContext(stageContext); 
    
    const [action, setAction] = useState<EActions | null>(null);

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
    
    // useEffect(() => {
    //     ActiveButtonMenu()
    // }, [activeMonster])

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
                        setAction(EActions.attack)
                        hideOrShowButonns(firstPlayerButton)
                        hideOrShowButonns(yourChoose)
                    }}>Атака</button>
                    <button id="test-battle-button-yourSkill" onClick={() => {
                        setAction(EActions.skill)
                        hideOrShowButonns(firstPlayerButton)
                        hideOrShowButonns(yourChoose)
                    }}>{setSkill(activeMonster.typeId)}</button>
                    <button id="test-battle-button-yourRetreat">Отступить</button>
                </div>
                <div ref={yourChoose} className='hideButton buttons'>
                    {hpBarFirstEnemyMonster > 0 && (
                        <button id="test-battle-button-attackFirstEnemyMonster" onClick={async () => {
                            if (action) {
                                await server.actionUser(Queues[0], oppMonster[0], action)
                            }
                            server.stopBattleUpdate()
                            setTime(100)
                            setButtonClicked(true)
                            setQueue(fightId, Queues)

                        }}>Ударить {firstSelectedEnemyMonster.name}</button>
                    )}
                    {hpBarSecondEnemyMonster > 0 && (
                        <button id="test-battle-button-attackSecondEnemyMonster" onClick={() => {
                            if (action) {
                                server.actionUser(Queues[0], oppMonster[1], action)
                            }
                            server.stopBattleUpdate()
                            setTime(100)
                            setButtonClicked(true)
                            setSQueue(sQueue = mathPvp.nextMove(sQueue))
                        }}>Ударить {secondSelectedEnemyMonster.name}</button>
                    )}
                    {hpBarThirdEnemyMonster > 0 &&(
                        <button id="test-battle-button-attackThirdEnemyMonster" onClick={() => {
                            if (action) {
                                server.actionUser(Queues[0], oppMonster[2], action)
                            }
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
            </>
        , [    
            activeMonster, 
            hpBarFirstEnemyMonster, 
            hpBarSecondEnemyMonster, 
            hpBarThirdEnemyMonster,
            Queues,
            oppMonster,
            firstSelectedEnemyMonster,
            secondSelectedEnemyMonster,
            thirdSelectedEnemyMonster
        ])
    
    return (<>
        <div className='buttonMenu'>
            {ActiveButtonMenu}
        </div>
    </>)
}

export default Buttons
