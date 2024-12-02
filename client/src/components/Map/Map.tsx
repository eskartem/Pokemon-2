import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { Sprite, Stage, Graphics } from '@pixi/react';
import { StoreContext, ServerContext } from '../../App';
import mapImage from '../../assets/img/mapImage.jpg';
import characterImage from '../../assets/img/character.png';
import CONFIG, { TPoint } from '../../config';
import { TMap, TMapZone, TUpdateSceneResponse, TGamer } from '../../services/server/types';

import './Map.scss';


const Map: React.FC = () => {
    const { WINV, canvasHeight, canvasWidth, tileSize } = CONFIG;

    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    let user = store.getUser();

    const [gamers, setGamers] = useState<TGamer[]>([]);
    const [MAP, setMAP] = useState<TMap>({ WIDTH: 0, HEIGHT: 0, IMAGE: '' });
    const [mapZones, setMapZones] = useState<TMapZone[]>([]);

    useEffect(() => {
        (async () => {
            const result = await server.getMap();
            if (result) {
                const { MAP: map, mapZones: zones } = result;
                setMAP(map);
                setMapZones(zones);
            }
        })();

        const updateSceneHandler = (result: TUpdateSceneResponse) => {
            // получил игроков на карте
            // среди них нашёл себя по id
            // нарисовал себя, область своей видимости и остальных игроков
        }

        if (user) {
            server.startSceneUpdate(updateSceneHandler);
        }

        return () => {
            server.stopSceneUpdate();
        }

    }, [server]);

    const [mapPosition, setMapPosition] = useState<TPoint>({
        x: -(MAP.WIDTH + WINV.LEFT) * tileSize,
        y: -(MAP.HEIGHT + WINV.BOTTOM) * tileSize
    });
    const [isCanMove, setCanMove] = useState<boolean>(false);
    const [lastMousePosition, setLastMousePosition] = useState<TPoint>({ x: 0, y: 0 });

    if (!user) {
        return (<>Карта не загружена. Что-то пошло не так.</>)
    }

    const mousedown = (event: MouseEvent) => {
        setCanMove(true);
        setLastMousePosition({ x: event.clientX, y: event.clientY });
    }

    const mouseup = () => setCanMove(false);
    const mouseleave = () => setCanMove(false);

    const mousemove = (event: MouseEvent) => {
        if (!isCanMove) return;

        const deltaX = event.clientX - lastMousePosition.x;
        const deltaY = event.clientY - lastMousePosition.y;

        setMapPosition(prevPosition => {
            const newX = prevPosition.x + deltaX;
            const newY = prevPosition.y + deltaY;

            // Ограничение по горизонтали
            const maxX = 0;
            const minX = canvasWidth - MAP.WIDTH * tileSize;

            // Ограничение по вертикали
            const maxY = 0;
            const minY = canvasHeight - MAP.HEIGHT * tileSize;
            console.log(newY);

            return {
                x: Math.max(minX, Math.min(maxX, newX)),
                y: Math.max(minY, Math.min(maxY, newY))
            };
        });
        setLastMousePosition({ x: event.clientX, y: event.clientY });
    }

    return (
        <div className='map'>
            <Stage // канвас
                className='stage'
                width={canvasWidth}
                height={canvasHeight}
                onMouseMove={mousemove}
                onMouseDown={mousedown}
                onMouseUp={mouseup}
                onMouseLeave={mouseleave}
            >
                <Sprite  // карта
                    image={mapImage}
                    x={mapPosition.x}
                    y={mapPosition.y}
                    width={MAP.WIDTH * tileSize}
                    height={MAP.HEIGHT * tileSize}
                />
                 {/* <Graphics // зоны
                    draw={(g) => {
                        g.clear();
                        mapZones.forEach(zone => {
                            let color: string;
                            if (zone.type === 'town') color = '0xAAAAAA';
                            else color = '0x111111';
                            g.beginFill(color);
                            g.drawRect(
                                mapPosition.x + zone.x * tileSize,
                                mapPosition.y + zone.y * tileSize,
                                zone.width * tileSize,
                                zone.height * tileSize
                            );
                            g.endFill();
                        });
                    }}
                /> */}
                {/* <Sprite // гг
                    image={characterImage}
                    width={tileSize}
                    height={tileSize}
                    x={mapPosition.x}
                    y={mapPosition.y}
                /> */}
            </Stage>
        </div>
    )
}

export default Map;
