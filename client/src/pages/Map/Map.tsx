import React from 'react';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';
import { Stage, Sprite } from '@pixi/react';
import mapImage from '../../assets/img/mapImage.jpg';

import './Map.scss';

const Map: React.FC<IBasePage> = (props: IBasePage) => {

    const { setPage } = props;

    const WINV = {
        WIDTH: 16,
        HEIGHT: 9,
        LEFT: 0,
        BOTTOM: 0
    }

    const player = {
        x: 0,
        y: 0,
        velocity: 100
    }

    enum Eelem {
        pyro = 'pyro',
        gydro = 'gydro',
        geo = 'geo',
        anemo = 'anemo',
        nonElem = 'nonElem'
    }

    enum EtileEnv {
        mainTown = 'mainTown',
        localTown = 'localTown',
        dungeon = 'dungeon',
        terrain = 'terrain'
    }

    enum Edir {
        x = 'x',
        y = 'y'
    }

    type Ttile = {
        x: number,
        y: number,
        elem: Eelem,
        isSafe: boolean,
        tileEnv: EtileEnv
    }

    const playerPath: [Edir, number][] = [];
    let canMove: boolean;
    let zoomStep = 0.5;

    const winAspect = 16/9;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const canvasWidth = 3/4 * winWidth;
    const canvasHeigth =   canvasWidth / winAspect;

    const MAP = {
        WIDTH: canvasWidth * 4, //32
        HEIGHT: canvasHeigth * 4, //18
        SRC: mapImage
    }

    const tileSet: Ttile[][] = [];

    const backClickHandler = () => {setPage(PAGES.MAINMENU)}

    return (
        <div id="mapWrapper">
            <Stage className='stage' width={canvasWidth} height={canvasHeigth}>
                <Sprite image={MAP.SRC} x={0} y={0} width={canvasWidth*2} height={canvasHeigth*2} />
            </Stage>
            <Button onClick={backClickHandler} text='Назад' />
            <div id="controlPanel">
                <button className="moveButton" onClick={() => playerPath.push([Edir.x, -1])} >←</button>
                <button className="moveButton" onClick={() => playerPath.push([Edir.y, 1])} >↑</button>
                <button className="moveButton" onClick={() => playerPath.push([Edir.y, -1])} >↓</button>
                <button className="moveButton" onClick={() => playerPath.push([Edir.x, 1])} >→</button>
                <button onClick={() => playerPath.length = 0}>clear path</button>
            </div>
        </div>
    );
}

export default Map;


