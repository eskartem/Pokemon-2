import React, { useState, useContext, useEffect } from 'react';
import Button from '../../components/Button/Button';
import MarketTab from '../../components/MarketTab/MarketTab';
import TraderTab from '../../components/TraderTab/TraderTab';
import ExchangerTab from '../../components/ExchangerTab/ExchangerTab';
import { IBasePage, PAGES } from '../PageManager';
import { ServerContext, StoreContext } from '../../App';

import './Market.scss';
import { TUserResources } from '../../services/server/types';

export enum TABS {
    MARKET,
    TRADER,
    EXCHANGER
}

const Market: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [tab, setTab] = useState<TABS>(TABS.MARKET);
    const [resources, setResources] = useState<TUserResources | null>(null);
    
    const user = store.getUser();

    useEffect(() => {
        (async () => {
            const res = await server.getUserResources();
            setResources(res);
        })();
    }, []);

    const backClickHandler = () => setPage(PAGES.MAINMENU);

    if (!user || !resources) {
        return (
            <div>
                <div>ошибка</div>
                <Button onClick={backClickHandler} text='назад' />
            </div>
        )
    }

    // Логика обновления монет
    const updateCoins = (newCoins: number) => {
        const updatedResources = { ...resources, coins: newCoins };
        store.setUserResources(updatedResources); // Обновляем ресурсы пользователя в Store
        setResources(updatedResources); // Обновляем состояние ресурсов
    };

    // Логика добавления яйца
    const addEgg = () => {
        store.addEggToInventory(); // Метод для добавления яйца в инвентарь
        // Здесь можно также обновить состояние, если нужно отобразить инвентарь
    };

    return (
        <div id='market'>
            <div className='user-resources'>
                <h1 className='resources-text'>монеты: {resources.coins} |</h1>
                <h1 className='resources-text'>кристаллы улучшения: {resources.crystals} |</h1>
                <h1 className='resources-text'>куски яиц: {resources.eggFragments}</h1>
            </div>
            <div className='button-panel'>
                <button onClick={() => setTab(TABS.MARKET)} className='market-button'>рынок</button>
                <button onClick={() => setTab(TABS.TRADER)} className='market-button'>торговец</button>
                <button onClick={() => setTab(TABS.EXCHANGER)} className='market-button'>обменник</button>
            </div>
            <div>
                {tab === TABS.MARKET && <MarketTab />}
                {tab === TABS.TRADER && <TraderTab />}
                {tab === TABS.EXCHANGER && 
                    <ExchangerTab 
                        requiredCoins={50} 
                        updateCoins={updateCoins}
                        addEgg={addEgg}
                        coins={resources.coins}
                    />
                }
            </div>
            <Button onClick={backClickHandler} text='назад' />
        </div>
    );
}

export default Market;
