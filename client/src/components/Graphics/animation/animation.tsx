import { AnimatedSprite, Container} from "@pixi/react"
import { fireball1, fireball2, fireball3, fireball4, fireball5, fireball6 } from '../../../assets/battle_animation/allAnim'
import { useContext, useEffect, useRef, useState} from "react";
import { empty} from "../../../assets/img_monster/AllSprites";
import * as PIXI from 'pixi.js'

import { stageContext } from "../../../assets/context/stage";
import { Monsters } from "../../../assets/Monsters/Monster";

interface spritesProps {
    animation: boolean,
    attackedPosition: string
}
const Animation: React.FC<spritesProps> = (props: spritesProps) => {

    const {animation, attackedPosition} = props
    
    const {sQueue, 
        stageProps,
        firstSelectedMonster,
        secondSelectedMonster,
        thirdSelectedMonster,
        firstSelectedEnemyMonster,
        secondSelectedEnemyMonster,
        thirdSelectedEnemyMonster  
    } = useContext(stageContext)

    let currentActiveSide: string;

    const fireballAnim = useRef<PIXI.AnimatedSprite>(null)
    const fireballBlastAnim = useRef<PIXI.AnimatedSprite>(null)

    const Empty = [PIXI.Texture.from(empty)]

    const fireball = [PIXI.Texture.from(fireball1)]
    const fireballBlast = [
        PIXI.Texture.from(fireball2),
        PIXI.Texture.from(fireball3),
        PIXI.Texture.from(fireball4),
        PIXI.Texture.from(fireball5),
        PIXI.Texture.from(fireball6)
    ]

    const FireBallAnimation: React.FC= () => {
        useEffect(() => {
            if(animation) {
                const animated = fireballAnim.current;
                const animatedBlast = fireballBlastAnim.current;
                if ((sQueue[sQueue.length - 1].skill.name === 'Испепеляющий удар' && sQueue[sQueue.length - 1].side === 'yourSide')) {
                    if (animated && animatedBlast) {
                        animated.x = currentActiveSide === 'allied' ? stageProps.width * 0.05 + 20 : stageProps.width * 0.85 - 50;
                        animated.textures = fireball;
                        animated.play()
                        const animation = setInterval(() => {
                            switch(attackedPosition) {
                                case 'firstEnemy':
                                    currentActiveSide === 'allied' ? animated.x += 15 : animated.x -= 15;
                                    break
                                case 'secondEnemy':
                                    currentActiveSide === 'allied' ? animated.x += 15 : animated.x -= 15;
                                    currentActiveSide === 'allied' ? animated.y += 2.5 : animated.y += 2.5;
                                    break
                                case 'thirdEnemy':
                                    currentActiveSide === 'allied' ? animated.x += 15 : animated.x -= 15;
                                    currentActiveSide === 'allied' ? animated.y += 5 : animated.y += 5;
                                    break
                            }
                            const endPoint = currentActiveSide === 'allied' ? stageProps.width * 0.85 - 50 : stageProps.width * 0.05 + 20;
                            if (currentActiveSide === 'allied' ? animated.x >= endPoint : animated.x <= endPoint) {
                                animated.textures = Empty;
                                animated.stop();
                                clearInterval(animation);
                                if (animatedBlast) {
                                    switch(attackedPosition) {
                                        case 'firstEnemy':
                                            animatedBlast.y = stageProps.height * 0.3 - 30
                                            break
                                        case 'secondEnemy':
                                            animatedBlast.y = stageProps.height * 0.51 - 30
                                            break
                                        case 'thirdEnemy':
                                            animatedBlast.y = stageProps.height * 0.72 - 30
                                            break
                                    }
                                    animatedBlast.textures = fireballBlast;
                                    animatedBlast.play();
                                    const checkFrame = () => {
                                        if (animatedBlast.currentFrame === 4) {
                                            animatedBlast.textures = Empty;
                                            animatedBlast.stop();
                                        } else {
                                            requestAnimationFrame(checkFrame);
                                        }
                                    };
                                    checkFrame();
                                }
                            }
                        })
                        return () => clearInterval(animation);
                    }
                }
            }
        }, [sQueue]);
        
        return (
            <Container>
                <Container>
                    <AnimatedSprite //fireball
                        ref={fireballAnim}
                        textures={Empty}
                        animationSpeed={0.1}
                        isPlaying={false}
                        initialFrame={0}
                        x={stageProps.width * 0.05 + 20}
                        y={stageProps.height * 0.3 - 30}
                        scale={[0.5, 0.5]}
                    />
                </Container>
                <Container>
                    <AnimatedSprite //fireball blast
                        ref={fireballBlastAnim}
                        textures={Empty}
                        animationSpeed={0.25}
                        isPlaying={false}
                        initialFrame={0}
                        x={stageProps.width * 0.85 - 50}
                        scale={[0.5, 0.5]}
                    />
                </Container>
            </Container>
        )}

    useEffect(() => {
        let activeMonster: Monsters = sQueue[sQueue.length - 1];
        if(activeMonster.name === firstSelectedMonster.name || activeMonster.name === secondSelectedMonster.name || activeMonster.name === thirdSelectedMonster.name) {
            currentActiveSide = 'allied'
        } else {
            currentActiveSide = 'enemy'
        }

    }, [sQueue])
        
    return(
        <FireBallAnimation />
    )
}

export default Animation