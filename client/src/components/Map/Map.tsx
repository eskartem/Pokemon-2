import React, { useContext, useState } from 'react';
import { StoreContext, ServerContext } from '../../App';
import { TMapPlayer } from '../../services/server/types';
import { TPoint } from '../../config';
import mapImage from '../../assets/img/mapImage.jpg';
import characterImage from '../../assets/img/character.png'; // Добавить путь к изображению персонажа
import { Sprite, Stage } from '@pixi/react';

import './Map.scss';

const Map: React.FC = () => {

    const store = useContext(StoreContext);
    const server = useContext(ServerContext);

    let user = store.getUser();

    const WINV = {
        WIDTH: 16,
        HEIGHT: 9,
        LEFT: -16,
        BOTTOM: -9
    }

    const winAspect = 16/9;
    const canvasWidth = 800;
    const canvasHeight =  1 / winAspect * canvasWidth;
    const tileWidth = canvasWidth / WINV.WIDTH;

    const MAP = {
        WIDTH: WINV.WIDTH * 5,
        HEIGHT: WINV.HEIGHT * 5,
        SRC: mapImage
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
                // onPointerDown={pointerDownHandler}
                // onPointerUp={pointerUpHandler}
                // onPointerMove={pointerMoveHandler}
                // onPointerLeave={pointerLeaveHandler}
            >
                <Sprite
                    image={MAP.SRC}
                    // x={mapPosition.x}
                    // y={mapPosition.y}
                    width={MAP.WIDTH * tileWidth}
                    height={MAP.HEIGHT * tileWidth}
                />
                <Sprite
                    image={characterImage}
                    // x={userPosition.x * tileWidth + mapPosition.x}
                    // y={userPosition.y * tileWidth + mapPosition.y}
                    width={tileWidth}
                    height={tileWidth}
                />
            </Stage>
    </div>)
}

export default Map;