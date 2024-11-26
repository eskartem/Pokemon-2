import React, { useContext} from 'react';
import { Sprite, Stage } from '@pixi/react';
import { StoreContext} from '../../App';
import mapImage from '../../assets/img/mapImage.jpg';
import characterImage from '../../assets/img/character.png';

import './Map.scss';

type TMap = {
    callbacks: {
        mousedown: () => void,
         
    }
}

const Map: React.FC = () => {

    const store = useContext(StoreContext);

    let user = store.getUser();

    const WINV = {
        WIDTH: 16,
        HEIGHT: 9,
        LEFT: -16,
        BOTTOM: -9
    } // вынести в config

    const winAspect = 16/9;
    const canvasWidth = 800;
    const canvasHeight =  1 / winAspect * canvasWidth;
    const tileWidth = canvasWidth / WINV.WIDTH;

    let canMove = false;

    const MAP = {
        WIDTH: WINV.WIDTH * 5,
        HEIGHT: WINV.HEIGHT * 5,
        SRC: mapImage
    }

    const mousedown = (): void => {
        canMove = true;
    }

    const mouseup = (): void => {
        canMove = false;
    }

    const mouseleave = (): void => {
        canMove = false;
    }

    const mousemove = (): void => {
        if (!canMove) return;
        
    }

    if (!user) {
        return (<>Карта не загружена. Что-то пошло не так.</>)
    }

    return (
    <div className='map'>
        <Stage
                className='stage'
                width={canvasWidth}
                height={canvasHeight}
                onMouseMove={mousemove}
                onMouseDown={mousedown}
                onMouseUp={mouseup}
                onMouseLeave={mouseleave}
            >
                <Sprite
                    image={MAP.SRC}
                    x={WINV.LEFT}
                    y={WINV.BOTTOM}
                    width={MAP.WIDTH * tileWidth}
                    height={MAP.HEIGHT * tileWidth}
                />
                <Sprite
                    image={characterImage}
                    width={tileWidth}
                    height={tileWidth}
                />
            </Stage>
    </div>)
}

export default Map;