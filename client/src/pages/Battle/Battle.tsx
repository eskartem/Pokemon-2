import { useEffect, useState, useContext } from 'react';
import { Stage } from '@pixi/react';
import { IBasePage, PAGES } from '../PageManager';
import { stageContext } from '../../assets/context/stage';
import Buttons from '../../components/ButtonsPvp/Buttons';
import HpBars from '../../components/Graphics/hpBars/hpBars';
import Sprites from '../../components/Graphics/sprite/Sprite';
import Texts from '../../components/Graphics/text';
import FinalScreen from '../../components/finalScreen/finalScreen';
import Button from '../../components/Button/Button';
import BattleTimer from '../../components/Graphics/battleTimer/battleTimer';
//import Animation from '../../components/Graphics/animation/animation';
import { easyBot } from '../../assets/Bots/bots';
import MathPvp from '../../services/MathPvp/MathPvp';
import { ServerContext, StoreContext } from '../../App';
import { TMonster, TGamerBattle, TInventory, TUpdateBattleResponse, TUpdateSceneResponse } from '../../services/server/types';
import './Battle.scss';

const Battle: React.FC<IBasePage> = (props: IBasePage) => {
  const server = useContext(ServerContext);
  const store = useContext(StoreContext);

  const [firstSelectedMonster, setFirstSelectedMonster] = useState<TMonster>({} as TMonster);
  const [secondSelectedMonster, setSecondSelectedMonster] = useState<TMonster>({} as TMonster);
  const [thirdSelectedMonster, setThirdSelectedMonster] = useState<TMonster>({} as TMonster);
  const [firstSelectedEnemyMonster, setFirstSelectedEnemyMonster] = useState<TMonster>({} as TMonster);
  const [secondSelectedEnemyMonster, setSecondSelectedEnemyMonster] = useState<TMonster>({} as TMonster);
  const [thirdSelectedEnemyMonster, setThirdSelectedEnemyMonster] = useState<TMonster>({} as TMonster);

  const mathPvp = new MathPvp();
  const { setPage } = props;

  const [sQueue, setSQueue] = useState<TMonster[]>([]);
  const [activeMonster, setActiveMonster] = useState<TMonster>({} as TMonster);

  const [hpBarFirstMonster, setHpBarFirstMonster] = useState<number>(0);
  const [hpBarSecondMonster, setHpBarSecondMonster] = useState<number>(0);
  const [hpBarThirdMonster, setHpBarThirdMonster] = useState<number>(0);
  const [hpBarFirstEnemyMonster, setHpBarFirstEnemyMonster] = useState<number>(0);
  const [hpBarSecondEnemyMonster, setHpBarSecondEnemyMonster] = useState<number>(0);
  const [hpBarThirdEnemyMonster, setHpBarThirdEnemyMonster] = useState<number>(0);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const [stageProps, setStageProps] = useState({
    width: width * 0.7,
    height: height * 0.7,
    options: {
      backgroundAlpha: 0,
    },
  });

  const [stage, setStage] = useState({
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
  });

  const backClickHandler = () => setPage(PAGES.GAME);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const getMonsterInfo = async (monsterId: number) => {
    const monsterInfo = await server.getMonsterInfo(monsterId);
    console.log(monsterInfo)
  };
  useEffect(() => {
    getMonsterInfo(1)
  }, [server])

  useEffect(() => {
    const updateBattleHandler = async (result: TUpdateBattleResponse) => {
      if (!result.gamers) return;
      let player = result.gamers;

      let opp_monster = splitString(player[0].monster_opp);
      let monster = splitString(player[0].monsters);

      //const firstMonsterInfo = await getMonsterInfo(monster[0]);
      //if (firstMonsterInfo) {
      //  setFirstSelectedMonster(firstMonsterInfo);
      //}
      // const secondMonsterInfo = await getMonsterInfo(monster[1]);
      // if (secondMonsterInfo) {
      //   setSecondSelectedMonster(secondMonsterInfo);
      // }
      // const thirdMonsterInfo = await getMonsterInfo(monster[2]);
      // if (thirdMonsterInfo) {
      //   setThirdSelectedMonster(thirdMonsterInfo);
      // }
      //const firstEnemyMonsterInfo = await getMonsterInfo(opp_monster[0]);
      //if (firstEnemyMonsterInfo) {
      //  setFirstSelectedEnemyMonster(firstEnemyMonsterInfo);
      //}
      // const secondEnemyMonsterInfo = await getMonsterInfo(opp_monster[1]);
      // if (secondEnemyMonsterInfo) {
      //   setSecondSelectedEnemyMonster(secondEnemyMonsterInfo);
      // }
      // const thirdEnemyMonsterInfo = await getMonsterInfo(opp_monster[2]);
      // if (thirdEnemyMonsterInfo) {
      //   setThirdSelectedEnemyMonster(thirdEnemyMonsterInfo);
      // }
    };

    if (true) {
      server.startBattleUpdate(updateBattleHandler);
    }
    return () => {
      server.stopBattleUpdate();
    };
  }, [server, store]);

  useEffect(() => {
    if (firstSelectedMonster && secondSelectedMonster && thirdSelectedMonster &&
        firstSelectedEnemyMonster && secondSelectedEnemyMonster && thirdSelectedEnemyMonster) {
      const sortedQueue = mathPvp.sortQueuesByLevel(
        firstSelectedMonster,
        secondSelectedMonster,
        thirdSelectedMonster,
        firstSelectedEnemyMonster,
        secondSelectedEnemyMonster,
        thirdSelectedEnemyMonster
      );
      setSQueue(sortedQueue);
      setActiveMonster(sortedQueue[0]);
      setHpBarFirstMonster(firstSelectedMonster.hp);
      setHpBarSecondMonster(secondSelectedMonster.hp);
      setHpBarThirdMonster(thirdSelectedMonster.hp);
      setHpBarFirstEnemyMonster(firstSelectedEnemyMonster.hp);
      setHpBarSecondEnemyMonster(secondSelectedEnemyMonster.hp);
      setHpBarThirdEnemyMonster(thirdSelectedEnemyMonster.hp);
    }
  }, [firstSelectedMonster, secondSelectedMonster, thirdSelectedMonster,
      firstSelectedEnemyMonster, secondSelectedEnemyMonster, thirdSelectedEnemyMonster]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setStage({
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
    });
  }, [stageProps, hpBarFirstEnemyMonster, hpBarFirstMonster, hpBarSecondEnemyMonster, hpBarSecondMonster, hpBarThirdEnemyMonster, hpBarThirdMonster,
      firstSelectedMonster, secondSelectedMonster, thirdSelectedMonster, firstSelectedEnemyMonster, secondSelectedEnemyMonster, thirdSelectedEnemyMonster,
      sQueue, activeMonster]);

  function splitString(inputString: string) {
    return inputString.split(',').map(Number);
  }

  return (
    <>
      <Stage {...stageProps} className='pvpArea'>
        <stageContext.Provider value={stage}>
          <Sprites />
          <HpBars />
          <Texts />
          <BattleTimer />
          {/*<Animation animation={animation} attackedPosition={attackedPosition} />*/}
        </stageContext.Provider>
      </Stage>
      <stageContext.Provider value={stage}>
        <Buttons />
        <FinalScreen />
      </stageContext.Provider>
      <Button onClick={backClickHandler} text='назад' />
    </>
  );
};

export default Battle;
