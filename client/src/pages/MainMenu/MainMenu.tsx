import React, {useContext, useState, useEffect} from 'react';
import Button from '../../components/Button/Button';
import { ServerContext, StoreContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import { TUserResources } from '../../services/server/types';

import './MainMenu.scss';

const MainMenu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;

    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [resources, setResources] = useState<TUserResources | null>(null);

    const user = store.getUser();

    useEffect(() => {
        (async () => {
           const res = await server.getUserResources();
           setResources(res);
       })();
   }, []);

    const settingsClickHandler = () => setPage(PAGES.SETTINGS);
    const inventoryClickHandler = () => setPage(PAGES.INVENTORY);
    const mapClickHandler = () => setPage(PAGES.MAP); 
    const marketClickHandler = () => setPage(PAGES.MARKET);
    const battleClickHandler = () => setPage(PAGES.BATTLE);

    
    return (
    <div className='main-menu'>
        <div id='user-panel'>
            <h1> Ник: {user?.name} </h1>
            <div className='user-resources'>
            <h1 className='resources-text'>монеты: {resources?.coins} |</h1>
            <h1 className='resources-text'>кристаллы улучшения: {resources?.crystals} |</h1>
            <h1 className='resources-text'>куски яиц: {resources?.eggFragments}</h1>
        </div>  
        </div>
        <div id='button-panel'>
            <Button onClick={inventoryClickHandler} text='Инвентарь' />
            <Button onClick={mapClickHandler} text='Карта'/>
            <Button onClick={marketClickHandler} text='Рынок' />
            <Button onClick={battleClickHandler} text='Битва' />
            <Button onClick={settingsClickHandler} text='Настройки' />
        </div>
    </div>)
}

export default MainMenu;