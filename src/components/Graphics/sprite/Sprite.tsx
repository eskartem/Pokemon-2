import { useEffect, useState } from "react"
import { Sprite, Text} from "@pixi/react"
import {firstAnemoMoster, secondAnemoMonster, thirdAnemoMonster, fourthAnemoMonster,
    firstGeoMonster, secondGeoMonster, thirdGeoMonster, fourthGeoMonster,
    firstHydroMonster, secondHydroMonster, thirdHydroMonster, fourthHydroMonster,
    firstPyroMonster, secondPyroMonster, thirdPyroMonster, fourthPyroMonster, empty
} from '../../../img/Monster/AllSprites';

import { Monsters } from "../../../modules/Monsters/Monster"

import StatsPanel from "./statsPanels";

interface spritesProps {
    stageProps: {
        width: number,
        height: number,
    },
    firstSelectedMonster: Monsters,
    secondSelectedMonster: Monsters,
    thirdSelectedMonster: Monsters,
    firstSelectedEnemyMonster: Monsters,
    secondSelectedEnemyMonster: Monsters,
    thirdSelectedEnemyMonster: Monsters,
    hpBarFirstMonster: number,
    hpBarSecondMonster: number,
    hpBarThirdMonster: number,
    hpBarFirstEnemyMonster: number,
    hpBarSecondEnemyMonster: number,
    hpBarThirdEnemyMonster: number,
}

const Sprites: React.FC<spritesProps> = (props: spritesProps) => {
    const {
        stageProps,
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
            case 'Pidgey':
                thisMonster = firstAnemoMoster;
                return thisSprite = thisMonster;
            case 'Butterfree':
                thisMonster = secondAnemoMonster;
                return thisSprite = thisMonster;
            case 'Zubat':
                thisMonster = thirdAnemoMonster;
                return thisSprite = thisMonster;
            case "Farfetch'd":
                thisMonster = fourthAnemoMonster;
                return thisSprite = thisMonster;
            case 'Bulbasaur':
                thisMonster = firstGeoMonster;
                return thisSprite = thisMonster;
            case 'Ratata':
                thisMonster = secondGeoMonster;
                return thisSprite = thisMonster;
            case 'Sandshrew':
                thisMonster = thirdGeoMonster;
                return thisSprite = thisMonster;
            case 'Dugtrio':
                thisMonster = fourthGeoMonster;
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
            case 'Squirtle':
                thisMonster = fourthHydroMonster;
                return thisSprite = thisMonster;
            case 'Flareon':
                thisMonster = firstPyroMonster;
                return thisSprite = thisMonster;
            case 'Charmander':
                thisMonster = secondPyroMonster;
                return thisSprite = thisMonster;
            case 'Ponyta':
                thisMonster = thirdPyroMonster;
                return thisSprite = thisMonster;
            case 'Growlithe':
                thisMonster = fourthPyroMonster;
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
            <Sprite image={firstSelectedMonster.isAlive ? firstSelectedSprite || empty : empty} 
                x={stageProps.width * 0.15} 
                y={stageProps.height * 0.3} scale={[-1.5, 1.5]} 
                interactive
                onclick={() => {setIsOpenFirstMonster(isOpenFirstMonster === false ? true : false)}} 
            />
        )}
        {hpBarSecondMonster > 0 && (
            <Sprite image={secondSelectedMonster.isAlive ? secondSelectedSprite || empty : empty} 
                x={stageProps.width * 0.15} 
                y={stageProps.height * 0.5} 
                scale={[-1.5, 1.5]} 
                interactive
                onclick={() => {setIsOpenSecondMonster(isOpenSecondMonster === false ? true : false)}}
            />
        )}
        {hpBarThirdMonster > 0 && (
            <Sprite image={thirdSelectedMonster.isAlive ? thirdSelectedSprite || empty : empty} 
                x={stageProps.width * 0.15} 
                y={stageProps.height * 0.7} 
                scale={[-1.5, 1.5]} 
                interactive
                onclick={() => {setIsOpenThirdMonster(isOpenThirdMonster === false ? true : false)}}
            />
        )}
        {hpBarFirstEnemyMonster > 0 && (
            <Sprite image={firstSelectedEnemyMonster.isAlive ? firstSelectedEnemySprite || empty : empty} 
                x={stageProps.width * 0.85} 
                y={stageProps.height * 0.3} 
                scale={[1.5, 1.5]} 
                interactive
                onclick={() => {setIsOpenFirstEnemyMonster(isOpenFirstEnemyMonster === false ? true : false)}}
            />
        )}
        {hpBarSecondEnemyMonster > 0 && (
            <Sprite image={secondSelectedEnemyMonster.isAlive ? secondSelectedEnemySprite || empty : empty} 
                x={stageProps.width * 0.85} 
                y={stageProps.height * 0.5} 
                scale={[1.5, 1.5]} 
                interactive
                onclick={() => {setIsOpenSecondEnemyMonster(isOpenSecondEnemyMonster === false ? true : false)}}
            />
        )}
        {hpBarThirdEnemyMonster > 0 && (
            <Sprite image={thirdSelectedEnemyMonster.isAlive ? thirdSelectedEnemySprite || empty : empty} 
                x={stageProps.width * 0.85} 
                y={stageProps.height * 0.7} 
                scale={[1.5, 1.5]} 
                interactive
                onclick={() => {setIsOpenThirdEnemyMonster(isOpenThirdEnemyMonster === false ? true : false)}}
            />
        )}
        <StatsPanel 
            stageProps={stageProps}
            isOpenFirstMonster={isOpenFirstMonster}
            isOpenSecondMonster={isOpenSecondMonster}
            isOpenThirdMonster={isOpenThirdMonster}
            isOpenFirstEnemyMonster={isOpenFirstEnemyMonster}
            isOpenSecondEnemyMonster={isOpenSecondEnemyMonster}
            isOpenThirdEnemyMonster={isOpenThirdEnemyMonster}
            firstSelectedMonster={firstSelectedMonster}
            secondSelectedMonster={secondSelectedMonster}
            thirdSelectedMonster={thirdSelectedMonster}
            firstSelectedEnemyMonster={firstSelectedEnemyMonster}
            secondSelectedEnemyMonster={secondSelectedEnemyMonster}
            thirdSelectedEnemyMonster={thirdSelectedEnemyMonster}
            hpBarFirstMonster={hpBarFirstMonster}
            hpBarSecondMonster={hpBarSecondMonster}
            hpBarThirdMonster={hpBarThirdMonster}
            hpBarFirstEnemyMonster={hpBarFirstEnemyMonster}
            hpBarSecondEnemyMonster={hpBarSecondEnemyMonster}
            hpBarThirdEnemyMonster={hpBarThirdEnemyMonster}
        />
    </>)
}

export default Sprites