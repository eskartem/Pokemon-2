import {useCallback} from "react";
import { Graphics, Text } from "@pixi/react";

import { TextStyle } from "pixi.js";

interface hpBarsProps {
  stageProps: {
    width: number,
    height: number,
  },
  hpBarFirstMonster: number, 
  hpBarSecondMonster: number, 
  hpBarThirdMonster: number, 
  hpBarFirstEnemyMonster: number, 
  hpBarSecondEnemyMonster: number, 
  hpBarThirdEnemyMonster: number 
}

const HpBars: React.FC<hpBarsProps> = (props: hpBarsProps) => {

      const {stageProps, 
        hpBarFirstMonster, 
        hpBarSecondMonster, 
        hpBarThirdMonster, 
        hpBarFirstEnemyMonster, 
        hpBarSecondEnemyMonster, 
        hpBarThirdEnemyMonster  
      }  = props;
      
      const hpBarFirstPlayer = useCallback((g: any) => {
      g.clear();
      //FirstPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.01, stageProps.height * 0.02, 210, 30);
      g.endFill();
      
      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.01 + 5, stageProps.height * 0.02 + 5, hpBarFirstMonster, 20);
      g.endFill();

      //SecondPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.01, stageProps.height * 0.1, 210, 30);
      g.endFill();

      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.01 + 5, stageProps.height * 0.1 + 5, hpBarSecondMonster, 20);
      g.endFill();
      //ThirdPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.01, stageProps.height * 0.18, 210, 30);
      g.endFill();

      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.01 + 5, stageProps.height * 0.18 + 5, hpBarThirdMonster, 20);
      g.endFill();
    }, [hpBarFirstMonster, hpBarSecondMonster, hpBarThirdMonster, stageProps.height, stageProps.width])

    const hpBarSecondPlayer = useCallback((g: any) => {
      g.clear();
      //fourthPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.80, stageProps.height * 0.02, 210, 30);
      g.endFill();
      
      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.80 + 5, stageProps.height * 0.02 + 5, hpBarFirstEnemyMonster, 20);
      g.endFill();

      //fivethPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.80, stageProps.height * 0.1, 210, 30);
      g.endFill();

      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.80 + 5, stageProps.height * 0.1 + 5, hpBarSecondEnemyMonster, 20);
      g.endFill();
      //sixthPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.80, stageProps.height * 0.18, 210, 30);
      g.endFill();

      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.80 + 5, stageProps.height * 0.18 + 5, hpBarThirdEnemyMonster, 20);
      g.endFill();
    }, [hpBarFirstEnemyMonster, hpBarSecondEnemyMonster, hpBarThirdEnemyMonster, stageProps.height, stageProps.width]);
 
    return (<>
      <Graphics draw={hpBarFirstPlayer}></Graphics>
      <Graphics draw={hpBarSecondPlayer}></Graphics>
    </>)
}

export default HpBars