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
import { TCr, TGamerBattle, TInventory, TUpdateBattleResponse, TUpdateSceneResponse } from '../../services/server/types';
import './Battle.scss';

const Battle: React.FC<IBasePage> = (props: IBasePage) => {
  const server = useContext(ServerContext);
  const store = useContext(StoreContext)

  const [firstSelectedMonster, setFirstSelectedMonster] = useState<TCr>({} as TCr);
  const [secondSelectedMonster, setSecondSelectedMonster] = useState<TCr>({} as TCr);
  const [thirdSelectedMonster, setThirdSelectedMonster] = useState<TCr>({} as TCr);
  const [firstSelectedEnemyMonster, setFirstSelectedEnemyMonster] = useState<TCr>({} as TCr);
  const [secondSelectedEnemyMonster, setSecondSelectedEnemyMonster] = useState<TCr>({} as TCr);
  const [thirdSelectedEnemyMonster, setThirdSelectedEnemyMonster] = useState<TCr>({} as TCr);

  const mathPvp = new MathPvp();
  const { setPage } = props;

  const [sQueue, setSQueue] = useState<TCr[]>([]);
  const [activeMonster, setActiveMonster] = useState<TCr>({} as TCr);

  const [hpBarFirstMonster, setHpBarFirstMonster] = useState<number>(0);
  const [hpBarSecondMonster, setHpBarSecondMonster] = useState<number>(0);
  const [hpBarThirdMonster, setHpBarThirdMonster] = useState<number>(0);
  const [hpBarFirstEnemyMonster, setHpBarFirstEnemyMonster] = useState<number>(0);
  const [hpBarSecondEnemyMonster, setHpBarSecondEnemyMonster] = useState<number>(0);
  const [hpBarThirdEnemyMonster, setHpBarThirdEnemyMonster] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
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

  const battle = async () => {
    setLoading(true);
    try {
      const players: TGamerBattle[] | null = await server.getPlayerInBattle();
      const inventory: TInventory | null = await server.getInventory();

      if (!inventory) return;
      
      setFirstSelectedMonster(inventory.monsters[0]);
      setSecondSelectedMonster(inventory.monsters[1]);
      setThirdSelectedMonster(inventory.monsters[2]);
      setFirstSelectedEnemyMonster(inventory.monsters[0]);
      setSecondSelectedEnemyMonster(inventory.monsters[0]);
      setThirdSelectedEnemyMonster(inventory.monsters[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    battle();
  }, [server]);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

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
      setHpBarFirstMonster(firstSelectedMonster.max_HP);
      setHpBarSecondMonster(secondSelectedMonster.max_HP);
      setHpBarThirdMonster(thirdSelectedMonster.max_HP);
      setHpBarFirstEnemyMonster(firstSelectedEnemyMonster.max_HP);
      setHpBarSecondEnemyMonster(secondSelectedEnemyMonster.max_HP);
      setHpBarThirdEnemyMonster(thirdSelectedEnemyMonster.max_HP);
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

  useEffect(() => {
    const updateBattleHandler = (result: TUpdateBattleResponse) => { 
      if (!result.gamers) return;
      let player = result.gamers;
      console.log(player.user_id);
      
      
      
      
      

      
      
      
    }
    
    if (true) {
        server.startBattleUpdate(updateBattleHandler);
    }
    return () => {
        server.stopBattleUpdate();
    }       
  }, [server, store]);

  if (loading) {
    return <div>Loading...</div>;
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
