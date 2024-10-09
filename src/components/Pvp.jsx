import {useEffect, useState, useCallback} from 'react';
import {Stage, Sprite, Graphics} from '@pixi/react';
import './pvp.css';

import FirstPoke from '../Monters/firstPoke';
import SecondPoke from '../Monters/secondPoke';
import ThirdPoke from '../Monters/thirdPoke';
import FourthPoke from '../Monters/fourthPoke';
import FivethPoke from '../Monters/fivethPoke';
import SixthPoke from '../Monters/sixthPoke';

const Pvp = () => {
  
  //window Size
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const firstPoke = new FirstPoke();
  const secondPoke = new SecondPoke();
  const thirdPoke = new ThirdPoke();
  const fourthPoke = new FourthPoke();
  const fivethPoke = new FivethPoke();
  const sixthPoke = new SixthPoke();

  //HealPoint 
  const [hpBarFirstPoke, sethpBarFirstPoke] = useState(firstPoke.HealPoint);
  const [hpBarSecondPoke, sethpBarSecondPoke] = useState(secondPoke.HealPoint);
  const [hpBarThirdPoke, sethpBarThirdPoke] = useState(thirdPoke.HealPoint);
  const [hpBarFourthPoke, sethpBarFourthPoke] = useState(fourthPoke.HealPoint);
  const [hpBarFivethPoke, sethpBarFivethPoke] = useState(fivethPoke.HealPoint);
  const [hpBarSixthPoke, sethpBarSixthPoke] = useState(sixthPoke.HealPoint);

  const stageProps = {
    width: width * 0.7,
    height: height * 0.7,
    options: {
      backgroundAlpha: 0
    }
  };

  let inventory = [];

 const hideOrShowButonns = (props) => {
    const id = document.getElementById(props);
    if (id.classList.contains('showButton')) {
      id.classList.remove('showButton');
      id.classList.add('hideButton')
    } else {
      id.classList.remove('hideButton')
      id.classList.add('showButton')
    }
 }

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const hpBarFirstPlayer = useCallback((g) => {
    g.clear();
    //FirstPoke
    g.beginFill(0x000000);
    g.drawRect(stageProps.width * 0.01, stageProps.height * 0.02, 160, 30);
    g.endFill();
    
    g.beginFill(0x00ff00);
    g.drawRect(stageProps.width * 0.01 + 5, stageProps.height * 0.02 + 5, hpBarFirstPoke, 20);
    g.endFill();

    //SecondPoke
    g.beginFill(0x000000);
    g.drawRect(stageProps.width * 0.01, stageProps.height * 0.1, 160, 30);
    g.endFill();

    g.beginFill(0x00ff00);
    g.drawRect(stageProps.width * 0.01 + 5, stageProps.height * 0.1 + 5, hpBarSecondPoke, 20);
    g.endFill();
    //ThirdPoke
    g.beginFill(0x000000);
    g.drawRect(stageProps.width * 0.01, stageProps.height * 0.18, 160, 30);
    g.endFill();

    g.beginFill(0x00ff00);
    g.drawRect(stageProps.width * 0.01 + 5, stageProps.height * 0.18 + 5, hpBarThirdPoke, 20);
    g.endFill();
  }, [hpBarFirstPoke, hpBarSecondPoke, hpBarThirdPoke, stageProps.height, stageProps.width]);

  const hpBarSecondPlayer = useCallback((g) => {
    g.clear();
    //fourthPoke
    g.beginFill(0x000000);
    g.drawRect(stageProps.width * 0.84, stageProps.height * 0.02, 160, 30);
    g.endFill();
    
    g.beginFill(0x00ff00);
    g.drawRect(stageProps.width * 0.84 + 5, stageProps.height * 0.02 + 5, hpBarFourthPoke, 20);
    g.endFill();

    //fivethPoke
    g.beginFill(0x000000);
    g.drawRect(stageProps.width * 0.84, stageProps.height * 0.1, 160, 30);
    g.endFill();

    g.beginFill(0x00ff00);
    g.drawRect(stageProps.width * 0.84 + 5, stageProps.height * 0.1 + 5, hpBarFivethPoke, 20);
    g.endFill();
    //sixthPoke
    g.beginFill(0x000000);
    g.drawRect(stageProps.width * 0.84, stageProps.height * 0.18, 160, 30);
    g.endFill();

    g.beginFill(0x00ff00);
    g.drawRect(stageProps.width * 0.84 + 5, stageProps.height * 0.18 + 5, hpBarSixthPoke, 20);
    g.endFill();
  }, [hpBarFourthPoke, hpBarFivethPoke, hpBarSixthPoke, stageProps.height, stageProps.width]);
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (<>
    <Stage {...stageProps} className='pvpArea'>
      <Sprite image={firstPoke.src} x={stageProps.width * 0.10} y={stageProps.height * 0.3} scale={[-1, 1]}></Sprite>
      <Sprite image={secondPoke.src} x={stageProps.width * 0.10} y={stageProps.height * 0.5}scale={[-1, 1]}></Sprite>
      <Sprite image={thirdPoke.src} x={stageProps.width * 0.10} y={stageProps.height * 0.7} scale={[-1, 1]}></Sprite>
      <Sprite image={fourthPoke.src} x={stageProps.width * 0.90} y={stageProps.height * 0.3}></Sprite>
      <Sprite image={fivethPoke.src} x={stageProps.width * 0.90} y={stageProps.height * 0.5}></Sprite>
      <Sprite image={sixthPoke.src} x={stageProps.width * 0.90} y={stageProps.height * 0.7} ></Sprite>
      <Graphics draw={hpBarFirstPlayer}></Graphics>
      <Graphics draw={hpBarSecondPlayer}></Graphics>
    </Stage>

    <div className='buttonMenu'>
      <div id='firstPlayerButton' className='showButton'>
        <button onClick={() => {
          hideOrShowButonns('firstPlayerButton');
          hideOrShowButonns('firstCombatMenuButton')
        }}>Скилы</button>
        <button onClick={() => {
          hideOrShowButonns('firstPlayerButton');
        }}>Предметы</button>
        <button>Сбежать</button>
        <button>1</button>
      </div>

      <div id='firstCombatMenuButton' className='hideButton'>
        <button onClick={() => {
          hideOrShowButonns('firstCombatMenuButton');
          hideOrShowButonns('yourChoose');
        }}>Толчок</button>
        <button onClick={() => {
          hideOrShowButonns('firstCombatMenuButton');
          hideOrShowButonns('firstPlayerButton');
        }}>Назад</button>
      </div>

      <div id='yourChoose' className='hideButton'>
        <button onClick={() => {
          sethpBarFourthPoke(hpBarFourthPoke - 25)
          hideOrShowButonns('yourChoose');
          hideOrShowButonns('secondPlayerButton');
        }}>Ударить {fourthPoke.name}</button>
        <button onClick={() => {
          sethpBarFivethPoke(hpBarFivethPoke - 25)
          hideOrShowButonns('yourChoose');
          hideOrShowButonns('secondPlayerButton');
        }}>Ударить {fivethPoke.name}</button>
        <button onClick={() => {
          sethpBarSixthPoke(hpBarSixthPoke - 25)
          hideOrShowButonns('yourChoose');
          hideOrShowButonns('secondPlayerButton');
        }}>Ударить {sixthPoke.name}</button>
      </div>

      <div id='secondPlayerButton' className='hideButton'>
        <button onClick={() => {
          hideOrShowButonns('secondPlayerButton');
          hideOrShowButonns('secondCombatMenuButton')
        }}>Скилы</button>
        <button onClick={() => {
          hideOrShowButonns('secondPlayerButton');
        }}>Предметы</button>
        <button>Сбежать</button>
        <button>2</button>
      </div>

      <div id='secondCombatMenuButton' className='hideButton'>
        <button onClick={() => {
          hideOrShowButonns('secondCombatMenuButton');
          hideOrShowButonns('enemyChoose');
        }}>Толчок</button>
        <button onClick={() => {
          hideOrShowButonns('secondCombatMenuButton');
          hideOrShowButonns('secondPlayerButton');
        }}>Назад</button>
      </div>

      <div id='enemyChoose' className='hideButton'>
        <button onClick={() => {
          sethpBarFirstPoke(hpBarFirstPoke - 25)
          hideOrShowButonns('enemyChoose');
          hideOrShowButonns('firstPlayerButton');
        }}>Ударить {firstPoke.name}</button>
        <button onClick={() => {
          sethpBarSecondPoke(hpBarSecondPoke - 25)
          hideOrShowButonns('enemyChoose');
          hideOrShowButonns('firstPlayerButton');
        }}>Ударить {secondPoke.name}</button>
        <button onClick={() => {
          sethpBarThirdPoke(hpBarThirdPoke - 25)
          hideOrShowButonns('enemyChoose');
          hideOrShowButonns('firstPlayerButton');
        }}>Ударить {thirdPoke.name}</button>
      </div>
    </div>
  </>)
};


export default Pvp