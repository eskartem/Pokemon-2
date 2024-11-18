import React, {useContext} from 'react';
import Button from '../../components/Button/Button';
import { StoreContext } from '../../App';
import Chat from '../../components/Chat/Chat';
import { IBasePage, PAGES } from '../PageManager';

import './MainMenu.scss';

const MainMenu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;

    const store = useContext(StoreContext);
    const user = store.getUser();

    const settingsClickHandler = () => setPage(PAGES.SETTINGS);
    const inventoryClickHandler = () => setPage(PAGES.INVENTORY);
    const mapClickHandler = () => setPage(PAGES.MAP); 
    const marketClickHandler = () => setPage(PAGES.MARKET);
    const battleClickHandler = () => setPage(PAGES.BATTLE);

    if (!user) {
        return (
            <div className='main-menu'>
                <div id='user-panel'>
                    пользователь не найден
                </div>
                <div id='button-panel'>
                    <Button onClick={inventoryClickHandler} text='Инвентарь' />
                    <Button onClick={mapClickHandler} text='Карта'/>
                    <Button onClick={marketClickHandler} text='Рынок' />
                    <Button onClick={battleClickHandler} text='Битва' />
                    <Button onClick={settingsClickHandler} text='Настройки' />
                </div>
                <Chat />
            </div>
        )
    }

    return (
    <div className='main-menu'>
        <div id='user-panel'>
            <h1> Ник: {user?.name} </h1>
            <div className='user-resources'>
            <h1 className='resources-text'>монеты: {user.coins} |</h1>
            <h1 className='resources-text'>кристаллы улучшения: {user.crystals} |</h1>
            <h1 className='resources-text'>куски яиц: {user.eggFragments}</h1>
        </div>
        </div>
        <div id='button-panel'>
            <Button onClick={inventoryClickHandler} text='Инвентарь' />
            <Button onClick={mapClickHandler} text='Карта'/>
            <Button onClick={marketClickHandler} text='Рынок' />
            <Button onClick={battleClickHandler} text='Битва' />
            <Button onClick={settingsClickHandler} text='Настройки' />
        </div>
        <Chat />
    </div>)
}

export default MainMenu;