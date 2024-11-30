import React, {useContext, useState} from 'react';
import Button from '../../components/Button/Button';
import Map from '../../components/Map/Map';
import Chat from '../../components/Chat/Chat';
import { StoreContext, ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import { TPoint } from '../../config';

import './Game.scss';

const Game: React.FC<IBasePage> = (props: IBasePage) => {

    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    let user = store.getUser()

    const [userPosition, setUserPosition] = useState<TPoint>({ x: user?.x ?? 0, y: user?.y ?? 0 });

    const inventoryClickHandler = () => setPage(PAGES.INVENTORY);
    const marketClickHandler = () => setPage(PAGES.MARKET);
    const battleClickHandler = () => setPage(PAGES.BATTLE);
    const logoutClickHandler = async () => {
        if (await server.logout()) {
            setPage(PAGES.LOGIN);
        }
    }
    const muteButtonHandler = async () => {
        // сделать запрос на сервак по изменению поля is_mute в таблицe users
    }
    
    if (!user) { return ( <div><h1> пользователь не найден </h1></div> )} // закоментировать для работы без бекэнда

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
        <div className="game-wrapper">
            <div>
                <div className='user-panel'>
                    <h1 className='user-panel-nick'> Ник:</h1>
                    <h1 id='test-game-h1-name' className='user-panel-nick'> {user?.name} | </h1>
                </div>
                <div className='button-panel'>
                    <li><Button id='test-game-button-market' onClick={marketClickHandler} text='Рынок' /></li>
                    <li><Button id='test-game-button-inventory' onClick={inventoryClickHandler} text='Инвентарь' /></li>
                    <li><Button id='test-game-button-battle' onClick={battleClickHandler} text='Битва' /></li>
                </div>
                <Chat />
            </div>
            <div>
                <div className='user-resources'>
                    <h1 className='user-resources-coins'>монеты: </h1>
                    <h1 id='test-game-h1-coins' className='user-resources-coins'> {user?.coins} </h1>
                </div>
                <Button id='test-game-button-mute' onClick={muteButtonHandler} text='заглушить' />
                <Button id='test-game-button-logout' onClick={logoutClickHandler} text='разлогиниться' />
                <Map />
                <div className="control-panel">
                    <button id='test-game-button-arrowleft' className="move-button" onClick={() => {}} >←</button>
                    <button id='test-game-button-arrowup' className="move-button" onClick={() => {}} >↑</button>
                    <button id='test-game-button-arrowdown' className="move-button" onClick={() => {}} >↓</button>
                    <button id='test-game-button-arrowright' className="move-button" onClick={() => {}} >→</button>
                    <button id='test-game-button-clearpath' className='clear-button' onClick={() => {}}>clear path</button>
                </div>
            </div>
        </div>
    );
}

export default Game;


