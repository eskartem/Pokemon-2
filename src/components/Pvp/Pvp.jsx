import {useEffect, useState} from 'react';
import {Stage, Text} from '@pixi/react';

import {FirstAnemoMonster, SecondAnemoMonster, ThirdAnemoMonster, FourthAnemoMonster, FirstGeoMonster, SecondGeoMonster,
  ThirdGeoMonster, FourthGeoMonster, FirstHydroMonster, SecondHydroMonster, ThirdHydroMonster, FourthHydroMonster, 
  FirstPyroMonster, SecondPyroMonster, ThirdPyroMonster, FourthPyroMonster} from '../../modules/Monsters/AllMoster'

import Buttons from '../Buttons/Buttons';
import HpBars from '../Graphics/hpBars/hpBars';
import Sprites from '../Graphics/sprite/Sprite';

import './pvp.css';
import MathPvp from '../../modules/MathPvp/MathPvp';

const Pvp = () => {
  let firstSelectedMonster = new FourthPyroMonster();
  let secondSelectedMonster = new FirstGeoMonster();
  let thirdSelectedMonster = new FirstHydroMonster();
  let firstSelectedEnemyMonster = new SecondPyroMonster();
  let secondSelectedEnemyMonster = new FourthAnemoMonster();
  let thirdSelectedEnemyMonster = new FourthHydroMonster();

  const mathPvp = new MathPvp();

  let [sQueue, setSQueue] = useState(mathPvp.sortQueuesByLevel(firstSelectedMonster,
    secondSelectedMonster,
    thirdSelectedMonster,
    firstSelectedEnemyMonster,
    secondSelectedEnemyMonster,
    thirdSelectedEnemyMonster))

  let [activeMonster, setActiveMonster] = useState(sQueue[0]);

  const [hpBarFirstMonster, setHpBarFirstMonster] = useState(firstSelectedMonster.healthPoint);
  const [hpBarSecondMonster, setHpBarSecondMonster] = useState(secondSelectedMonster.healthPoint)
  const [hpBarThirdMonster, setHpBarThirdMonster] = useState(thirdSelectedMonster.healthPoint);
  const [hpBarFirstEnemyMonster, setHpBarFirstEnemyMonster] = useState(firstSelectedEnemyMonster.healthPoint);
  const [hpBarSecondEnemyMonster, setHpBarSecondEnemyMonster] = useState(secondSelectedEnemyMonster.healthPoint);
  const [hpBarThirdEnemyMonster, setHpBarThirdEnemyMonster] = useState(thirdSelectedEnemyMonster.healthPoint);

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
  }, []);
  
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
      <Text
        text={`${activeMonster.name}`}
        anchor={0.5}
        x={550}
        y={20}
      />
    </Stage>
    <Buttons setActiveMonster={setActiveMonster}
      activeMonster={activeMonster}
      firstSelectedMonster={firstSelectedMonster}
      secondSelectedMonster={secondSelectedMonster}
      thirdSelectedMonster={thirdSelectedMonster}
      firstSelectedEnemyMonster={firstSelectedEnemyMonster}
      secondSelectedEnemyMonster={secondSelectedEnemyMonster} 
      thirdSelectedEnemyMonster={thirdSelectedEnemyMonster}
      setSQueue={setSQueue}
      sQueue={sQueue}
      hpBarFirstMonster={hpBarFirstMonster}
      hpBarSecondMonster={hpBarSecondMonster}
      hpBarThirdMonster={hpBarThirdMonster}
      hpBarFirstEnemyMonster={hpBarFirstEnemyMonster}
      hpBarSecondEnemyMonster={hpBarSecondEnemyMonster}
      hpBarThirdEnemyMonster={hpBarThirdEnemyMonster}
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