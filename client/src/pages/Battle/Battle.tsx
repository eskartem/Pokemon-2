import { useEffect, useState, useContext } from 'react';
import { Stage } from '@pixi/react';
import { IBasePage, PAGES } from '../PageManager';
import { stageContext } from '../../assets/context/stage';
import Buttons from '../../components/ButtonsPvp/Buttons';
import HpBars from '../../components/Graphics/hpBars/hpBars';
import Sprites from '../../components/Graphics/sprite/Sprite';
import FinalScreen from '../../components/finalScreen/finalScreen';
import BattleTimer from '../../components/Graphics/battleTimer/battleTimer';
import MathPvp from '../../services/MathPvp/MathPvp';
import { ServerContext, StoreContext } from '../../App';
import { TMonster, TUpdateBattleResponse, TPlayers, TUserInfo, TBattle } from '../../services/server/types';
import './Battle.scss';
import userEvent from '@testing-library/user-event';

const Battle: React.FC<IBasePage> = (props: IBasePage) => {

  const { setPage } = props;
  const server = useContext(ServerContext);
  const store = useContext(StoreContext);

  const mathPvp = new MathPvp();

  const [firstSelectedMonster, setFirstSelectedMonster] = useState<TMonster>({} as TMonster);
  const [secondSelectedMonster, setSecondSelectedMonster] = useState<TMonster>({} as TMonster);
  const [thirdSelectedMonster, setThirdSelectedMonster] = useState<TMonster>({} as TMonster);
  const [firstSelectedEnemyMonster, setFirstSelectedEnemyMonster] = useState<TMonster>({} as TMonster);
  const [secondSelectedEnemyMonster, setSecondSelectedEnemyMonster] = useState<TMonster>({} as TMonster);
  const [thirdSelectedEnemyMonster, setThirdSelectedEnemyMonster] = useState<TMonster>({} as TMonster)
  const [fightId, setFightId] = useState<number>(6)
  const [user, setUser] = useState<TUserInfo | null>(null)
  const [Queues, setHuinya] = useState<number[]>([])
  
  const [time, setTime] = useState<number>(200)

  const [monster, setMonster] = useState<number[]>([]);
  const [oppMonster, setOppMonster] = useState<number[]>([]);

  let [sQueue, setSQueue] = useState<TMonster[]>([]);
  let [activeMonster, setActiveMonster] = useState<TMonster>({} as TMonster);

  const [hpBarFirstMonster, setHpBarFirstMonster] = useState<number>(0);
  const [hpBarSecondMonster, setHpBarSecondMonster] = useState<number>(0);
  const [hpBarThirdMonster, setHpBarThirdMonster] = useState<number>(0);
  const [hpBarFirstEnemyMonster, setHpBarFirstEnemyMonster] = useState<number>(0);
  const [hpBarSecondEnemyMonster, setHpBarSecondEnemyMonster] = useState<number>(0);
  const [hpBarThirdEnemyMonster, setHpBarThirdEnemyMonster] = useState<number>(0);
  const [maxHpBarFirstMonster, setMaxHpBarFirstMonster] = useState<number>(0);
  const [maxHpBarSecondMonster, setMaxHpBarSecondMonster] = useState<number>(0);
  const [maxHpBarThirdMonster, setMaxHpBarThirdMonster] = useState<number>(0);
  const [maxHpBarFirstEnemyMonster, setMaxHpBarFirstEnemyMonster] = useState<number>(0);
  const [maxHpBarSecondEnemyMonster, setMaxHpBarSecondEnemyMonster] = useState<number>(0);
  const [maxHpBarThirdEnemyMonster, setMaxHpBarThirdEnemyMonster] = useState<number>(0);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const [allMonsterSelected, setAllMonsterSelected] = useState<boolean>(false)
  const [maxHp, setMaxHp] = useState<boolean>(false)
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)
  const [loading, SetLoading] = useState<boolean>(true)

  const [firstPlayer, setFirstPlayer] = useState<TPlayers>({} as TPlayers)
  const [secondPlayer, setSecondPlayer] = useState<TPlayers>({} as TPlayers)

  const [stageProps, setStageProps] = useState({
    width: width * 0.7,
    height: height * 0.7,
    options: {
      backgroundAlpha: 0,
    },
  });

  const setQueue = async (fightId: number, sQueue: number[]) => {
    try {
      const a = sQueue.map(String).join(',')
      const squeue = await server.getQueue(fightId, a)
      if(squeue){setHuinya(squeue)}
    } catch (error) {}
  }

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
    monster,
    oppMonster,
    setSQueue,
    setActiveMonster,
    setHpBarFirstEnemyMonster,
    setHpBarFirstMonster,
    setHpBarSecondEnemyMonster,
    setHpBarSecondMonster,
    setHpBarThirdEnemyMonster,
    setHpBarThirdMonster,
    maxHpBarFirstMonster,
    maxHpBarSecondMonster,
    maxHpBarThirdMonster,
    maxHpBarFirstEnemyMonster,
    maxHpBarSecondEnemyMonster,
    maxHpBarThirdEnemyMonster,
    buttonClicked,
    setTime,
    setButtonClicked,
    setQueue,
    fightId,
    Queues,
    firstPlayer,
    secondPlayer
  });

  const getMonsterById = async (queue: number[]) => {
    try { 
      const monster = await server.getMonsterInfo(queue[0])  
      if (monster) {
        setActiveMonster(monster)
        
      }
    } catch (error) {}
  }

  useEffect(() => {
    getMonsterById(Queues)     
  }, [Queues])

  const getMonsterInfo = async (monsterIds: number[], opp_monsterIds: number[]) => {
    try {
      const firstMonsterInfo = await server.getMonsterInfo(monsterIds[0]);
      const secondMonsterInfo = await server.getMonsterInfo(monsterIds[1]);
      const thirdMonsterInfo = await server.getMonsterInfo(monsterIds[2]);
      const firstEnemyMonsterInfo = await server.getMonsterInfo(opp_monsterIds[0]);
      const secondEnemyMonsterInfo = await server.getMonsterInfo(opp_monsterIds[1]);
      const thirdEnemyMonsterInfo = await server.getMonsterInfo(opp_monsterIds[2]);
      if (firstMonsterInfo && secondMonsterInfo && thirdMonsterInfo && firstEnemyMonsterInfo && secondEnemyMonsterInfo && thirdEnemyMonsterInfo) {
        setFirstSelectedMonster(firstMonsterInfo);
        setSecondSelectedMonster(secondMonsterInfo);
        setThirdSelectedMonster(thirdMonsterInfo);
        setFirstSelectedEnemyMonster(firstEnemyMonsterInfo);
        setSecondSelectedEnemyMonster(secondEnemyMonsterInfo);
        setThirdSelectedEnemyMonster(thirdEnemyMonsterInfo);
        setAllMonsterSelected(true)
        setMaxHp(true) 
        setButtonClicked(false)
      }
    } catch (error) {}
  };

  const backClickHandler = () => setPage(PAGES.GAME);

  useEffect(() => {
    setActiveMonster(sQueue[0])
  }, [sQueue])


  useEffect(() => {
    const sortedQueue = mathPvp.sortQueuesByLevel(
      firstSelectedMonster,
      secondSelectedMonster,
      thirdSelectedMonster,
      firstSelectedEnemyMonster,
      secondSelectedEnemyMonster,
      thirdSelectedEnemyMonster
    );
    setSQueue(sQueue = sortedQueue);
    setHuinya([sQueue[0].id, sQueue[1].id, sQueue[2].id, sQueue[3].id, sQueue[4].id, sQueue[5].id])
  }, [allMonsterSelected])

  useEffect(() => {
    setMaxHpBarFirstMonster(firstSelectedMonster.hp);
    setMaxHpBarSecondMonster(secondSelectedMonster.hp);
    setMaxHpBarThirdMonster(thirdSelectedMonster.hp);
    setMaxHpBarFirstEnemyMonster(firstSelectedEnemyMonster.hp);
    setMaxHpBarSecondEnemyMonster(secondSelectedEnemyMonster.hp);
    setMaxHpBarThirdEnemyMonster(thirdSelectedEnemyMonster.hp);
  }, [maxHp])

  useEffect(() => {
    const updateBattleHandler = async (result: TUpdateBattleResponse) => {
      if (!result.gamers) return;
      setFirstPlayer(result.gamers[0])
      if(!firstPlayer) return;
      setSecondPlayer(result.gamers[1])
      if(!secondPlayer) return;
      setMonster(firstPlayer.monsters);
      setOppMonster(secondPlayer.monsters);
      if(!monster || monster.length !== 3) return
      if(!oppMonster || oppMonster.length !== 3) return
      getMonsterInfo(monster, oppMonster);
      if(monster && oppMonster) {
        setTime(30000)
        SetLoading(false)
      }
    };
    
    if (true) {
      server.startBattleUpdate(updateBattleHandler, time);
    }
    return () => {
      server.stopBattleUpdate();
    };
  }, [server, store, monster, oppMonster, buttonClicked, firstPlayer, secondPlayer]);

  const getUser = async () => {
    try {
      const token: TUserInfo | null  = await server.getUserInfo()
      setUser(token)
    } catch (error) {}
  }

  useEffect(() => {
    getUser()
  },[server])

  useEffect(() => {
    if (firstSelectedMonster && secondSelectedMonster && thirdSelectedMonster &&
        firstSelectedEnemyMonster && secondSelectedEnemyMonster && thirdSelectedEnemyMonster) {
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
    const sortedQueue = mathPvp.sortQueuesByLevel(
      firstSelectedMonster,
      secondSelectedMonster,
      thirdSelectedMonster,
      firstSelectedEnemyMonster,
      secondSelectedEnemyMonster,
      thirdSelectedEnemyMonster
    );
    setSQueue(sQueue = sortedQueue);
  }, [allMonsterSelected])
  
  useEffect(() => {
    setMaxHpBarFirstMonster(firstSelectedMonster.hp);
    setMaxHpBarSecondMonster(secondSelectedMonster.hp);
    setMaxHpBarThirdMonster(thirdSelectedMonster.hp);
    setMaxHpBarFirstEnemyMonster(firstSelectedEnemyMonster.hp);
    setMaxHpBarSecondEnemyMonster(secondSelectedEnemyMonster.hp);
    setMaxHpBarThirdEnemyMonster(thirdSelectedEnemyMonster.hp);
  }, [maxHp])
  
  useEffect(() => {
    setStage({
      stageProps,
      hpBarFirstEnemyMonster,
      hpBarFirstMonster,
      hpBarSecondEnemyMonster,
      hpBarSecondMonster,
      hpBarThirdEnemyMonster,
      hpBarThirdMonster,
      maxHpBarFirstMonster,
      maxHpBarSecondMonster,
      maxHpBarThirdMonster,
      maxHpBarFirstEnemyMonster,
      maxHpBarSecondEnemyMonster,
      maxHpBarThirdEnemyMonster,
      firstSelectedMonster,
      secondSelectedMonster,
      thirdSelectedMonster,
      firstSelectedEnemyMonster,
      secondSelectedEnemyMonster,
      thirdSelectedEnemyMonster,
      sQueue,
      activeMonster,
      oppMonster,
      monster,
      buttonClicked,
      setSQueue,
      setActiveMonster,
      setHpBarFirstEnemyMonster,
      setHpBarFirstMonster,
      setHpBarSecondEnemyMonster,
      setHpBarSecondMonster,
      setHpBarThirdEnemyMonster,
      setHpBarThirdMonster,
      setButtonClicked,
      setTime,
      setQueue,
      fightId,
      Queues,
      firstPlayer,
      secondPlayer
    });
  }, [stageProps, hpBarFirstEnemyMonster, hpBarFirstMonster, hpBarSecondEnemyMonster, hpBarSecondMonster, hpBarThirdEnemyMonster, hpBarThirdMonster,
      firstSelectedMonster, secondSelectedMonster, thirdSelectedMonster, firstSelectedEnemyMonster, secondSelectedEnemyMonster, thirdSelectedEnemyMonster,
      sQueue, activeMonster, monster, oppMonster, maxHpBarFirstEnemyMonster, maxHpBarFirstMonster, maxHpBarSecondEnemyMonster, maxHpBarSecondMonster,
      maxHpBarThirdEnemyMonster, maxHpBarThirdMonster, buttonClicked]);

    if (loading) {
      return (
          <div>
              <p> Ждите, работа сложная...... </p>
          </div>
      )
    }

  return (
    <>
      <Stage {...stageProps} className='pvpArea'>
        <stageContext.Provider value={stage}>
          <Sprites />
          <HpBars />
          <BattleTimer />
        </stageContext.Provider>
      </Stage>
      <stageContext.Provider value={stage}>
        <Buttons />
        <FinalScreen />
      </stageContext.Provider>
    </>
  );
};

export default Battle;
