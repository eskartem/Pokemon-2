import { useState, useEffect, useContext } from "react";

import './finalScreen.css'
import { stageContext } from "../../assets/context/stage";
import { ServerContext } from "../../App";
import { TEBattle } from "../../services/server/types";


const FinalScreen: React.FC = () => {

    const {hpBarFirstMonster,
        hpBarSecondMonster,
        hpBarThirdMonster,
        hpBarFirstEnemyMonster,
        hpBarSecondEnemyMonster,
        hpBarThirdEnemyMonster,
        fightId,
        firstPlayer,
        secondPlayer
    } = useContext(stageContext)

    const server = useContext(ServerContext)

    const [results, SetResults] = useState<TEBattle>()
    const [battleCaput, setBattleCaput] = useState<boolean>(false)

    const endBattle = async (fightId: number) => {
        try {
            const result = await server.endBattle(fightId)
            console.log(result);
            if(result) {SetResults(result)}
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if((hpBarFirstMonster <= 0 && hpBarSecondMonster <= 0 && hpBarThirdMonster <= 0) || 
            (hpBarFirstEnemyMonster <= 0 && hpBarSecondEnemyMonster<= 0 && hpBarThirdEnemyMonster<= 0)) {
                endBattle(fightId)  
                if (!results) endBattle(fightId)
                setBattleCaput(true)
        }
    }, [hpBarFirstMonster, hpBarSecondMonster, hpBarThirdMonster, hpBarFirstEnemyMonster, hpBarSecondEnemyMonster, hpBarThirdEnemyMonster])

    return (<>
        {battleCaput && (
            <div className="popup-overlay">
                <div className="popup">
                    {results && (<>
                        <h2>победил {results.WinnerId === firstPlayer.user_id ? 'победил первый игрок' : 'победил второй игрок'}</h2>
                        <br></br>
                        <h3>Изменение ресурсов</h3>
                        <h3>{results?.WinnerId} Получил {results?.crystal} кристалов, {results?.eggsFragm} скорлупы, {results?.money} золота</h3>
                        <h3>{results?.LoserId} Проебал {results?.crystal} кристалов, {results?.eggsFragm} скорлупы, {results?.money} золота</h3>
                        </>)}
                </div>
            </div>
        )}
    </>)
}

export default FinalScreen