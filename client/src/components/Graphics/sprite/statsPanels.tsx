import { Container, Text } from "@pixi/react";

import { Monsters } from "../../../assets/Monsters/Monster";
import { useContext } from "react";
import { stageContext } from "../../../assets/context/stage";

interface StatsPanelProps {
    isOpenFirstMonster: boolean
    isOpenSecondMonster: boolean
    isOpenThirdMonster: boolean
    isOpenFirstEnemyMonster: boolean
    isOpenSecondEnemyMonster: boolean
    isOpenThirdEnemyMonster: boolean
}

const StatsPanel: React.FC<StatsPanelProps> = (props: StatsPanelProps) => {

    const {isOpenFirstMonster,
        isOpenSecondMonster,
        isOpenThirdMonster,
        isOpenFirstEnemyMonster,
        isOpenSecondEnemyMonster,
        isOpenThirdEnemyMonster,
    } = props

    const {stageProps,
        firstSelectedMonster,
        secondSelectedMonster,
        thirdSelectedMonster,
        firstSelectedEnemyMonster,
        secondSelectedEnemyMonster,
        thirdSelectedEnemyMonster,
        hpBarFirstMonster,
        hpBarSecondMonster,
        hpBarThirdMonster,
        hpBarFirstEnemyMonster,
        hpBarSecondEnemyMonster,
        hpBarThirdEnemyMonster
    } = useContext(stageContext)

    return (<>
        {(isOpenFirstMonster && hpBarFirstMonster > 0) && 
            (<Container x={stageProps.width * 0.15 } y={stageProps.height * 0.3 + 35} name={"test-battle-pixi-yourFirstStats"}>
                <Text
                    text={`hp: ${firstSelectedMonster.current_hp}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${firstSelectedMonster.ATK}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${firstSelectedMonster.DEF}`}
                    scale={0.5}
                    y={36}
                />
                <Text
                    text={`lvl: ${firstSelectedMonster.level}`}
                    scale={0.5}
                    y={48}
                />
                <Text
                    text={`element: ${firstSelectedMonster.element}`}
                    scale={0.5}
                    y={60}
                 />
            </Container>
        )}
        {(isOpenSecondMonster && hpBarSecondMonster > 0) && 
            (<Container x={stageProps.width * 0.15 } y={stageProps.height * 0.5 + 35} name={"test-battle-pixi-yourSecondStats"}>
                <Text
                    text={`hp: ${secondSelectedMonster.current_hp}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${secondSelectedMonster.ATK}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${secondSelectedMonster.DEF}`}
                    scale={0.5}
                    y={36}
                />
                <Text
                    text={`lvl: ${secondSelectedMonster.level}`}
                    scale={0.5}
                    y={48}
                />
                <Text
                    text={`element: ${secondSelectedMonster.element}`}
                    scale={0.5}
                    y={60}
                 />
            </Container>
        )}
        {(isOpenThirdMonster && hpBarThirdMonster > 0) && 
            (<Container x={stageProps.width * 0.15 } y={stageProps.height * 0.7 + 35} name={"test-battle-pixi-yourThirdStats"}>
                <Text
                    text={`hp: ${thirdSelectedMonster.current_hp}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${thirdSelectedMonster.ATK}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${thirdSelectedMonster.DEF}`}
                    scale={0.5}
                    y={36}
                />
                <Text
                    text={`lvl: ${thirdSelectedMonster.level}`}
                    scale={0.5}
                    y={48}
                />
                <Text
                    text={`element: ${thirdSelectedMonster.element}`}
                    scale={0.5}
                    y={60}
                 />
            </Container>
        )}
        {(isOpenFirstEnemyMonster && hpBarFirstEnemyMonster > 0) && 
            (<Container x={stageProps.width * 0.85 - 30 } y={stageProps.height * 0.3 + 35} name={"test-battle-pixi-enemyFirstStats"}>
                <Text
                    text={`hp: ${firstSelectedEnemyMonster.current_hp}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${firstSelectedEnemyMonster.ATK}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${firstSelectedEnemyMonster.DEF}`}
                    scale={0.5}
                    y={36}
                />
                <Text
                    text={`lvl: ${firstSelectedEnemyMonster.level}`}
                    scale={0.5}
                    y={48}
                />
                <Text
                    text={`element: ${firstSelectedEnemyMonster.element}`}
                    scale={0.5}
                    y={60}
                 />
            </Container>
        )}
        {(isOpenSecondEnemyMonster && hpBarSecondEnemyMonster > 0) && 
            (<Container x={stageProps.width * 0.85 - 30 } y={stageProps.height * 0.5 + 35} name={"test-battle-pixi-enemySecondStats"}>
                <Text
                    text={`hp: ${secondSelectedEnemyMonster.current_hp}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${secondSelectedEnemyMonster.ATK}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${secondSelectedEnemyMonster.DEF}`}
                    scale={0.5}
                    y={36}
                />
                <Text
                    text={`lvl: ${secondSelectedEnemyMonster.level}`}
                    scale={0.5}
                    y={48}
                />
                <Text
                    text={`element: ${secondSelectedEnemyMonster.element}`}
                    scale={0.5}
                    y={60}
                 />
            </Container>
        )}
        {(isOpenThirdEnemyMonster && hpBarThirdEnemyMonster > 0) && 
            (<Container x={stageProps.width * 0.85 - 30 } y={stageProps.height * 0.7 + 35} name={"test-battle-pixi-enemyThirdStats"}>
                <Text
                    text={`hp: ${thirdSelectedEnemyMonster.current_hp}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${thirdSelectedEnemyMonster.ATK}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${thirdSelectedEnemyMonster.DEF}`}
                    scale={0.5}
                    y={36}
                />
                <Text
                    text={`lvl: ${thirdSelectedEnemyMonster.level}`}
                    scale={0.5}
                    y={48}
                />
                <Text
                    text={`element: ${thirdSelectedEnemyMonster.element}`}
                    scale={0.5}
                    y={60}
                 />
            </Container>
        )}
    </>)
}

export default StatsPanel