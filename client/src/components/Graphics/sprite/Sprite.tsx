import { useContext, useEffect, useState } from "react"
import { Sprite, Text, Container} from "@pixi/react"
import {firstAnemoMoster, secondAnemoMonster, thirdAnemoMonster, 
    firstGeoMonster, secondGeoMonster, thirdGeoMonster, 
    firstHydroMonster, secondHydroMonster, thirdHydroMonster, 
    firstPyroMonster, secondPyroMonster, thirdPyroMonster, empty
} from '../../../assets/img_monster/AllSprites';

import { Monsters } from "../../../assets/Monsters/Monster"

import StatsPanel from "./statsPanels";
import { stageContext } from "../../../assets/context/stage";


const Sprites: React.FC = () => {

    const {hpBarFirstMonster, 
        hpBarSecondMonster, 
        hpBarThirdMonster, 
        hpBarFirstEnemyMonster, 
        hpBarSecondEnemyMonster, 
        hpBarThirdEnemyMonster,
        stageProps, 
        firstSelectedMonster,
        secondSelectedMonster,
        thirdSelectedMonster,
        firstSelectedEnemyMonster,
        secondSelectedEnemyMonster,
        thirdSelectedEnemyMonster 
    } = useContext(stageContext)

    let [firstSelectedSprite, setFirstSelectedSprite] = useState('');
    let [secondSelectedSprite, setSecondSelectedSprite] = useState('');
    let [thirdSelectedSprite, setThirdSelectedSprite] = useState('');
    let [firstSelectedEnemySprite, setFirstSelectedEnemySprite] = useState('');
    let [secondSelectedEnemySprite, setSecondSelectedEnemySprite] = useState('');
    let [thirdSelectedEnemySprite, setThirdSelectedEnemySprite] = useState('');

    let [isOpenFirstMonster, setIsOpenFirstMonster] = useState(false);
    let [isOpenSecondMonster, setIsOpenSecondMonster] = useState(false);
    let [isOpenThirdMonster, setIsOpenThirdMonster] = useState(false);
    let [isOpenFirstEnemyMonster, setIsOpenFirstEnemyMonster] = useState(false);
    let [isOpenSecondEnemyMonster, setIsOpenSecondEnemyMonster] = useState(false);
    let [isOpenThirdEnemyMonster, setIsOpenThirdEnemyMonster] = useState(false);

    const selectSprite = (activeMonster: Monsters, thisSprite: string) => {
        let thisMonster: string
        switch (activeMonster.name) {
            case "Farfetch'd":
                thisMonster = firstAnemoMoster;
                return thisSprite = thisMonster;
            case 'Butterfree':
                thisMonster = secondAnemoMonster;
                return thisSprite = thisMonster;
            case 'Zubat':
                thisMonster = thirdAnemoMonster;
                return thisSprite = thisMonster;
            case 'Bulbasaur':
                thisMonster = firstGeoMonster;
                return thisSprite = thisMonster;
            case 'Dugtrio':
                thisMonster = secondGeoMonster;
                return thisSprite = thisMonster;
            case 'Sandshrew':
                thisMonster = thirdGeoMonster;
                return thisSprite = thisMonster;
            case 'Magikarp':
                thisMonster = firstHydroMonster;
                return thisSprite = thisMonster;
            case 'Omanyte':
                thisMonster = secondHydroMonster;
                return thisSprite = thisMonster;
            case 'Poliwhirl':
                thisMonster = thirdHydroMonster;
                return thisSprite = thisMonster;
            case 'Flareon':
                thisMonster = firstPyroMonster;
                return thisSprite = thisMonster;
            case 'Growlithe':
                thisMonster = secondPyroMonster;
                return thisSprite = thisMonster;
            case 'Ponyta':
                thisMonster = thirdPyroMonster;
                return thisSprite = thisMonster;
            default: 
                thisMonster = empty;
                return thisSprite = thisMonster
        }
    }

    useEffect(() => {
        setFirstSelectedSprite(selectSprite(firstSelectedMonster, firstSelectedSprite))
        setSecondSelectedSprite(selectSprite(secondSelectedMonster, secondSelectedSprite))
        setThirdSelectedSprite(selectSprite(thirdSelectedMonster, thirdSelectedSprite))
        setFirstSelectedEnemySprite(selectSprite(firstSelectedEnemyMonster, firstSelectedEnemySprite))
        setSecondSelectedEnemySprite(selectSprite(secondSelectedEnemyMonster, secondSelectedEnemySprite))
        setThirdSelectedEnemySprite(selectSprite(thirdSelectedEnemyMonster, thirdSelectedEnemySprite))
    }, [firstSelectedMonster, firstSelectedSprite, secondSelectedMonster, secondSelectedSprite, thirdSelectedMonster, 
        thirdSelectedSprite, firstSelectedEnemyMonster, firstSelectedEnemySprite, secondSelectedEnemyMonster, 
        secondSelectedEnemySprite, thirdSelectedEnemyMonster, thirdSelectedEnemySprite])

    return(<>
        {hpBarFirstMonster > 0 && (
            <Container x={stageProps.width * 0.05} y={stageProps.height * 0.3}>
                <Sprite image={firstSelectedMonster.isAlive ? firstSelectedSprite || empty : empty} 
                    scale={[0.1, 0.1]} 
                    interactive
                    onclick={() => {setIsOpenFirstMonster(isOpenFirstMonster === false ? true : false)}} 
                    name={"test-battle-pixi-yourFirstSprite"}
                />
                <Text
                text={`${firstSelectedMonster.name}`}
                x={20}
                y={-30}
                />
            </Container>
        )}
        {hpBarSecondMonster > 0 && (
            <Container x={stageProps.width * 0.05} y={stageProps.height * 0.51}>
                <Sprite image={secondSelectedMonster.isAlive ? secondSelectedSprite || empty : empty} 
                    scale={[0.1, 0.1]} 
                    interactive
                    onclick={() => {setIsOpenSecondMonster(isOpenSecondMonster === false ? true : false)}}
                    name={"test-battle-pixi-yourSecondSprite"}
                />
                <Text 
                    text={`${secondSelectedMonster.name}`}
                    x={20}
                    y={-30}
                />
            </Container>
        )}
        {hpBarThirdMonster > 0 && (
            <Container x={stageProps.width * 0.05} y={stageProps.height * 0.72}>
                <Sprite image={thirdSelectedMonster.isAlive ? thirdSelectedSprite || empty : empty} 
                    scale={[0.1, 0.1]} 
                    interactive
                    onclick={() => {setIsOpenThirdMonster(isOpenThirdMonster === false ? true : false)}}
                    name={"test-battle-pixi-yourThirdSprite"}
                />
                <Text 
                    text={`${thirdSelectedMonster.name}`}
                    x={20}
                    y={-30}
                />
            </Container>
        )}
        {hpBarFirstEnemyMonster > 0 && (
            <Container x={stageProps.width * 0.85} y={stageProps.height * 0.3}>
                <Sprite image={firstSelectedEnemyMonster.isAlive ? firstSelectedEnemySprite || empty : empty} 
                    x={120}
                    scale={[-0.1, 0.1]} 
                    interactive
                    onclick={() => {setIsOpenFirstEnemyMonster(isOpenFirstEnemyMonster === false ? true : false)}}
                    name={"test-battle-pixi-enemyFirstSprite"}
                />
                <Text 
                    text={`${firstSelectedEnemyMonster.name}`}
                    x={-20}
                    y={-30}
                />
        </Container>
        )}
        {hpBarSecondEnemyMonster > 0 && (
            <Container x={stageProps.width * 0.85} y={stageProps.height * 0.51}>
                <Sprite image={secondSelectedEnemyMonster.isAlive ? secondSelectedEnemySprite || empty : empty} 
                    x={120}
                    scale={[-0.1, 0.1]} 
                    interactive
                    onclick={() => {setIsOpenSecondEnemyMonster(isOpenSecondEnemyMonster === false ? true : false)}}
                    name={"test-battle-pixi-enemySecondSprite"}
                />
                <Text 
                    text={`${secondSelectedEnemyMonster.name}`}
                    x={-20}
                    y={-30}
                />
            </Container>
        )}
        {hpBarThirdEnemyMonster > 0 && (
            <Container x={stageProps.width * 0.85} y={stageProps.height * 0.72}>
                <Sprite image={thirdSelectedEnemyMonster.isAlive ? thirdSelectedEnemySprite || empty : empty} 
                    x={120}
                    scale={[-0.1, 0.1]} 
                    interactive
                    onclick={() => {setIsOpenThirdEnemyMonster(isOpenThirdEnemyMonster === false ? true : false)}}
                    name={"test-battle-pixi-enemyThirdSprite"}
                />
                <Text 
                    text={`${thirdSelectedEnemyMonster.name}`}
                    x={-20}
                    y={-30}
                />
            </Container>
        )}
        <StatsPanel 
            isOpenFirstMonster={isOpenFirstMonster}
            isOpenSecondMonster={isOpenSecondMonster}
            isOpenThirdMonster={isOpenThirdMonster}
            isOpenFirstEnemyMonster={isOpenFirstEnemyMonster}
            isOpenSecondEnemyMonster={isOpenSecondEnemyMonster}
            isOpenThirdEnemyMonster={isOpenThirdEnemyMonster}
        />
    </>)
}

export default Sprites