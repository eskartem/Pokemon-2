import { Container, Text } from "@pixi/react";

import { Monsters } from "../../../assets/Monsters/Monster";

interface StatsPanelProps {
    stageProps: {
        width: number,
        height: number,
    },
    isOpenFirstMonster: boolean
    isOpenSecondMonster: boolean
    isOpenThirdMonster: boolean
    isOpenFirstEnemyMonster: boolean
    isOpenSecondEnemyMonster: boolean
    isOpenThirdEnemyMonster: boolean
    firstSelectedMonster: Monsters
    secondSelectedMonster: Monsters
    thirdSelectedMonster: Monsters
    firstSelectedEnemyMonster: Monsters
    secondSelectedEnemyMonster: Monsters
    thirdSelectedEnemyMonster: Monsters
    hpBarFirstMonster: number
    hpBarSecondMonster: number
    hpBarThirdMonster: number
    hpBarFirstEnemyMonster: number
    hpBarSecondEnemyMonster: number
    hpBarThirdEnemyMonster: number
}

const StatsPanel: React.FC<StatsPanelProps> = (props: StatsPanelProps) => {

    const {
        stageProps,
        isOpenFirstMonster,
        isOpenSecondMonster,
        isOpenThirdMonster,
        isOpenFirstEnemyMonster,
        isOpenSecondEnemyMonster,
        isOpenThirdEnemyMonster,
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
    } = props

    return (<>
        {(isOpenFirstMonster && hpBarFirstMonster > 0) && 
            (<Container x={stageProps.width * 0.15 } y={stageProps.height * 0.3 + 35} name={"test-battle-pixi-yourFirstSprite"}>
                <Text
                    text={`hp: ${firstSelectedMonster.healthPoint}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${firstSelectedMonster.attack}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${firstSelectedMonster.defense}`}
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
            (<Container x={stageProps.width * 0.15 } y={stageProps.height * 0.5 + 35} name={"test-battle-pixi-yourSecondSprite"}>
                <Text
                    text={`hp: ${secondSelectedMonster.healthPoint}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${secondSelectedMonster.attack}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${secondSelectedMonster.defense}`}
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
            (<Container x={stageProps.width * 0.15 } y={stageProps.height * 0.7 + 35} name={"test-battle-pixi-yourThirdprite"}>
                <Text
                    text={`hp: ${thirdSelectedMonster.healthPoint}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${thirdSelectedMonster.attack}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${thirdSelectedMonster.defense}`}
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
            (<Container x={stageProps.width * 0.85 - 30 } y={stageProps.height * 0.3 + 35} name={"test-battle-pixi-enemyFirstSprite"}>
                <Text
                    text={`hp: ${firstSelectedEnemyMonster.healthPoint}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${firstSelectedEnemyMonster.attack}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${firstSelectedEnemyMonster.defense}`}
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
            (<Container x={stageProps.width * 0.85 - 30 } y={stageProps.height * 0.5 + 35} name={"test-battle-pixi-enemySecondSprite"}>
                <Text
                    text={`hp: ${secondSelectedEnemyMonster.healthPoint}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${secondSelectedEnemyMonster.attack}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${secondSelectedEnemyMonster.defense}`}
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
            (<Container x={stageProps.width * 0.85 - 30 } y={stageProps.height * 0.7 + 35} name={"test-battle-pixi-enemyThirdSprite"}>
                <Text
                    text={`hp: ${thirdSelectedEnemyMonster.healthPoint}`}
                    scale={0.5}
                    y={12}
                />
                <Text
                    text={`atk: ${thirdSelectedEnemyMonster.attack}`}
                    scale={0.5}
                    y={24}
                />
                <Text
                    text={`def: ${thirdSelectedEnemyMonster.defense}`}
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