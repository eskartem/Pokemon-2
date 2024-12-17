import {useEffect, useState, createContext} from 'react';
import {Stage} from '@pixi/react';
import { IBasePage, PAGES } from '../PageManager';

import {FirstAnemoMonster, SecondAnemoMonster, ThirdAnemoMonster, FirstGeoMonster, 
  ThirdGeoMonster, FirstHydroMonster, SecondHydroMonster, ThirdHydroMonster, 
  FirstPyroMonster, SecondPyroMonster, ThirdPyroMonster, SecondGeoMonster
} from '../../assets/Monsters/AllMoster'

import { stageContext } from '../../assets/context/stage';

import Buttons from '../../components/ButtonsPvp/Buttons';
import HpBars from '../../components/Graphics/hpBars/hpBars';
import Sprites from '../../components/Graphics/sprite/Sprite';
import Texts from '../../components/Graphics/text'
import FinalScreen from '../../components/finalScreen/finalScreen';
import Button from '../../components/Button/Button';
import BattleTimer from '../../components/Graphics/battleTimer/battleTimer';
import Animation from '../../components/Graphics/animation/animation';

import {easyBot, mediumBot, hardBot} from '../../assets/Bots/bots';

import { Monsters } from "../../assets/Monsters/Monster"


import './Battle.scss';
import MathPvp from '../../services/MathPvp/MathPvp';

const Battle: React.FC<IBasePage> = (props: IBasePage) => {
  
  const enemy = new easyBot() /*lvl = 1 */
  //const enemy = new mediumBot() /*lvl = 3 */
  //const enemy = new hardBot() /*lvl = 5 */

  const enemyType: string = 'bot'

  let firstSelectedMonster: Monsters = new FirstPyroMonster("yourSide", 5);
  let secondSelectedMonster: Monsters = new FirstPyroMonster("yourSide", 5);
  let thirdSelectedMonster: Monsters = new FirstPyroMonster("yourSide", 5);
  let firstSelectedEnemyMonster: Monsters = enemy.selectedMonsters[0];
  let secondSelectedEnemyMonster: Monsters =  enemy.selectedMonsters[1];
  let thirdSelectedEnemyMonster: Monsters =   enemy.selectedMonsters[2];
  
  const mathPvp = new MathPvp();

  const { setPage } = props; 

  let [sQueue, setSQueue] = useState<Monsters[]>(mathPvp.sortQueuesByLevel(
    firstSelectedMonster,
    secondSelectedMonster,
    thirdSelectedMonster,
    firstSelectedEnemyMonster,
    secondSelectedEnemyMonster,
    thirdSelectedEnemyMonster
  ));

  let [activeMonster, setActiveMonster] = useState<Monsters>(sQueue[0]); 

  let [animation, setAnimation] = useState<boolean>(false);

  let [attackedPosition, setAttackedPosition] = useState<string>('');

  const [hpBarFirstMonster, setHpBarFirstMonster] = useState<number>(firstSelectedMonster.healthPoint);
  const [hpBarSecondMonster, setHpBarSecondMonster] = useState<number>(secondSelectedMonster.healthPoint);
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

  const stage = {
    stageProps,
    hpBarFirstEnemyMonster,
    hpBarFirstMonster,
    hpBarSecondEnemyMonster,
    hpBarSecondMonster,
    hpBarThirdEnemyMonster,
    hpBarThirdMonster,
    firstSelectedMonster,
    secondSelectedMonster,
    thirdSelectedMonster,
    firstSelectedEnemyMonster,
    secondSelectedEnemyMonster,
    thirdSelectedEnemyMonster,
    sQueue,
    activeMonster,
    setSQueue,
    setActiveMonster,
    setHpBarFirstEnemyMonster,
    setHpBarFirstMonster,
    setHpBarSecondEnemyMonster,
    setHpBarSecondMonster,
    setHpBarThirdEnemyMonster,
    setHpBarThirdMonster,
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
  });
  
  const backClickHandler = () => setPage(PAGES.MAINMENU);
  
  return (<>
    <Stage {...stageProps} className='pvpArea'>
      <stageContext.Provider value={stage}>
        <Sprites />
        <HpBars />
        <Texts />
        <BattleTimer />
        <Animation animation={animation} attackedPosition={attackedPosition} />
      </stageContext.Provider>
    </Stage>
    <stageContext.Provider value={stage}>
      <Buttons
        enemyType={enemyType}
        animation={animation}
        setAnimation={setAnimation}
        attackedPosition={attackedPosition}
        setAttackedPosition={setAttackedPosition}
      />
      <FinalScreen/>
    </stageContext.Provider>
    <Button onClick={backClickHandler} text='назад' />
  </>)
};


export default Battle