import React, { useState, useContext, useEffect } from 'react';
import Button from '../../components/Button/Button';
import MarketTab from '../../components/MarketTab/MarketTab';
import TraderTab from '../../components/TraderTab/TraderTab';
import ExchangerTab from '../../components/ExchangerTab/ExchangerTab';
import moneyImage from '../../assets/img/money.png';
import crystalImage from '../../assets/img/crystal.png';
import eggImage from '../../assets/img/egg_new.png';
import eggShellImage from '../../assets/img/egg_shell.png';
import marketImg from '../../assets/img/marketRynokImg.png';
import tradeImg from '../../assets/img/tradeRynokImg.png';
import traderImg from '../../assets/img/traderRynokImg.png';
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
                        <div className='moneyMenu'>
                            <img src={moneyImage} alt="" />
                            <h1 >
                            Монеты: {inventory?.balance || 0}
                            </h1>
                        </div>
                        <div className='crystalMenu'>
                            <img src={crystalImage} alt="" />
                            <h1>
                                Кристаллы: {crystals}
                            </h1>
                        </div>
                        <div className='eggMenu'>
                            <img src={eggImage} alt="" />
                            <h1>
                            Яйца: {eggs}
                            </h1>
                        </div>
                        <div className='eggShellMenu'>
                            <img src={eggShellImage} alt="" />
                            <h1>
                            Скорлупа: {shells}
                            </h1>
                        </div>
                    </div>

            <div className='button-panel'>
                <div>
                <img src={marketImg} onClick={() => setTab(TABS.MARKET)} className='market-button' title="Находится в главном городе, позволяет торговать покемонами, ресурсами и предметами. Залог: 5% от цены. Возвращается при продаже, удерживается при снятии или истечении срока. Ограничения: нельзя продавать покемонов, если в инвентаре осталось меньше 3. Лоты: фиксированы на 5 минут, работают по принципу аукциона. Лимит лотов: залог обязателен для ограничения их количества. Контроль цен: минимальные и максимальные цены на товары. Цены на ресурсы: зависят от спроса и предложения, расчеты в разработке."/>
                </div>
                <div>
                <img src={tradeImg} onClick={() => setTab(TABS.EXCHANGER)} className='market-button' title="Отдельный персонаж на рынке для продажи кусков яиц и кристаллов стихий (покемонов продавать нельзя). Цены фиксированы и не зависят от рыночных колебаний."/>
                </div>
                <div>
                <img src={traderImg} onClick={() => setTab(TABS.TRADER)} className='market-button' title="Позволяет обменивать 50 кусков яиц на одно яйцо покемона. Куски яиц можно собирать в активностях для получения новых покемонов."/>
                </div>
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