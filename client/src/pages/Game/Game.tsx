import React, {useContext, useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import Map from '../../components/Map/Map';
import Chat from '../../components/Chat/Chat';
import { StoreContext, ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import { EDIRECTION } from '../../config';

import './Game.scss';

const Game: React.FC<IBasePage> = (props: IBasePage) => {

    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    let user = store.getUser();

    const moveUser = async (direction: EDIRECTION) => {
        server.moveUser(direction);
    }

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
                default:
                    break;
            }
        };

        window.addEventListener('keydown', keyDownHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
        
    }, []);
    
    if (!user) { return ( <div><h1> Что-то пошло не так. </h1></div> );} // закоментировать для работы без бекэнда

    return (
        <div className="game-wrapper" >
            <div>
                <div className='user-panel'>
                    <h1 className='user-panel-nick'> Ник:</h1>
                    <h1 id='test-game-h1-name' className='user-panel-nick'> {user?.name} | </h1>
                </div>
                <div className='button-panel'>
                    <Button id='test-game-button-inventory' onClick={inventoryClickHandler} text='Инвентарь' />
                    <Button id='test-game-button-market' onClick={marketClickHandler} text='Рынок' />
                    <Button id='test-game-button-battle' onClick={battleClickHandler} text='Битва' />
                    <li><Button id='test-game-button-mute' onClick={muteButtonHandler} text='заглушить' />
                    <Button id='test-game-button-logout' onClick={logoutClickHandler} text='Выйти' /></li>
                </div>
                <Chat />
            </div>
            <div>
                <div className='user-resources'>
                    <h1 className='user-resources-coins'>монеты: </h1>
                    <h1 id='test-game-h1-coins' className='user-resources-coins'> {user?.coins} </h1>
                </div>
                <Map />
                <div className="control-panel">
                    <Button id='test-game-button-arrowleft' className="move-button" 
                    onClick={() => moveUser(EDIRECTION.LEFT)} text={'←'} />
                    <div className='vertical-move-buttons'>
                        <Button id='test-game-button-arrowup' className="move-button" onClick={() => moveUser(EDIRECTION.UP)} text={'↑'} />
                        <Button id='test-game-button-arrowdown' className="move-button" onClick={() => moveUser(EDIRECTION.DOWN)} text={'↓'} />
                    </div>
                    <Button id='test-game-button-arrowright' className="move-button" onClick={() => moveUser(EDIRECTION.RIGHT)} text={'→'} />
                </div>
            </div>
        </div>
    );
}

export default Game;


