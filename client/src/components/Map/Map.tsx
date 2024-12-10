import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { Sprite, Stage, Graphics, Text, Container } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { StoreContext, ServerContext } from '../../App';
import CONFIG, { EDIRECTION, TPoint } from '../../config';
import { TMap, TMapZone, TUpdateSceneResponse, TGamer, EZones, EStatus } from '../../services/server/types';
import Button from '../Button/Button';
import mapImage from '../../assets/img/map.jpg';
import playerImage from '../../assets/img/player_map_icon.png';
import characterImage from '../../assets/img/player.png';

import './Map.scss';


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

    const goToUser = () => {
        if (!userGamer) return;
        let x = -(userGamer.x - WINV.WIDTH / 2) * tileSize;
        let y = -(userGamer.y - WINV.HEIGHT / 2) * tileSize;

        // Ограничение по горизонтали
        const maxX = 0;
        const minX = canvasWidth - MAP.WIDTH * tileSize;

        // Ограничение по вертикали
        const maxY = 0;
        const minY = canvasHeight - MAP.HEIGHT * tileSize;

        x = Math.max(minX, Math.min(maxX, x));
        y = Math.max(minY, Math.min(maxY, y));
        setMapPosition({x, y});
    }

    useEffect(() => {

        const keyDownHandler = (event: KeyboardEvent) => {
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

        window.addEventListener('keydown', keyDownHandler);
        
        (async () => { // получаем карту, зоны и центрируем карты по игроку
            const result = await server.getMap();
            if (result) {
                const { MAP: map, mapZones: zones } = result;
                setMAP(map);
                setMapZones(zones);
                if (!user) return;
                goToUser();
            }
        })();

        const updateSceneHandler = (result: TUpdateSceneResponse) => { // получаю массив игроков и выдергиваю себя из него
            if (!result.gamers) return;

            let gamers = result.gamers;
            
            if (!user) return;
            
            const userIngame = gamers.find(item => item.id === user?.id);
            if (!userIngame) return;
            
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
            window.removeEventListener('keydown', keyDownHandler);
        }
        
    }, [server, store, user]);

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

    if (!user || !userGamer) {
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
                    width={MAP.WIDTH * tileSize}
                    height={MAP.HEIGHT * tileSize}
                />
                <Graphics // зоны на карте
                    draw={(g) => {
                        g.clear();
                        mapZones.forEach(zone => {
                            if (zone.type === EZones.dungeon) return;
                            let color = '0xff0000';
                            if (zone.type === EZones.town) color = '0xAAAAAA';
                            if (zone.type === EZones.chillzone) color = '0xf49ff0';
                            g.beginFill(color, 0.5);
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
                        case EStatus.offline:
                            color = '#ffffff';
                            break;
                        case EStatus.scout:
                            color = '#00ff00';
                            break;
                        case EStatus.fight:
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
                            <Text // ник 
                                text={gamer.name}
                                x={mapPosition.x + gamer.x * tileSize - tileSize/2}
                                y={mapPosition.y + gamer.y * tileSize - tileSize/2}
                                style={
                                    new TextStyle({
                                        align: 'center',
                                        fontSize: 12,
                                        fill: [color],
                                        stroke: 3,
                                        strokeThickness: 2
                                    })
                                }
                            />
                        </Container>)
                    })
                }
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
                                align: 'center',
                                fontSize: 12, 
                                fill: ['#00ff00'], 
                                stroke: 3, 
                                strokeThickness: 2
                            })
                        }
                    />
                </Container>
                <Text // зона нахождения игрока
                    text={`Вы находитесь `}
                    x={tileSize/2}
                    y={tileSize/2}
                    style={
                        new TextStyle({
                            fontSize: 16,
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
                    <Button id='test-game-button-arrowup' className="move-button" onClick={() => moveUser(EDIRECTION.UP)} text={'↑'} />
                    <Button id='test-game-button-arrowdown' className="move-button" onClick={() => moveUser(EDIRECTION.DOWN)} text={'↓'} />
                </div>
                <Button id='test-game-button-arrowright' className="move-button" onClick={() => moveUser(EDIRECTION.RIGHT)} text={'→'} />
                <div >
                    <Button className='' onClick={goToUser} text={"к себе"}/>
                </div>
            </div>
        </div>
    )
}

export default Map;
