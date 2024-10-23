import {useEffect, useState} from 'react';
import {Stage, Text} from '@pixi/react';

import {FirstAnemoMonster, SecondAnemoMonster, ThirdAnemoMonster, FourthAnemoMonster, FirstGeoMonster, SecondGeoMonster,
  ThirdGeoMonster, FourthGeoMonster, FirstHydroMonster, SecondHydroMonster, ThirdHydroMonster, FourthHydroMonster, 
  FirstPyroMonster, SecondPyroMonster, ThirdPyroMonster, FourthPyroMonster} from '../../modules/Monsters/AllMoster'

import Buttons from '../Buttons/Buttons';
import HpBars from '../Graphics/hpBars/hpBars';
import Sprites from '../Graphics/sprite/Sprite';
import Texts from '../Graphics/text'

import { Monsters } from '../../modules/Monsters/Monster'

import './pvp.css';
import MathPvp from '../../modules/MathPvp/MathPvp';

const Pvp = () => {
  let firstSelectedMonster: Monsters = new FourthPyroMonster();
  let secondSelectedMonster: Monsters = new FirstGeoMonster();
  let thirdSelectedMonster: Monsters = new FirstHydroMonster();
  let firstSelectedEnemyMonster: Monsters = new SecondPyroMonster();
  let secondSelectedEnemyMonster: Monsters = new FourthAnemoMonster();
  let thirdSelectedEnemyMonster: Monsters = new FourthHydroMonster();

  const mathPvp = new MathPvp();

  let [sQueue, setSQueue] = useState(mathPvp.sortQueuesByLevel(
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
    };})
  
  return (<>
    <Stage {...stageProps} className='pvpArea'>
      <Sprites stageProps={stageProps}
        firstSelectedMonster={firstSelectedMonster}
        secondSelectedMonster={secondSelectedMonster}
        thirdSelectedMonster={thirdSelectedMonster}
        firstSelectedEnemyMonster={firstSelectedEnemyMonster}
        secondSelectedEnemyMonster={secondSelectedEnemyMonster}      
        thirdSelectedEnemyMonster={thirdSelectedEnemyMonster}
        />
      <HpBars stageProps={stageProps} 
        hpBarFirstMonster={hpBarFirstMonster}
        hpBarSecondMonster={hpBarSecondMonster}
        hpBarThirdMonster={hpBarThirdMonster}
        hpBarFirstEnemyMonster={hpBarFirstEnemyMonster}
        hpBarSecondEnemyMonster={hpBarSecondEnemyMonster}
        hpBarThirdEnemyMonster={hpBarThirdEnemyMonster}
      />
      <Texts activeMonster={activeMonster}
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
    </Stage>
    <Buttons sQueue={sQueue}
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
    />
  </>)
};


export default Pvp