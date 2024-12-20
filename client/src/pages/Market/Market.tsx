import React, { useState, useContext, useEffect } from 'react';
import Button from '../../components/Button/Button';
import MarketTab from '../../components/MarketTab/MarketTab';
import TraderTab from '../../components/TraderTab/TraderTab';
import ExchangerTab from '../../components/ExchangerTab/ExchangerTab';
import { IBasePage, PAGES } from '../PageManager';
import { ServerContext, StoreContext } from '../../App';
import { TInventory } from '../../services/server/types';

import './Market.scss';

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
    const [inventory, setInventory] = useState<TInventory | null>(null);

    const user = store.getUser();

    useEffect(() => {
        if (user) {
            const fetchInventory = () => {
                server.getInventory().then(inv => {
                    setInventory(inv);
                    if (inv && inv.balance) {
                        // console.log('Обновлено количество монет:', inv.balance.money);
                    }
                });
            };

            fetchInventory();

            const intervalId = setInterval(fetchInventory, 1000);

            return () => clearInterval(intervalId);
        }
    }, [user, server, store]);

    const backClickHandler = () => setPage(PAGES.GAME);

    if (!user) {
        return (
            <div>
                <div>ошибка</div>
                <Button onClick={backClickHandler} text='назад' />
            </div>
        );
    }

    const crystals = inventory?.inventory?.find(item => item.resource_id === 1)?.resource_amount || 0;
    const eggs = inventory?.inventory?.find(item => item.resource_id === 2)?.resource_amount || 0;
    const shells = inventory?.inventory?.find(item => item.resource_id === 3)?.resource_amount || 0;

    return (
        <div id='market'>
            <div className='user-resources'>
                <h1 className='resources-text'>
                    монеты: {inventory?.balance?.money || 0} | 
                    кристаллы: {crystals} | 
                    яйца: {eggs} | 
                    скорлупа: {shells}
                </h1>
            </div>
            <div className='button-panel'>
                <button 
                    onClick={() => setTab(TABS.MARKET)} 
                    className='market-button'
                    title="Находится в главном городе, позволяет торговать покемонами, ресурсами и предметами. Залог: 5% от цены. Возвращается при продаже, удерживается при снятии или истечении срока. Ограничения: нельзя продавать покемонов, если в инвентаре осталось меньше 3. Лоты: фиксированы на 5 минут, работают по принципу аукциона. Лимит лотов: залог обязателен для ограничения их количества. Контроль цен: минимальные и максимальные цены на товары. Цены на ресурсы: зависят от спроса и предложения, расчеты в разработке."
                >
                    рынок
                </button>
                <button 
                    onClick={() => setTab(TABS.TRADER)} 
                    className='market-button'
                    title="Отдельный персонаж на рынке для продажи кусков яиц и кристаллов стихий (покемонов продавать нельзя). Цены фиксированы и не зависят от рыночных колебаний."
                >
                    торговец
                </button>
                <button 
                    onClick={() => setTab(TABS.EXCHANGER)} 
                    className='market-button'
                    title="Позволяет обменивать 50 кусков яиц на одно яйцо покемона. Куски яиц можно собирать в активностях для получения новых покемонов."
                >
                    обменник
                </button>
            </div>
            <div>
                {tab === TABS.MARKET && <MarketTab />}
                {tab === TABS.TRADER && <TraderTab />}
                {tab === TABS.EXCHANGER && <ExchangerTab />}
            </div>
            <Button onClick={backClickHandler} text='назад' />
        </div>
    );
};

export default Market;