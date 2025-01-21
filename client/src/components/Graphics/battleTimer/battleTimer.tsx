import { useState, useEffect, useContext } from "react"
import { Text, Container } from "@pixi/react";

import { Monsters } from "../../../assets/Monsters/Monster";
import MathPvp from "../../../services/MathPvp/MathPvp";
import { stageContext } from "../../../assets/context/stage";
import { TMonster } from "../../../services/server/types";

const BattleTimer: React.FC = () => {

        let {stageProps, 
            activeMonster,
            setSQueue,
            sQueue,
            setActiveMonster,
            Queues,
            setQueue,
            fightId
        } = useContext(stageContext)

        let [timer, setTimer] = useState<number>(30);
        let [Monster, setMonster] = useState<TMonster>(activeMonster)
        let timerId: NodeJS.Timeout;

        const mathPvp = new MathPvp();

        useEffect(() => {  
            if(timer > 0) {
                timerId = setInterval(() => {
                    setTimer(prevCount => prevCount - 1); 
                }, 1000); 
            } else {
                setSQueue(sQueue = mathPvp.timeIsOut(sQueue))
                setActiveMonster(activeMonster = sQueue[0])
                setMonster(Monster = activeMonster)
                clearInterval(timerId); 
                setTimer(30)
                setQueue(fightId, Queues)
            }
            return () => clearInterval(timerId); 
        }, [Queues, timer]); 

        return (
          <Container x={stageProps.width * 0.5 - 50} y={20} name={"test-battle-pixi-Timer"}>
            <Text 
                text={`${timer}`}
                x={40}
                y={30}
            />
          </Container>
        )
}

export default BattleTimer