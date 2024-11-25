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
                    <h1> Ник: {user?.name} </h1>
                    <div className='user-resources'>
                        <h1 className='resources-text'>монеты: {user?.coins} |</h1>
                    </div>
                </div>
                <div className='button-panel'>
                    <Button onClick={inventoryClickHandler} text='Инвентарь' />
                    <Button onClick={marketClickHandler} text='Рынок' />
                    <Button onClick={battleClickHandler} text='Битва' />
                    <Button onClick={logoutClickHandler} text='разлогиниться' />
                    <Button onClick={muteButtonHandler} text='заглушить' />
                </div>
                <Map />
                <div className="control-panel">
                    <button className="move-button" onClick={() => {}} >←</button>
                    <button className="move-button" onClick={() => {}} >↑</button>
                    <button className="move-button" onClick={() => {}} >↓</button>
                    <button className="move-button" onClick={() => {}} >→</button>
                    <button onClick={() => {}}>clear path</button>
                </div>
            </div>
            <Chat />
        </div>
    );
}

export default Game;


