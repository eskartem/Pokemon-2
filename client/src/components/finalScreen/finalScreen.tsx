import { useState, useEffect, useContext } from "react";

import './finalScreen.css'
import { stageContext } from "../../assets/context/stage";


const FinalScreen: React.FC = () => {

    const {hpBarFirstMonster,
        hpBarSecondMonster,
        hpBarThirdMonster,
        hpBarFirstEnemyMonster,
        hpBarSecondEnemyMonster,
        hpBarThirdEnemyMonster
    } = useContext(stageContext)

    let [firstPlayerWin, setFirstPlayerWin] = useState(false);
    let [secondPlayerWin, setSecondPlayerWin] = useState(false);

    const updateScene = () => {
        window.location.reload();
    }

    useEffect(() => {
        if(hpBarFirstMonster <= 0 && hpBarSecondMonster <= 0 && hpBarThirdMonster <= 0) {
            setSecondPlayerWin(true)
        } else if (hpBarFirstEnemyMonster <= 0 && hpBarSecondEnemyMonster <= 0 && hpBarThirdEnemyMonster <= 0) {
            setFirstPlayerWin(true)
        }
    }, [hpBarFirstMonster, hpBarSecondMonster, hpBarThirdMonster, hpBarFirstEnemyMonster, hpBarSecondEnemyMonster, hpBarThirdEnemyMonster])

    return (<>
        {firstPlayerWin && (
            <div className="popup-overlay">
                <div className="popup">
                    <h2>Вы Победили</h2>
                    <button id="test-battle-button-yourReplayBattle" onClick={() => {updateScene()}}>Начать заново</button>
                </div>
            </div>
        )}
        {secondPlayerWin && (
            <div className="popup-overlay">
                <div className="popup">
                    <h2>Вы Проиграли</h2>
                    <button id="test-battle-button-enemyReplayBattle" onClick={() => {updateScene()}}>Начать заново</button>
                </div>
            </div>
        )}
    </>)
}

export default FinalScreen