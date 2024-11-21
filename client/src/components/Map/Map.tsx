import React from 'react';
import { StoreContext, ServerContext } from '../../App';
import { TMapPlayer } from '../../services/server/types';
import { TPoint } from '../../config';
import mapImage from '../../assets/img/mapImage.jpg';
import characterImage from '../../assets/img/character.png'; // Добавьте путь к изображению персонажа

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

    return (
    <div className='map'>
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
    </div>)
}

export default Map;