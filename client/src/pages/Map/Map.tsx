import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';
import { Stage, Sprite } from '@pixi/react';
import { StoreContext, ServerContext } from '../../App';
import { TMapPlayer } from '../../services/server/types';
import { TPoint } from '../../config';
import mapImage from '../../assets/img/mapImage.jpg';
import characterImage from '../../assets/img/character.png'; // Добавьте путь к изображению персонажа

import './Map.scss';

const Map: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const store = useContext(StoreContext);
    const server = useContext(ServerContext);
    const [_, setHash] = useState<string>('');

    let user = store.getUser();

    const WINV = {
        WIDTH: 16,
        HEIGHT: 9,
        LEFT: -16,
        BOTTOM: -9
    }

    const winAspect = 16/9;
    const canvasWidth = 3/4 * window.innerWidth;
    const canvasHeight =  canvasWidth / winAspect;
    const tileWidth = canvasWidth / WINV.WIDTH;

    const MAP = {
        WIDTH: WINV.WIDTH * 5,
        HEIGHT: WINV.HEIGHT * 5,
        SRC: mapImage
    }

    const [mapPosition, setMapPosition] = useState<TPoint>({ x: WINV.LEFT * tileWidth, y: WINV.BOTTOM * tileWidth });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [lastMousePosition, setLastMousePosition] = useState<TPoint>({ x: 0, y: 0 });
    const [userPosition, setUserPosition] = useState<TPoint>({ x: user?.x ?? 0, y: user?.y ?? 0 });
    const [players, setPlayers] = useState<TMapPlayer[]>([{name: user?.name ?? '', x: user?.x ?? 0, y: user?.y ?? 0}]);

    const backClickHandler = () => { setPage(PAGES.MAINMENU) }

    const pointerUpHandler = () => {
        setIsDragging(false);
    }

    const pointerLeaveHandler = () => {
        setIsDragging(false);
    }

    const pointerDownHandler = (event: React.PointerEvent) => {
        setIsDragging(true);
        setLastMousePosition({ x: event.clientX, y: event.clientY });
    }

    const pointerMoveHandler = (event: React.PointerEvent) => {
        if (isDragging) {
            const deltaX = event.clientX - lastMousePosition.x;
            const deltaY = event.clientY - lastMousePosition.y;

            setMapPosition(prevPosition => {
                let newX = prevPosition.x + deltaX;
                let newY = prevPosition.y + deltaY;

                // Ограничение по горизонтали
                if (newX > 0) newX = 0;
                if (newX < canvasWidth - MAP.WIDTH * tileWidth) newX = canvasWidth - MAP.WIDTH * tileWidth;

                // Ограничение по вертикали
                if (newY > 0) newY = 0;
                if (newY < canvasHeight - MAP.HEIGHT * tileWidth) newY = canvasHeight - MAP.HEIGHT * tileWidth;

                return { x: newX, y: newY };
            });

            setLastMousePosition({ x: event.clientX, y: event.clientY });
        }
    }

    if (!user) {
        return (<>пользователь не найден</>)
    }


    const moveUser = async (dx: number, dy: number)  => {
        // if ( await server.moveUser(dx, dy) ) { //moveUser не написан
        if (true){
            user = store.getUser();
            if (!user) return
            setUserPosition(prev => {
                return {x: prev.x + dx, y: prev.y + dy};
            });
        }
    }

    return (
        <div id="map-wrapper">
            <Stage
                className='stage'
                width={canvasWidth}
                height={canvasHeight}
                onPointerDown={pointerDownHandler}
                onPointerUp={pointerUpHandler}
                onPointerMove={pointerMoveHandler}
                onPointerLeave={pointerLeaveHandler}
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
                    x={userPosition.x * tileWidth + mapPosition.x}
                    y={userPosition.y * tileWidth + mapPosition.y}
                    width={tileWidth}
                    height={tileWidth}
                />
            </Stage>
            <Button onClick={backClickHandler} text='Назад' />
            <div id="control-panel">
                <button className="move-button" onClick={() => moveUser(-1, 0)}>←</button>
                <button className="move-button" onClick={() => moveUser(0, -1)}>↑</button>
                <button className="move-button" onClick={() => moveUser(0, 1)}>↓</button>
                <button className="move-button" onClick={() => moveUser(1, 0)}>→</button>
                <button onClick={() => {}}>clear path</button>
            </div>
        </div>
    );
}

export default Map;
