import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { Sprite, Stage, Graphics, Text, Container } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { TMap, TMapZone, TUpdateSceneResponse, TGamer, EZones, EUserStatus } from '../../services/server/types';
import { StoreContext, ServerContext } from '../../App';
import CONFIG, { EDIRECTION, TPoint } from '../../config';
import Button from '../Button/Button';
import mapImage from '../../assets/img/map_tined.png';
import playerImage from '../../assets/img/player_map_icon.png';
import characterImage from '../../assets/img/player.png';
import boatImage from '../../assets/img/boat.png';

import './Map.scss';

const Map: React.FC = () => {
    const { WINV, tileSize, fovDistance } = CONFIG;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const user = store.getUser();
    const mapInfo = store.getMapInfo();

    const [userOnMap, setUserOnMap] = useState<TGamer | null>(null);
    const [gamers, setGamers] = useState<TGamer[]>([]);
    const [map, setMap] = useState<TMap | null>(mapInfo?.MAP || null);
    const [mapZones, setMapZones] = useState<TMapZone[]>(mapInfo?.mapZones || []);
    const [mapPosition, setMapPosition] = useState<TPoint>({ x: 0, y: 0 });
    const [isCanMove, setCanMove] = useState<boolean>(false);
    const [lastMousePosition, setLastMousePosition] = useState<TPoint>({ x: 0, y: 0 });

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    //const canvasWidth = WINV.WIDTH * tileSize;
    //const canvasHeight = WINV.HEIGHT * tileSize;

    const getCurrentZone = (currenGamer: TGamer) => {
        if (!userOnMap) return ;
        for (let i=0; i <= mapZones.length; i++) {
            const zone = mapZones[i];
            const result = (currenGamer.x >= zone.x && currenGamer.y >= zone.y
                && currenGamer.x < (zone.x + zone.width)
                && currenGamer.y < (zone.y + zone.height)
            );
            if (zone.type === EZones.town && result) {
                return zone.name;
            }
            if (zone.type === EZones.chillzone && result) {
                return zone.name;
            }
            if (result) return zone.name;
        }
        return 'не найдено';
    }

    const goToUser = () => {

        if (!userOnMap || !map) return;
        
        let x = -(userOnMap.x - WINV.WIDTH / 2) * tileSize;
        let y = -(userOnMap.y - WINV.HEIGHT / 2) * tileSize;

        // Ограничение по горизонтали
        const maxX = 0;
        const minX = canvasWidth - map.WIDTH * tileSize;

        // Ограничение по вертикали
        const maxY = 0;
        const minY = canvasHeight - map.HEIGHT * tileSize;

        x = Math.max(minX, Math.min(maxX, x));
        y = Math.max(minY, Math.min(maxY, y));
        setMapPosition({x, y});
    }

    const keyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                moveUser(EDIRECTION.UP);
                break;
            case 'ArrowDown':
                moveUser(EDIRECTION.DOWN);
                break;
            case 'ArrowLeft':
                moveUser(EDIRECTION.LEFT);    
                break;
            case 'ArrowRight':
                moveUser(EDIRECTION.RIGHT);
                break;
            case 'w':
                moveUser(EDIRECTION.UP);
                break;
            case 's':
                moveUser(EDIRECTION.DOWN);
                break;
            case 'a':
                moveUser(EDIRECTION.LEFT);    
                break;
            case 'd':
                moveUser(EDIRECTION.RIGHT);
                break;
            default:
                break;
        }
    };

    const moveUser = async (direction: EDIRECTION) => {
        server.moveUser(direction);
    }

    const mousedown = (event: MouseEvent) => {
        setCanMove(true);
        setLastMousePosition({ x: event.clientX, y: event.clientY });
    }

    const mouseup = () => setCanMove(false);
    const mouseleave = () => setCanMove(false);

    const mousemove = (event: MouseEvent) => {
        if (!isCanMove || !map) return;

        const deltaX = event.clientX - lastMousePosition.x;
        const deltaY = event.clientY - lastMousePosition.y;

        setMapPosition(prevPosition => {
            const newX = prevPosition.x + deltaX;
            const newY = prevPosition.y + deltaY;
        
            // Ограничение по горизонтали
            const maxX = 0;
            const minX = canvasWidth - map.WIDTH * tileSize;
        
            // Ограничение по вертикали
            const maxY = 0;
            const minY = canvasHeight - map.HEIGHT * tileSize;
        
            return {
                x: Math.max(minX, Math.min(maxX, newX)),
                y: Math.max(minY, Math.min(maxY, newY))
                };
            });
        setLastMousePosition({ x: event.clientX, y: event.clientY });
    }

    useEffect(() => {

        const updateSceneHandler = (result: TUpdateSceneResponse) => { // получаю массив игроков и выдергиваю себя из него
            if (!result.gamers) return;
            let gamers = result.gamers;
            if (!user) return;
            const userHimself = gamers.find(item => item.id === user?.id);
            if (!userHimself) return;
            setUserOnMap(userHimself);
            const gamersAround = gamers.filter(gamer => { // выбираю пользователей только в поле зрения
                return ( 
                    (Math.abs(userHimself.x - gamer.x) < (fovDistance+1)) && 
                    (Math.abs(userHimself.y - gamer.y) < (fovDistance+1)) &&
                    (user.id != gamer.id)
                )
            });
            setGamers(gamersAround);
        }

        const getMap = async () => { // получаем карту, зоны и центрируем ее
            const result = await server.getMap();
            if (result) {
                store.setMapInfo(result);
                const { MAP: mapParams, mapZones: zones } = result;
                setMap(mapParams);
                setMapZones(zones);
                console.log(result)
                setMapPosition({x: -mapParams.WIDTH/2.6 * tileSize, y: -mapParams.HEIGHT/2.2  * tileSize});
            }
        };

        if (!mapInfo) getMap();
        
        if (user) {
            server.startSceneUpdate(updateSceneHandler);
        }

        window.addEventListener('keydown', keyDown);
        
        return () => {
            server.stopSceneUpdate();
            window.removeEventListener('keydown', keyDown);
        }
        
    }, [server, store, user]);

    if (!user || !userOnMap || !map) {
        return (<>Карта не загружена. Что-то пошло не так.</>)
    }

    return (
        <div className='map'>
            <Stage // само окно-канвас
                className='stage'
                width={canvasWidth}
                height={canvasHeight}
                onMouseMove={mousemove}
                onMouseDown={mousedown}
                onMouseUp={mouseup}
                onMouseLeave={mouseleave}
            >
                <Sprite // карта
                    image={mapImage}
                    x={mapPosition.x}
                    y={mapPosition.y}
                    width={map.WIDTH * tileSize}
                    height={map.HEIGHT * tileSize}
                />
                <Graphics // сетка на карте
                    draw={(g) => {
                            g.clear();
                            g.lineStyle(1, 0x333333, 0.3);
                            for (let x = 0; x <= map.WIDTH; x++) {
                                g.moveTo(mapPosition.x + x * tileSize, mapPosition.y);
                                g.lineTo(mapPosition.x + x * tileSize, mapPosition.y + map.HEIGHT * tileSize);
                            }
                            for (let y = 0; y <= map.HEIGHT; y++) {
                                g.moveTo(mapPosition.x, mapPosition.y + y * tileSize);
                                g.lineTo(mapPosition.x + map.WIDTH * tileSize, mapPosition.y + y * tileSize);
                            }
                        }
                    }
                />
                <Graphics // зоны на карте
                    draw={(g) => {
                        g.clear();
                        mapZones.forEach(zone => {
                            if (zone.type === EZones.dungeon) return;
                            let color = '0xff0000';
                            if (zone.type === EZones.town) color = '0xFFFFFF';
                            if (zone.type === EZones.chillzone) color = '0x3fe047';
                            g.beginFill(color, 0.2);
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
                    let color = '#0000ff';
                    switch (gamer.status){
                        case EUserStatus.offline:
                            color = '#ffffff';
                            break;
                        case EUserStatus.scout:
                            color = '#00ff00';
                            break;
                        case EUserStatus.fight:
                            color = '#ff0000';
                            break;
                    }
                    return (
                        <Container  key={index} >
                            <Sprite // иконки на карте других пользователей
                            image={playerImage} // надо добавить путь к картинке в базу данных к каждому пользователю
                            width={tileSize}
                            height={tileSize}
                            x={mapPosition.x + gamer.x * tileSize}
                            y={mapPosition.y + gamer.y * tileSize}
                            />
                            { (getCurrentZone(gamer) === 'озеро' && // лодка, если пользователь в озере
                                <Sprite 
                                    image={boatImage}
                                    width={tileSize*1.5}
                                    height={tileSize}
                                    x={mapPosition.x + gamer.x * tileSize - tileSize/3}
                                    y={mapPosition.y + gamer.y * tileSize + tileSize/2}
                                />
                            ) }
                            <Text // ник 
                                text={gamer.name}
                                x={mapPosition.x + gamer.x * tileSize - (gamer.name.length * tileSize/11.42)}
                                y={mapPosition.y + gamer.y * tileSize - tileSize/2}
                                style={
                                    new TextStyle({
                                        fontSize: 16,
                                        fill: [color],
                                        stroke: 1,
                                        strokeThickness: 3
                                    })
                                }
                            />
                        </Container>)
                    })
                }
                <Container>
                    <Graphics // поле зрения игрока
                        draw={(g) => {
                            g.clear();
                                g.beginFill('0xffffff', 0.2);
                                g.drawRect(
                                    (userOnMap.x - (fovDistance)) * tileSize + mapPosition.x,
                                    (userOnMap.y - (fovDistance)) * tileSize + mapPosition.y,
                                    (fovDistance*2+1)*tileSize,
                                    (fovDistance*2+1)*tileSize
                                );
                                g.endFill();
                        }}
                    />
                    <Sprite // гг картинка
                        image={characterImage}
                        width={tileSize}
                        height={tileSize}
                        x={mapPosition.x + userOnMap.x * tileSize}
                        y={mapPosition.y + userOnMap.y * tileSize}
                    />
                    { (getCurrentZone(userOnMap) === 'озеро' && // лодка, если пользователь в озере
                    <Sprite 
                        image={boatImage}
                        width={tileSize*1.5}
                        height={tileSize}
                        x={mapPosition.x + userOnMap.x * tileSize - tileSize/3}
                        y={mapPosition.y + userOnMap.y * tileSize + tileSize/2}
                    />
                    ) }
                    <Text // ник гг
                        text={userOnMap.name}
                        x={mapPosition.x + userOnMap.x * tileSize - (userOnMap.name.length * 3)}
                        y={mapPosition.y + userOnMap.y * tileSize - tileSize/2}
                        style={
                            new TextStyle({
                                fontSize: 16, 
                                fill: ['#00ff00'], 
                                stroke: 1, 
                                strokeThickness: 3
                            })
                        }
                    />
                </Container>
                <Text // зона нахождения игрока
                    text={`Вы находитесь в зоне: ${getCurrentZone(userOnMap)}`}
                    x={tileSize/2}
                    y={tileSize/2}
                    style={
                        new TextStyle({
                            fontSize: 20,
                            strokeThickness: 1,
                            fill: ['#000000'], 
                        })
                    }
                />
            </Stage>
            <div className="control-panel">
                <Button id='test-game-button-arrowleft' className="move-button" 
                onClick={() => moveUser(EDIRECTION.LEFT)} text={'←'} />
                <div className='vertical-move-buttons'>
                    <Button id='test-game-button-arrowup' className="move-button" 
                    onClick={() => moveUser(EDIRECTION.UP)} text={'↑'} />
                    <Button id='test-game-button-arrowdown' className="move-button" 
                    onClick={() => moveUser(EDIRECTION.DOWN)} text={'↓'} />
                </div>
                <Button id='test-game-button-arrowright' className="move-button" 
                onClick={() => moveUser(EDIRECTION.RIGHT)} text={'→'} />
                <div >
                    <Button className='' onClick={goToUser} text={"к себе"}/>
                </div>
            </div>
        </div>
    )
}

export default Map;
