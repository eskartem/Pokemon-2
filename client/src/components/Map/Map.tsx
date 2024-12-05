import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { Sprite, Stage, Graphics, Text, Container } from '@pixi/react';
import { StoreContext, ServerContext } from '../../App';
import mapImage from '../../assets/img/mapImage.jpg';
import playerImage from '../../assets/img/player_map_icon.png';
import characterImage from '../../assets/img/player.png';
import CONFIG, { TPoint } from '../../config';
import { TMap, TMapZone, TUpdateSceneResponse, TGamer, EZones } from '../../services/server/types';

import './Map.scss';
import { TextStyle } from 'pixi.js';


const Map: React.FC = () => {
    const { WINV, tileSize} = CONFIG;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const user = store.getUser();

    const [userGamer, setUserIngame] = useState<TGamer>();
    const [gamers, setGamers] = useState<TGamer[]>([]);
    const [MAP, setMAP] = useState<TMap>({ WIDTH: 0, HEIGHT: 0, IMAGE: '' });
    const [mapZones, setMapZones] = useState<TMapZone[]>([]);
    const [mapPosition, setMapPosition] = useState<TPoint>({ x: 0, y: 0 });
    const [isCanMove, setCanMove] = useState<boolean>(false);
    const [lastMousePosition, setLastMousePosition] = useState<TPoint>({ x: 0, y: 0 });

    const canvasHeight = WINV.HEIGHT * tileSize;
    const canvasWidth = WINV.WIDTH * tileSize;

    useEffect(() => {
        
        (async () => { // получаем карту, зоны и центрируем карты по игроку
            const result = await server.getMap();
            if (result) {
                const { MAP: map, mapZones: zones } = result;
                setMAP(map);
                setMapZones(zones);
                if (!user) return;
                setMapPosition({
                    x: -(user.x - WINV.WIDTH / 2) * tileSize,
                    y: -(user.y - WINV.HEIGHT / 2) * tileSize
                });
            }
        })();

        const updateSceneHandler = (result: TUpdateSceneResponse) => { // получаю массив игроков и выдергиваю себя из него
            if (!result.gamers) return;

            let gamers = result.gamers;
            
            if (!user) return;
            
            const userIngame = gamers.find(item => item.id === user?.id);
            const index = gamers.findIndex(item => item.id === user?.id);
            if (index === -1) return;
            gamers.splice(index, 1);
            setUserIngame(userIngame);
            setGamers(gamers);
        }

        if (user) {
            server.startSceneUpdate(updateSceneHandler);
        }

        return () => {
            server.stopSceneUpdate();
        }
        
    }, [server, store, user]);


    if (!user || !userGamer) {
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
                <Graphics // зоны на карте
                    draw={(g) => {
                        g.clear();
                        mapZones.forEach(zone => {
                            let color: string = '0x111111';
                            if (zone.type === EZones.town) color = '0xAAAAAA';
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
                />
                {gamers.map( (gamer, index) => { // другие пользователи
                    return (
                    <Container  key={index} >
                        <Sprite // иконки на карте других пользователей
                        image={playerImage} // надо добавить путь к картинке в базу данных к каждому пользователю
                        width={tileSize}
                        height={tileSize}
                        x={mapPosition.x + gamer.x * tileSize}
                        y={mapPosition.y + gamer.y * tileSize}
                        />
                        <Text // ник 
                            text={gamer.name}
                            x={mapPosition.x + gamer.x * tileSize - tileSize/2}
                            y={mapPosition.y + gamer.y * tileSize - tileSize/2}
                            style={
                                new TextStyle({
                                  align: 'center',
                                  fontSize: 10,
                                })
                            }
                        />
                    </Container>)
                })}
                <Container>
                    <Sprite // гг картинка
                        image={characterImage}
                        width={tileSize}
                        height={tileSize}
                        x={mapPosition.x + userGamer.x * tileSize}
                        y={mapPosition.y + userGamer.y * tileSize}
                    />
                    <Text // ник гг
                        text={userGamer.name}
                        x={mapPosition.x + userGamer.x * tileSize - tileSize/2}
                        y={mapPosition.y + userGamer.y * tileSize - tileSize/2}
                        style={
                            new TextStyle({
                              fontSize: 10,
                              fill: ['#ff0000'],
                            })
                        }
                    />
                </Container>
            </Stage>
        </div>
    )
}

export default Map;
