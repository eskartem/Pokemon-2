import { useState } from "react";
import { Text, Container } from "@pixi/react";
import { TextStyle } from "pixi.js";

import { Monsters } from "../../assets/Monsters/Monster";

interface textProps {
    stageProps: {
        width: number,
        height: number,
      },
    activeMonster: Monsters,
    firstSelectedMonster: Monsters,
    secondSelectedMonster: Monsters,
    thirdSelectedMonster: Monsters,
    firstSelectedEnemyMonster: Monsters,
    secondSelectedEnemyMonster: Monsters,
    thirdSelectedEnemyMonster: Monsters,
    hpBarFirstMonster: number, 
    hpBarSecondMonster: number, 
    hpBarThirdMonster: number, 
    hpBarFirstEnemyMonster: number, 
    hpBarSecondEnemyMonster: number, 
    hpBarThirdEnemyMonster: number
}

const Texts: React.FC<textProps> = (props: textProps) => {
    const {
        stageProps,
        activeMonster,
        firstSelectedMonster,
        secondSelectedMonster,
        thirdSelectedMonster,
        firstSelectedEnemyMonster,
        secondSelectedEnemyMonster,
        thirdSelectedEnemyMonster,
        hpBarFirstMonster, 
        hpBarSecondMonster, 
        hpBarThirdMonster, 
        hpBarFirstEnemyMonster, 
        hpBarSecondEnemyMonster, 
        hpBarThirdEnemyMonster
    } = props

    const textStyle = new TextStyle({
        fill: '#ffffff', // Цвет текста
        stroke: '#000000', // Цвет обводки
        strokeThickness: 2,
      });


    return(<>
    <Container x={stageProps.width * 0.5 - 50} y={20} name={"test-battle-pixi-activeMonster"}>
      <Text
        text={`${activeMonster.name}`}
      />
    </Container>
    <Text
        text={`${hpBarFirstMonster}`}
        x={stageProps.width * 0.01 + 7}
        y={stageProps.height * 0.02 + 3}
        scale={0.7}
        style={textStyle}
      />
      <Text
        text={`${hpBarSecondMonster}`}
        x={stageProps.width * 0.01 + 7}
        y={stageProps.height * 0.1 + 3}
        scale={0.7}
        style={textStyle}
      />
      <Text
        text={`${hpBarThirdMonster}`}
        x={stageProps.width * 0.01 + 7}
        y={stageProps.height * 0.18 + 3}
        scale={0.7}
        style={textStyle}
      />
      <Text
        text={`${hpBarFirstEnemyMonster}`}
        x={stageProps.width * 0.99 - 32}
        y={stageProps.height * 0.02 + 3}
        scale={0.7}
        style={textStyle}
      />
      <Text
        text={`${hpBarSecondEnemyMonster}`}
        x={stageProps.width * 0.99 - 32}
        y={stageProps.height * 0.1 + 3}
        scale={0.7}
        style={textStyle}
      />
      <Text
        text={`${hpBarThirdEnemyMonster}`}
        x={stageProps.width * 0.99 - 32}
        y={stageProps.height * 0.18 + 3}
        scale={0.7}
        style={textStyle}
      />
      {hpBarFirstMonster > 0 && (
        <Text 
              text={`${firstSelectedMonster.name}`}
              x={stageProps.width * 0.15 - 120}
              y={stageProps.height * 0.3}
        />
      )}
      {hpBarSecondMonster > 0 && (
        <Text 
            text={`${secondSelectedMonster.name}`}
            x={stageProps.width * 0.15 - 120}
            y={stageProps.height * 0.5}
        />
      )}
      {hpBarThirdMonster > 0 && (
        <Text 
            text={`${thirdSelectedMonster.name}`}
            x={stageProps.width * 0.15 - 120}
            y={stageProps.height * 0.7}
        />
      )}
      {hpBarFirstEnemyMonster > 0 && (
        <Text 
            text={`${firstSelectedEnemyMonster.name}`}
            x={stageProps.width * 0.85}
            y={stageProps.height * 0.3}
        />
      )}
      {hpBarSecondEnemyMonster > 0 && (
        <Text 
            text={`${secondSelectedEnemyMonster.name}`}
            x={stageProps.width * 0.85}
            y={stageProps.height * 0.5}
        />
      )}
      {hpBarThirdEnemyMonster > 0 && (
        <Text 
            text={`${thirdSelectedEnemyMonster.name}`}
            x={stageProps.width * 0.85}
            y={stageProps.height * 0.7}
        />
      )}
    </>)
}

export default Texts