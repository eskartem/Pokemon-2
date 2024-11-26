import React, { MouseEvent, useContext, useState } from 'react';
import { Sprite, Stage } from '@pixi/react';
import { StoreContext } from '../../App';
import mapImage from '../../assets/img/mapImage.jpg';
import characterImage from '../../assets/img/character.png';

import { TPoint } from '../../config';
import './Map.scss';

const Map: React.FC = () => {
    const store = useContext(StoreContext);
    let user = store.getUser();

    const WINV = {
        WIDTH: 16,
        HEIGHT: 9,
        LEFT: -16,
        BOTTOM: -9
    } // вынести в config

    const winAspect = 16 / 9;
    const canvasWidth = 1000;
    const canvasHeight = 1 / winAspect * canvasWidth;
    const tileWidth = canvasWidth / WINV.WIDTH;

    const MAP = {
        WIDTH: WINV.WIDTH * 5,
        HEIGHT: WINV.HEIGHT * 5,
        SRC: mapImage
    }

    const [mapPosition, setMapPosition] = useState<TPoint>({ x: WINV.LEFT, y: WINV.BOTTOM });
    const [isCanMove, setCanMove] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
    let dx = 0;
    let dy = 0;

    const mousedown = (event: MouseEvent): void => {
        setCanMove(true);
        setLastMousePosition({ x: event.clientX, y: event.clientY });
    }

    const mouseup = (): void => {
        setCanMove(false);
    }

    const mouseleave = (): void => {
        setCanMove(false);
    }

    const mousemove = (event: MouseEvent): void => {
        if (!isCanMove) return;

        const deltaX = event.clientX - lastMousePosition.x;
        const deltaY = event.clientY - lastMousePosition.y;

        setMapPosition(prevPosition => {
            const newX = prevPosition.x + deltaX;
            const newY = prevPosition.y + deltaY;

            // Ограничение по горизонтали
            const maxX = 0;
            const minX = canvasWidth - MAP.WIDTH * tileWidth;

            // Ограничение по вертикали
            const maxY = 0;
            const minY = canvasHeight - MAP.HEIGHT * tileWidth;

            return {
                x: Math.max(minX, Math.min(maxX, newX)),
                y: Math.max(minY, Math.min(maxY, newY))
            };
        });

        setLastMousePosition({ x: event.clientX, y: event.clientY });
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
                    x={mapPosition.x}
                    y={mapPosition.y}
                    width={MAP.WIDTH * tileWidth}
                    height={MAP.HEIGHT * tileWidth}
                />
                <Sprite
                    image={characterImage}
                    width={tileWidth}
                    height={tileWidth}
                    x={mapPosition.x}
                    y={mapPosition.y}
                />
            </Stage>
        </div>
    )
}

export default Map;