import {useEffect, useState} from 'react';
import {Stage, Text} from '@pixi/react';
import { PAGES } from '../PageManager';

import {FirstAnemoMonster, SecondAnemoMonster, ThirdAnemoMonster, FourthAnemoMonster, FirstGeoMonster, SecondGeoMonster,
  ThirdGeoMonster, FourthGeoMonster, FirstHydroMonster, SecondHydroMonster, ThirdHydroMonster, FourthHydroMonster, 
  FirstPyroMonster, SecondPyroMonster, ThirdPyroMonster, FourthPyroMonster} from '../../assets/Monsters/AllMoster'

import Buttons from '../../components/ButtonsPvp/Buttons';
import HpBars from '../../components/Graphics/hpBars/hpBars';
import Sprites from '../../components/Graphics/sprite/Sprite';
import Texts from '../../components/Graphics/text'
import FinalScreen from '../../components/finalScreen/finalScreen';
import Button from '../../components/Button/Button';
import BattleTimer from '../../components/Graphics/battleTimer/battleTimer';

import { Monsters } from "../../assets/Monsters/Monster"

import './Battle.scss';
import MathPvp from '../../services/MathPvp/MathPvp';

const Pvp = (props: any) => {
  let firstSelectedMonster: Monsters = new FourthPyroMonster("yourSide", 6);
  let secondSelectedMonster: Monsters = new FirstGeoMonster("yourSide", 1);
  let thirdSelectedMonster: Monsters = new FirstHydroMonster("yourSide", 1);
  let firstSelectedEnemyMonster: Monsters = new SecondPyroMonster("enemySide", 1);
  let secondSelectedEnemyMonster: Monsters = new FourthAnemoMonster("enemySide", 1);
  let thirdSelectedEnemyMonster: Monsters = new FourthHydroMonster("enemySide", 1);

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
      <Sprites stageProps={stageProps}
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
      <HpBars stageProps={stageProps} 
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
      <BattleTimer stageProps={stageProps}
        sQueue={sQueue}
        setSQueue={setSQueue}
        setActiveMonster={setActiveMonster}
        activeMonster={activeMonster}
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

    <FinalScreen hpBarFirstMonster={hpBarFirstMonster}
      hpBarSecondMonster={hpBarSecondMonster}
      hpBarThirdMonster={hpBarThirdMonster}
      hpBarFirstEnemyMonster={hpBarFirstEnemyMonster}
      hpBarSecondEnemyMonster={hpBarSecondEnemyMonster}
      hpBarThirdEnemyMonster={hpBarThirdEnemyMonster}
    />
    <Button onClick={backClickHandler} text='назад' />
  </>)
};


export default Pvp