import  {useRef} from "react"

import './Buttons.css'
import MathPvp from "../../modules/MathPvp/MathPvp";

const Buttons: React.FC = (props: any) => {

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
        setHpBarThirdMonster
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

    const ActiveButtonMenu = () => {
        if(activeMonster.name == firstSelectedMonster.name || activeMonster.name == secondSelectedMonster.name || activeMonster.name == thirdSelectedMonster.name) {
            return (<>
                <div ref={firstPlayerButton} className='showButton buttons'>
                <button onClick={() => {
                    hideOrShowButonns(firstPlayerButton)
                    hideOrShowButonns(firstCombatMenuButton)
                }}>Скилы</button>
                <button>Отступить</button>
            </div>
            <div ref={firstCombatMenuButton} className='hideButton buttons'>
                <button onClick={() => {
                    action = 'baseAttack'
                    hideOrShowButonns(firstCombatMenuButton)
                    hideOrShowButonns(yourChoose)
                }}>Толчок</button>
                <button onClick={() => {
                    action = 'skill'
                    hideOrShowButonns(firstCombatMenuButton)
                    hideOrShowButonns(yourChoose)
                }}>Скилл</button>
                <button onClick={() => {
                    action = 'block'
                }}>Блок</button>
                <button onClick={() => {
                    hideOrShowButonns(firstCombatMenuButton)
                    hideOrShowButonns(firstPlayerButton)
                }}>Назад</button>
            </div>
            <div ref={yourChoose} className='hideButton buttons'>
                <button onClick={() => {
                    setHpBarFirstEnemyMonster(hpBarFirstEnemyMonster = mathPvp.dealingDamage(hpBarFirstEnemyMonster, activeMonster, action))
                    setSQueue(mathPvp.nextMove(sQueue))
                    setActiveMonster(activeMonster = sQueue[0])
                    hideOrShowButonns(yourChoose)
                    ActiveButtonMenu()
                }}>Ударить {firstSelectedEnemyMonster.name}</button>
                <button onClick={() => {
                    setHpBarSecondEnemyMonster(hpBarSecondEnemyMonster = mathPvp.dealingDamage(hpBarSecondEnemyMonster, activeMonster, action))
                    setSQueue(mathPvp.nextMove(sQueue))
                    setActiveMonster(activeMonster = sQueue[0])
                    hideOrShowButonns(yourChoose)
                    ActiveButtonMenu()
                }}>Ударить {secondSelectedEnemyMonster.name}</button>
                <button onClick={() => {
                    setHpBarThirdEnemyMonster(hpBarThirdEnemyMonster = mathPvp.dealingDamage(hpBarThirdEnemyMonster, activeMonster, action))
                    setSQueue(mathPvp.nextMove(sQueue))
                    setActiveMonster(activeMonster = sQueue[0])
                    hideOrShowButonns(yourChoose)
                    ActiveButtonMenu()
                }}>Ударить {thirdSelectedEnemyMonster.name}</button>
                <button onClick={() => {
                    hideOrShowButonns(yourChoose)
                    hideOrShowButonns(firstCombatMenuButton)
                }}>Назад </button>
            </div>
            </>)
        } else if(activeMonster.name == firstSelectedEnemyMonster.name || activeMonster.name == secondSelectedEnemyMonster.name || activeMonster.name == thirdSelectedEnemyMonster.name){
            return (<>
            <div ref={secondPlayerButton} className='showButton buttons'>
                <button onClick={() => {
                    hideOrShowButonns(secondPlayerButton)
                    hideOrShowButonns(secondCombatMenuButton)
                }}>Скилы</button>
                <button>Отступить</button>
            </div>

            <div ref={secondCombatMenuButton} className='hideButton buttons'>
            <button onClick={() => {
                    action = 'baseAttack'
                    hideOrShowButonns(secondCombatMenuButton)
                    hideOrShowButonns(enemyChoose)
                }}>Толчок</button>
                <button onClick={() => {
                    action = 'skill'
                    hideOrShowButonns(secondCombatMenuButton)
                    hideOrShowButonns(enemyChoose)
                }}>Скилл</button>
                <button onClick={() => {
                    action = 'block'
                }}>Блок</button>
                <button onClick={() => {
                    hideOrShowButonns(secondCombatMenuButton)
                    hideOrShowButonns(secondPlayerButton)
                }}>Назад</button>
            </div>

            <div ref={enemyChoose} className='hideButton buttons'>
                <button onClick={() => {
                    setHpBarFirstMonster(hpBarFirstMonster = mathPvp.dealingDamage(hpBarFirstMonster, activeMonster, action))
                    setSQueue(mathPvp.nextMove(sQueue))
                    setActiveMonster(activeMonster = sQueue[0])
                    hideOrShowButonns(enemyChoose)
                    ActiveButtonMenu()
                }}>Ударить {firstSelectedMonster.name}</button>
                <button onClick={() => {
                    setHpBarSecondMonster(hpBarSecondMonster = mathPvp.dealingDamage(hpBarSecondMonster, activeMonster, action))
                    setSQueue(mathPvp.nextMove(sQueue))
                    setActiveMonster(activeMonster = sQueue[0])
                    hideOrShowButonns(enemyChoose)
                    ActiveButtonMenu()
                }}>Ударить {secondSelectedMonster.name}</button>
                <button onClick={() => {
                    setHpBarThirdMonster(hpBarThirdMonster = mathPvp.dealingDamage(hpBarThirdMonster, activeMonster, action))
                    setSQueue(mathPvp.nextMove(sQueue))
                    setActiveMonster(activeMonster = sQueue[0])
                    hideOrShowButonns(enemyChoose)
                    ActiveButtonMenu()
                }}>Ударить {thirdSelectedMonster.name}</button>
                <button onClick={() => {
                    hideOrShowButonns(enemyChoose)
                    hideOrShowButonns(secondCombatMenuButton)
                }}>Назад </button>
            </div>
            </>)
        } else {
            return(<><button>Проеб</button></>)
        }
    }
    
    return (<>
        <div className='buttonMenu'>
            <ActiveButtonMenu />
        </div>
    </>)
}

export default Buttons
