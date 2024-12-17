import React, { useContext, useState, useEffect } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { TMarketCreature, TMarketCatalog, TMarketItem, TUpdateMarketResponse, TLot } from '../../services/server/types';
import Button from '../Button/Button';

import './MarketTab.scss';

enum EMarketType {
    monster,
    item
}

const MarketTab: React.FC = () => {

    const server = useContext(ServerContext);
    const store  = useContext(StoreContext)
    const [catalog, setCatalog] = useState<TLot[] | null>(null);
    const user = store.getUser();

    useEffect(() => {
        (async () => {
            const marketUpdateHandler = ( result: TUpdateMarketResponse ) => {
                const lots = result.activeLots;
                if (!lots) return;
                console.log(lots);
                setCatalog(lots);
            }

            if (user) {
                server.startMarketUpdate(marketUpdateHandler);
            }
            
            return () => {
                server.stopMarketUpdate();
            }

       })();
    }, []);

    if (!catalog) {
        return (
            <div>
                Рынок не загружен.
            </div>
        )
    }

    const buyItemHandler = (type: EMarketType, id: number): void => { //типы, id 
        
    }

    return (
    <div className='market-tab'>
        <div className='lots'>

        </div>
    </div>)
}

export default MarketTab;

// нужно сделать хандлер, к каждой кнопкке