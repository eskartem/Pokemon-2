import React, { useState, useContext, useEffect } from 'react';
import Button from '../../components/Button/Button';
import MarketTab from '../../components/MarketTab/MarketTab';
import TraderTab from '../../components/TraderTab/TraderTab';
import ExchangerTab from '../../components/ExchangerTab/ExchangerTab';
import { IBasePage, PAGES } from '../PageManager';
import { ServerContext, StoreContext } from '../../App';
import { TInventory, TBalance } from '../../services/server/types';

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
            server.getInventory(user.token).then(inv => {
                setInventory(inv);
                if (inv && inv.balance) {
                    console.log('Количество монет:', inv.balance.money);
                }
            });
        }
    }, [user, server]);

    const backClickHandler = () => setPage(PAGES.GAME);

    if (!user) {
        return (
            <div>
                <div>ошибка</div>
                <Button onClick={backClickHandler} text='назад' />
            </div>
        )
    }

    return (
        <div id='market'>
            <div className='user-resources'>
                <h1 className='resources-text'>монеты: {inventory?.balance?.money || 0} |</h1>
            </div>
            <div className='button-panel'>
                <button onClick={() => setTab(TABS.MARKET)} className='market-button'>рынок</button>
                <button onClick={() => setTab(TABS.TRADER)} className='market-button'>торговец</button>
                <button onClick={() => setTab(TABS.EXCHANGER)} className='market-button'>обменник</button>
            </div>
            <div>
                {tab === TABS.MARKET && <MarketTab />}
                {tab === TABS.TRADER && <TraderTab />}
                {tab === TABS.EXCHANGER && <ExchangerTab />}
            </div>
            <Button onClick={backClickHandler} text='назад' />
        </div>
    )
}

export default Market;