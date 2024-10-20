import { useEffect, useState } from "react"
import { Sprite } from "@pixi/react"
import {firstAnemoMoster, secondAnemoMonster, thirdAnemoMonster, fourthAnemoMonster,
    firstGeoMonster, secondGeoMonster, thirdGeoMonster, fourthGeoMonster,
    firstHydroMonster, secondHydroMonster, thirdHydroMonster, fourthHydroMonster,
    firstPyroMonster, secondPyroMonster, thirdPyroMonster, fourthPyroMonster
} from '../../../img/Monster/AllSprites'

import { Monsters } from "../../../modules/Monsters/Monster"

const Sprites: React.FC = (props: any) => {
    const {
        stageProps,
        firstSelectedMonster,
        secondSelectedMonster,
        thirdSelectedMonster,
        firstSelectedEnemyMonster,
        secondSelectedEnemyMonster,
        thirdSelectedEnemyMonster
    } = props

    let [firstSelectedSprite, setFirstSelectedSprite] = useState('');
    let [secondSelectedSprite, setSecondSelectedSprite] = useState('');
    let [thirdSelectedSprite, setThirdSelectedSprite] = useState('');
    let [firstSelectedEnemySprite, setFirstSelectedEnemySprite] = useState('');
    let [secondSelectedEnemySprite, setSecondSelectedEnemySprite] = useState('');
    let [thirdSelectedEnemySprite, setThirdSelectedEnemySprite] = useState('');

    const selectSprite = (activeMonster: Monsters, thisSprite: string): any => {
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
        }
    }

    useEffect(() => {
        setFirstSelectedSprite(selectSprite(firstSelectedMonster, firstSelectedSprite))
        setSecondSelectedSprite(selectSprite(secondSelectedMonster, secondSelectedSprite))
        setThirdSelectedSprite(selectSprite(thirdSelectedMonster, thirdSelectedSprite))
        setFirstSelectedEnemySprite(selectSprite(firstSelectedEnemyMonster, firstSelectedEnemySprite))
        setSecondSelectedEnemySprite(selectSprite(secondSelectedEnemyMonster, secondSelectedEnemySprite))
        setThirdSelectedEnemySprite(selectSprite(thirdSelectedEnemyMonster, thirdSelectedEnemySprite))
    })

    return(<>
        <Sprite image={firstSelectedSprite || firstAnemoMoster} x={stageProps.width * 0.15} y={stageProps.height * 0.3} scale={[-1.5, 1.5]}></Sprite>
        <Sprite image={secondSelectedSprite || firstGeoMonster}x={stageProps.width * 0.15} y={stageProps.height * 0.5} scale={[-1.5, 1.5]}></Sprite>
        <Sprite image={thirdSelectedSprite || firstHydroMonster}x={stageProps.width * 0.15} y={stageProps.height * 0.7} scale={[-1.5, 1.5]}></Sprite>
        <Sprite image={firstSelectedEnemySprite || fourthAnemoMonster}x={stageProps.width * 0.85} y={stageProps.height * 0.3} scale={[1.5, 1.5]}></Sprite>
        <Sprite image={secondSelectedEnemySprite || fourthGeoMonster}x={stageProps.width * 0.85} y={stageProps.height * 0.5} scale={[1.5, 1.5]}></Sprite>
        <Sprite image={thirdSelectedEnemySprite || fourthPyroMonster}x={stageProps.width * 0.85} y={stageProps.height * 0.7} scale={[1.5, 1.5]}></Sprite>
    </>)
}

export default Sprites