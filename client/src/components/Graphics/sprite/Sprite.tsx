import { useContext, useEffect, useState } from "react"
import { Sprite, Text, Container} from "@pixi/react"
import {bear_air, bee_earth, blob_fish_water, butterfly_water, 
    cat_lit_energy_air, elephant_air, emoboy_fire, 
    frog_water, lizard_fire, meatboy_fire, mushroom_earth, worm_earth, empty} from '../../../assets/characters/allSprites'

import { Monsters } from "../../../assets/Monsters/Monster"

import StatsPanel from "./statsPanels";
import { stageContext } from "../../../assets/context/stage";
import { TMonster } from "../../../services/server/types";
import { doesNotMatch } from "assert";


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

    const selectSprite = (activeMonster: TMonster, thisSprite: string) => {
        let thisMonster: string
        switch (activeMonster.name) {
            case 'Кот Лит Энерджи':
                thisMonster = cat_lit_energy_air;
                return thisSprite = thisMonster;
            case 'Медведь':
                thisMonster = bear_air;
                return thisSprite = thisMonster;
            case 'Слон':
                thisMonster = elephant_air;
                return thisSprite = thisMonster;
            case 'Червь':
                thisMonster = worm_earth;
                return thisSprite = thisMonster;
            case 'Гриб':
                thisMonster = mushroom_earth;
                return thisSprite = thisMonster;
            case 'Пчела':
                thisMonster = bee_earth;
                return thisSprite = thisMonster;
            case 'Лягушка':
                thisMonster = frog_water;
                return thisSprite = thisMonster;
            case 'Мотылек':
                thisMonster = butterfly_water;
                return thisSprite = thisMonster;
            case 'Рыба капля':
                thisMonster = blob_fish_water;
                return thisSprite = thisMonster;
            case 'Митбой':
                thisMonster = meatboy_fire;
                return thisSprite = thisMonster;
            case 'Ящерица':
                thisMonster = lizard_fire;
                return thisSprite = thisMonster;
            case 'Эмобой':
                thisMonster = emoboy_fire;
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
                <Sprite image={firstSelectedMonster.hp > 0 ? firstSelectedSprite || empty : empty} 
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
                <Sprite image={secondSelectedMonster.hp > 0 ? secondSelectedSprite || empty : empty} 
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
                <Sprite image={thirdSelectedMonster.hp > 0 ? thirdSelectedSprite || empty : empty} 
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
                <Sprite image={firstSelectedEnemyMonster.hp > 0 ? firstSelectedEnemySprite || empty : empty} 
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
                <Sprite image={secondSelectedEnemyMonster.hp > 0 ? secondSelectedEnemySprite || empty : empty} 
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
                <Sprite image={thirdSelectedEnemyMonster.hp > 0 ? thirdSelectedEnemySprite || empty : empty} 
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