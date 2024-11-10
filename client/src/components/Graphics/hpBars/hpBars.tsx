import {useCallback} from "react";
import { Graphics, Text } from "@pixi/react";

import { Monsters } from "../../../assets/Monsters/Monster";

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
  hpBarThirdEnemyMonster: number ,
  firstSelectedMonster: Monsters,
  secondSelectedMonster: Monsters,
  thirdSelectedMonster: Monsters,
  firstSelectedEnemyMonster: Monsters,
  secondSelectedEnemyMonster: Monsters,
  thirdSelectedEnemyMonster: Monsters,
}

const HpBars: React.FC<hpBarsProps> = (props: hpBarsProps) => {

      const {stageProps, 
        hpBarFirstMonster, 
        hpBarSecondMonster, 
        hpBarThirdMonster, 
        hpBarFirstEnemyMonster, 
        hpBarSecondEnemyMonster, 
        hpBarThirdEnemyMonster,
        firstSelectedMonster,
        secondSelectedMonster,
        thirdSelectedMonster,
        firstSelectedEnemyMonster,
        secondSelectedEnemyMonster,
        thirdSelectedEnemyMonster 
      }  = props;

      const hpBarLength = (healthPoint: number, maxHealthPoint: number) => {
        let healthPercentage = (healthPoint / maxHealthPoint) * 100
        return (healthPercentage / 100) * 200 
      }
      
      const hpBarFirstPlayer = useCallback((g: any) => {
      g.clear();
      //FirstPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.01, stageProps.height * 0.02, 210, 30);
      g.endFill();
      
      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.01 + 5, stageProps.height * 0.02 + 5, hpBarLength(hpBarFirstMonster, firstSelectedMonster.healthPoint), 20);
      g.endFill();

      //SecondPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.01, stageProps.height * 0.1, 210, 30);
      g.endFill();

      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.01 + 5, stageProps.height * 0.1 + 5, hpBarLength(hpBarSecondMonster, secondSelectedMonster.healthPoint), 20);
      g.endFill();
      //ThirdPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.01, stageProps.height * 0.18, 210, 30);
      g.endFill();

      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.01 + 5, stageProps.height * 0.18 + 5, hpBarLength(hpBarThirdMonster, thirdSelectedMonster.healthPoint), 20);
      g.endFill();
    }, [hpBarFirstMonster, hpBarSecondMonster, hpBarThirdMonster, stageProps.height, stageProps.width])

    const hpBarSecondPlayer = useCallback((g: any) => {
      g.clear();
      //fourthPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.80, stageProps.height * 0.02, 210, 30);
      g.endFill();
      
      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.80 + 5, stageProps.height * 0.02 + 5, hpBarLength(hpBarFirstEnemyMonster, firstSelectedEnemyMonster.healthPoint), 20);
      g.endFill();

      //fivethPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.80, stageProps.height * 0.1, 210, 30);
      g.endFill();

      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.80 + 5, stageProps.height * 0.1 + 5, hpBarLength(hpBarSecondEnemyMonster, secondSelectedEnemyMonster.healthPoint), 20);
      g.endFill();
      //sixthPoke
      g.beginFill(0x000000);
      g.drawRect(stageProps.width * 0.80, stageProps.height * 0.18, 210, 30);
      g.endFill();

      g.beginFill(0x00ff00);
      g.drawRect(stageProps.width * 0.80 + 5, stageProps.height * 0.18 + 5, hpBarLength(hpBarThirdEnemyMonster, thirdSelectedEnemyMonster.healthPoint), 20);
      g.endFill();
    }, [hpBarFirstEnemyMonster, hpBarSecondEnemyMonster, hpBarThirdEnemyMonster, stageProps.height, stageProps.width]);
 
    return (<>
      <Graphics draw={hpBarFirstPlayer} name={"test-battle-pixi-yourHealthPoint"}></Graphics>
      <Graphics draw={hpBarSecondPlayer} name={"test-battle-pixi-enemyHealthPoint"}></Graphics>
    </>)
}

export default HpBars