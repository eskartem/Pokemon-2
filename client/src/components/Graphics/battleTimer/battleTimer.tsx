import { useState, useEffect } from "react"
import { Text, Container } from "@pixi/react";

import { Monsters } from "../../../assets/Monsters/Monster";
import MathPvp from "../../../services/MathPvp/MathPvp";
interface BattleTimerProps {
    stageProps: {
        width: number,
        height: number,
    },
    setSQueue: (sQueue: Monsters[]) => void,
    sQueue: Monsters[],
    setActiveMonster: (activeMonster: Monsters) => void,
    activeMonster: Monsters,
}

const BattleTimer: React.FC<BattleTimerProps> = (props: BattleTimerProps) => {

        let {stageProps,
            activeMonster,
            setSQueue,
            sQueue,
            setActiveMonster,
        } = props

        let [timer, setTimer] = useState<number>(30);
        let [Monster, setMonster] = useState<Monsters>(activeMonster)

        const mathPvp = new MathPvp();

        useEffect(() => {
            let timerId: NodeJS.Timeout;
            if(Monster !== activeMonster){
                setTimer(30)
                setMonster(Monster = activeMonster)     
            } else {
                if(timer > 0) {
                    timerId = setInterval(() => {
                        setTimer(prevCount => prevCount - 1); 
                    }, 1000); 
                } else {
                    setSQueue(sQueue = mathPvp.timeIsOut(sQueue))
                    setActiveMonster(activeMonster = sQueue[0])
                    setMonster(Monster = activeMonster)
                    setTimer(30)
                }
                return () => clearInterval(timerId); 
            } 
        
        }, [timer, activeMonster, Monster]); 

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