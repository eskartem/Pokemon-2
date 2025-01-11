import {useCallback, useContext} from "react";
import { Graphics, Text, Container } from "@pixi/react";
import { TextStyle } from "pixi.js";

import { stageContext } from "../../../assets/context/stage";

const HpBars: React.FC = () => {

  const {hpBarFirstMonster, 
    hpBarSecondMonster, 
    hpBarThirdMonster, 
    hpBarFirstEnemyMonster, 
    hpBarSecondEnemyMonster, 
    hpBarThirdEnemyMonster,
    stageProps, 
    firstSelectedMonster,
    secondSelectedMonster,
    thirdSelectedMonster,
    firstSelectedEnemyMonster,
    secondSelectedEnemyMonster,
    thirdSelectedEnemyMonster 
  } = useContext(stageContext)

  const hpBarLength = (healthPoint: number, maxHealthPoint: number) => {
    let healthPercentage = (healthPoint / maxHealthPoint) * 100
    return (healthPercentage / 100) * 200 
  }

  const textStyle = new TextStyle({
    fill: '#ffffff', // Цвет текста
    stroke: '#000000', // Цвет обводки
    strokeThickness: 2,
  });
      
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
      <Container x={stageProps.width * 0.01 + 5} y={stageProps.height * 0.02}>
        <Text
          text={`${hpBarFirstMonster}`}
          x={8}
          y={3}
          scale={0.7}
          style={textStyle}
        />
      </Container>
      <Container x={stageProps.width * 0.01 + 5} y={stageProps.height * 0.1}>
        <Text
          text={`${hpBarSecondMonster}`}
          x={8}
          y={3}
          scale={0.7}
          style={textStyle}
        />
      </Container>
      <Container x={stageProps.width * 0.01 + 5} y={stageProps.height * 0.18}>
        <Text
          text={`${hpBarThirdMonster}`}
          x={8}
          y={3}
          scale={0.7}
          style={textStyle}
        />
      </Container>
      <Container x={stageProps.width * 0.80 - 10} y={stageProps.height * 0.02}>
        <Text
          text={`${hpBarFirstEnemyMonster}`}
          x={170}
          y={3}
          scale={0.7}
          style={textStyle}
        />
      </Container>
      <Container x={stageProps.width * 0.80 - 10} y={stageProps.height * 0.1}>
        <Text
          text={`${hpBarSecondEnemyMonster}`}
          x={170}
          y={3}
          scale={0.7}
          style={textStyle}
        />
      </Container>
      <Container x={stageProps.width * 0.80 - 10} y={stageProps.height * 0.18}>
        <Text
          text={`${hpBarThirdEnemyMonster}`}
          x={170}
          y={3}
          scale={0.7}
          style={textStyle}
        />
      </Container>
    </>)
}

export default HpBars