import React from 'react';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

import './MainMenu.scss';

const MainMenu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;

    const settingsClickHandler = () => setPage(PAGES.SETTINGS);
    const mapClickHandler = () => setPage(PAGES.MAP); 
    const marketClickHandler = () => setPage(PAGES.MARKET);
    const battleClickHandler = () => setPage(PAGES.BATTLE);
    const logoutClickHandler = () => setPage(PAGES.LOGIN);
    
    return (
    <div className='MainMenu'>
        <Button onClick={settingsClickHandler} text='Настройки' />
        <Button onClick={mapClickHandler} text='Карта'/>
        <Button onClick={marketClickHandler} text='Рынок' />
        <Button onClick={battleClickHandler} text='Битва' />
        <Button onClick={logoutClickHandler} text='Выйти' />
    </div>)
}

export default MainMenu;