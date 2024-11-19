import React, {useContext} from 'react';
import Button from '../../components/Button/Button';
import Map from '../../components/Map/Map';
import Chat from '../../components/Chat/Chat';
import { StoreContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';

import './Game.scss';

const Game: React.FC<IBasePage> = (props: IBasePage) => {

    const { setPage } = props;

    const store = useContext(StoreContext);
    const user = store.getUser()

    const settingsClickHandler = () => setPage(PAGES.SETTINGS);
    const inventoryClickHandler = () => setPage(PAGES.INVENTORY);
    const marketClickHandler = () => setPage(PAGES.MARKET);
    const battleClickHandler = () => setPage(PAGES.BATTLE);
    
    if (!user) { return ( <div><h1> пользователь не найден </h1></div> )} // закоментировать для работы без бекэнда

    return (
        <div className="game-wrapper">
            <div>
                <div className='user-panel'>
                    <h1> Ник: {user?.name} </h1>
                    <div className='user-resources'>
                        <h1 className='resources-text'>монеты: {user?.coins} |</h1>
                        <h1 className='resources-text'>кристаллы улучшения: {user?.crystals} |</h1>
                        <h1 className='resources-text'>куски яиц: {user?.eggFragments}</h1>
                    </div>
                </div>
                <div className='button-panel'>
                    <Button onClick={inventoryClickHandler} text='Инвентарь' />
                    <Button onClick={marketClickHandler} text='Рынок' />
                    <Button onClick={battleClickHandler} text='Битва' />
                    <Button onClick={settingsClickHandler} text='Настройки' />
                </div>
                <Map/>
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


