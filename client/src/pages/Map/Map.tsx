import React, {useEffect} from 'react';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';
import Graph from './Graph';
import useGraph from '../../services/canvas/useGraph';

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
    
    let graph: Graph | null = null;

    const winAspect = 16/9;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const canvasWidth = 3/4 * winWidth;
    const canvasHeigth =   canvasWidth / winAspect;

    const MAP = {
        WIDTH: canvasWidth * 4, //32
        HEIGHT: canvasHeigth * 4, //18
        SRC: ''
    }

    const tileSet: Ttile[][] = [];

    const [getGraph, cancelGraph] = useGraph(renderScene);

    const wheelHandler = (event: WheelEvent): void => {
        // const delta = (event.deltaY > 0) ? -zoomStep : zoomStep;
        // WINV.HEIGHT += delta;
        // WINV.WIDTH += delta;
        // WINV.LEFT -= delta / 2;
        // WINV.BOTTOM -= delta / 2;
        // zoomStep = WINV.WIDTH/10;
        // renderScene();
    }

    const mouseupHandler = (): void => {
        canMove = false;
    }

    const mousedownHandler = (event: MouseEvent): void => {
        event.preventDefault();
        canMove = true;
    }

    const mousemoveHandler = (event: MouseEvent): void => {
        if (!graph) return;
        if (canMove) {
            const sx = graph.sx(event.movementX);
            const sy = graph.sy(event.movementY);
            WINV.LEFT -= sx;
            WINV.BOTTOM -= sy;
            if (WINV.LEFT < 0 || WINV.LEFT > WINV.WIDTH) WINV.LEFT += sx;
            if (WINV.BOTTOM < 0 || WINV.BOTTOM > WINV.HEIGHT) WINV.BOTTOM += sy;
            renderScene();
        }
    }

    const mouseoutHandler = (): void => {
        canMove = false;
    }

    const movePlayer = (dir: Edir, delta: number): void => {
        let dirEdge: number;

        if (dir === Edir.x) {dirEdge = WINV.WIDTH * 2 - 1}
        else { 
            if (dir === Edir.y) {dirEdge = WINV.HEIGHT * 2 - 1}
            else return;
        }

        if ((player[dir] + delta > dirEdge) || (player[dir] + delta < 0)) return;
        player[dir] += delta;
    }

    const drawPlayer = () => {
        if (!graph) return;
        graph.point(player.x + 0.5, player.y + 0.5, 'cyan', 20);
    }

    const drawTiles = (): void => {
        if (!graph) return;

        for (let x = 0; x < tileSet.length; x++) {
            for (let y = 0; y < tileSet[0].length; y++){
                const tile: Ttile = tileSet[x][y];
                if (tile.elem === Eelem.geo) {graph.square(tile.x, tile.y, 1, 'green')}
                if (tile.elem === Eelem.anemo) {graph.square(tile.x, tile.y, 1, 'lime')}
                if (tile.elem === Eelem.pyro) {graph.square(tile.x, tile.y, 1, 'red')}
                if (tile.elem === Eelem.gydro) {graph.square(tile.x, tile.y, 1, 'blue')}
            }
        } 

        for (let i = 0; i < WINV.WIDTH + WINV.LEFT; i += 1) {
            graph.line(i, WINV.BOTTOM, i, WINV.HEIGHT + WINV.BOTTOM, 'black', 1);
        }
        for (let i = 0; i < WINV.HEIGHT + WINV.BOTTOM; i += 1) {
            graph.line(WINV.LEFT, i, WINV.WIDTH + WINV.LEFT, i, 'black', 1);
        }
    }

    const drawImage = (): void => {
        if (!graph) return;
        const mapImage = new Image(MAP.WIDTH, MAP.HEIGHT);
        mapImage.src = MAP.SRC;
        mapImage.onload = (): void => {
            if (!graph) return;
            graph.ctxV.drawImage(mapImage, WINV.LEFT, WINV.BOTTOM);
        };
    }

    const drawPath = (): void => {
        if (playerPath.length === 0) return;
        if (!graph) return;

        const x = player.x;
        const y = player.y;

        for (let i = 0; i <= playerPath.length; i++) {
            const data = playerPath[i];
            if (data[0] == Edir.x) {
                graph.square(x + data[1], y, 1, 'grey');
                return;
            }
            if (data[0] == Edir.y) {
                graph.square(x, y + data[1], 1, 'grey');
                return;
            }
        }

    }

    function renderScene() : void {
        if (!graph) return;
        graph.fill('white');
        // drawImage();
        drawTiles();
        drawPath();
        drawPlayer();

        setTimeout(
            () => {
                if (playerPath.length == 0) return;
                const turnData = playerPath.pop();
                if (!turnData) return;
                movePlayer(turnData[0], turnData[1]);
            }, 10 * player.velocity)
        
        graph.renderFrame();
    }

    const initTileSet = (): void => {
        for (let y = 0; y < WINV.HEIGHT*2; y++) {
            const row: Ttile[] = [];
            for (let x = 0; x < WINV.WIDTH*2; x++){
                let elem = Eelem.geo;

                if (((x-30)**2 + y*y) <= 25) {
                    elem = Eelem.anemo;
                }
                if ((x*x + y*y) <= 25 || ((x-30)**2 + (y-16)**2) <= 25) {
                    elem = Eelem.pyro;
                }
                if ((x*x + (y-18)**2) <= 25) {
                    elem = Eelem.gydro;
                }
                
                row.push({x, y, elem, isSafe: false, tileEnv: EtileEnv.terrain})
            }
            tileSet.push(row);  
        }
    };

    useEffect(() => {
        graph = getGraph({
            id: 'canvas',
            WIN: WINV,  
            width: canvasWidth,
            height: canvasHeigth,
            callbacks: {
                wheel: wheelHandler,
                mousemove: mousemoveHandler,
                mouseup: mouseupHandler,
                mousedown: mousedownHandler,
                mouseout: mouseoutHandler,
            }
        });

        initTileSet();

        return () => {
            cancelGraph();
        }
    })

    const backClickHandler = () => {setPage(PAGES.MAINMENU)}

    return (
        <div id="mapWrapper">
            <canvas id="canvas"></canvas>
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


