import React, {useState, useContext, useEffect} from 'react';
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
    
    const user = store.getUser();

    const backClickHandler = () => setPage(PAGES.GAME   );

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
            <h1 className='resources-text'>монеты: {user.coins} |</h1>
            <h1 className='resources-text'>кристаллы улучшения: {user.crystals} |</h1>
            <h1 className='resources-text'>куски яиц: {user.eggFragments}</h1>
        </div>  
        <div className='button-panel'>
            <button onClick={() => setTab(TABS.MARKET)} className='market-button'>рынок</button>
            <button onClick={() => setTab(TABS.TRADER)} className='market-button'>торговец</button>
            <button onClick={() => setTab(TABS.EXCHANGER)} className='market-button'>обменник</button>
        </div>
        <div>
        {tab === TABS.MARKET && <MarketTab/>}
        {tab === TABS.TRADER && <TraderTab/>}
        {tab === TABS.EXCHANGER && <ExchangerTab/>}
        </div>
        <Button onClick={backClickHandler} text='назад' />
    </div>)
}

export default Market;