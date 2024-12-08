import {useEffect, useState} from 'react';
import {Stage} from '@pixi/react';
import { PAGES } from '../PageManager';

import {FirstAnemoMonster, SecondAnemoMonster, ThirdAnemoMonster, FirstGeoMonster, 
  ThirdGeoMonster, FirstHydroMonster, SecondHydroMonster, ThirdHydroMonster, 
  FirstPyroMonster, SecondPyroMonster, ThirdPyroMonster,
  SecondGeoMonster} from '../../assets/Monsters/AllMoster'

import Buttons from '../../components/ButtonsPvp/Buttons';
import HpBars from '../../components/Graphics/hpBars/hpBars';
import Sprites from '../../components/Graphics/sprite/Sprite';
import Texts from '../../components/Graphics/text'
import FinalScreen from '../../components/finalScreen/finalScreen';
import Button from '../../components/Button/Button';
import BattleTimer from '../../components/Graphics/battleTimer/battleTimer';

import {easyBot, mediumBot, hardBot} from '../../assets/Bots/bots';

import { Monsters } from "../../assets/Monsters/Monster"

import './Battle.scss';
import MathPvp from '../../services/MathPvp/MathPvp';

const Battle = (props: any) => {
  const enemy = new easyBot() /*lvl = 1 */
  //const enemy = new mediumBot() /*lvl = 3 */
  //const enemy = new hardBot() /*lvl = 5 */

  const enemyType: string = 'bot'

  let firstSelectedMonster: Monsters = new FirstAnemoMonster("yourSide", 5);
  let secondSelectedMonster: Monsters = new SecondAnemoMonster("yourSide", 5);
  let thirdSelectedMonster: Monsters = new ThirdAnemoMonster("yourSide", 5);
  let firstSelectedEnemyMonster: Monsters = enemy.selectedMonsters[0]
  let secondSelectedEnemyMonster: Monsters =  enemy.selectedMonsters[1]
  let thirdSelectedEnemyMonster: Monsters =   enemy.selectedMonsters[2]
  
  const mathPvp = new MathPvp();

  const { setPage } = props; 

  let [sQueue, setSQueue] = useState<Monsters[]>(mathPvp.sortQueuesByLevel(
    firstSelectedMonster,
    secondSelectedMonster,
    thirdSelectedMonster,
    firstSelectedEnemyMonster,
    secondSelectedEnemyMonster,
    thirdSelectedEnemyMonster))

  let [activeMonster, setActiveMonster] = useState<Monsters>(sQueue[0]); 

  const [hpBarFirstMonster, setHpBarFirstMonster] = useState<number>(firstSelectedMonster.healthPoint);
  const [hpBarSecondMonster, setHpBarSecondMonster] = useState<number>(secondSelectedMonster.healthPoint)
  const [hpBarThirdMonster, setHpBarThirdMonster] = useState<number>(thirdSelectedMonster.healthPoint);
  const [hpBarFirstEnemyMonster, setHpBarFirstEnemyMonster] = useState<number>(firstSelectedEnemyMonster.healthPoint);
  const [hpBarSecondEnemyMonster, setHpBarSecondEnemyMonster] = useState<number>(secondSelectedEnemyMonster.healthPoint);
  const [hpBarThirdEnemyMonster, setHpBarThirdEnemyMonster] = useState<number>(thirdSelectedEnemyMonster.healthPoint);

  //window Size
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  
  const stageProps = {
    width: width * 0.7,
    height: height * 0.7,
    options: {
      backgroundAlpha: 0
    }
  };
  
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })

  const backClickHandler = () => setPage(PAGES.MAINMENU);
  
  return (<>
    <Stage {...stageProps} className='pvpArea'>
      <Sprites stageProps={stageProps} //Монстры
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
      <HpBars stageProps={stageProps} //Полоски здоровья
        hpBarFirstMonster={hpBarFirstMonster}
        hpBarSecondMonster={hpBarSecondMonster}
        hpBarThirdMonster={hpBarThirdMonster}
        hpBarFirstEnemyMonster={hpBarFirstEnemyMonster}
        hpBarSecondEnemyMonster={hpBarSecondEnemyMonster}
        hpBarThirdEnemyMonster={hpBarThirdEnemyMonster}
        firstSelectedMonster={firstSelectedMonster}
        secondSelectedMonster={secondSelectedMonster}
        thirdSelectedMonster={thirdSelectedMonster}
        firstSelectedEnemyMonster={firstSelectedEnemyMonster}
        secondSelectedEnemyMonster={secondSelectedEnemyMonster} 
        thirdSelectedEnemyMonster={thirdSelectedEnemyMonster}
      />
      <Texts activeMonster={activeMonster} //Различный текст на сцене
        stageProps={stageProps}
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
      <BattleTimer stageProps={stageProps} //Таймер в игре
        sQueue={sQueue}
        setSQueue={setSQueue}
        setActiveMonster={setActiveMonster}
        activeMonster={activeMonster}
      />
    </Stage>
    <Buttons sQueue={sQueue} //Кнопки для боя
      activeMonster={activeMonster}
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
      setSQueue={setSQueue}
      setActiveMonster={setActiveMonster}
      setHpBarFirstEnemyMonster={setHpBarFirstEnemyMonster}
      setHpBarFirstMonster={setHpBarFirstMonster}
      setHpBarSecondEnemyMonster={setHpBarSecondEnemyMonster}
      setHpBarSecondMonster={setHpBarSecondMonster}
      setHpBarThirdEnemyMonster={setHpBarThirdEnemyMonster}
      setHpBarThirdMonster={setHpBarThirdMonster}
      enemyType={enemyType}
    />
    <FinalScreen hpBarFirstMonster={hpBarFirstMonster} //Финальное окно
      hpBarSecondMonster={hpBarSecondMonster}
      hpBarThirdMonster={hpBarThirdMonster}
      hpBarFirstEnemyMonster={hpBarFirstEnemyMonster}
      hpBarSecondEnemyMonster={hpBarSecondEnemyMonster}
      hpBarThirdEnemyMonster={hpBarThirdEnemyMonster}
    />
    <Button onClick={backClickHandler} text='назад' />
  </>)
};


export default Battle