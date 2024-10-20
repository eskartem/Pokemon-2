import Graph, {TGraph} from "../../pages/Map/Graph";

declare global{
    interface Window{
        requestAnimFrame:(callback: FrameRequestCallback)=>  number;
        requestAnimationFrame:(callback: FrameRequestCallback)=>  number;
        webkitRequestAnimationFrame:(callback: FrameRequestCallback)=>  number;
        mozRequestAnimationFrame:(callback: FrameRequestCallback)=>  number;
        oRequestAnimationFrame:(callback: FrameRequestCallback)=>  number;
        msRequestAnimationFrame:(callback: FrameRequestCallback)=>  number;
    }
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (callback) {
            window.setTimeout(callback, 1000 / 500);
        };
})();

const useGraph = (
    renderScene: (FPS: number) => void)
    : [(options: TGraph) => Graph | null, () => void] => {
    let graph: Graph | null = null;

    let FPS = 0;
    let countFPS = 0;
    let timestamp = Date.now();
    let id: number;
    const renderLoop = () => {
        countFPS += 1;
        const currentTimestamp = Date.now();
        if (currentTimestamp - timestamp >= 1000) {
            FPS = countFPS;
            countFPS = 0;
            timestamp = currentTimestamp;
        }
        renderScene(FPS);
        id = window.requestAnimFrame(renderLoop);
    }

    const getGraph = (options: TGraph): Graph | null => {
        graph = new Graph(options);
        renderLoop();
        return graph;
    }

    const cancelGraph = (): void => {
        window.cancelAnimationFrame(id);
        graph = null;
    }

    return [getGraph, cancelGraph];
}

export default useGraph;