import React, { useContext, useState, useEffect, useRef } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { TUpdateMarketResponse, TLot, ETypeLot } from '../../services/server/types';
import Button from '../Button/Button';

import './MarketTab.scss';

const MarketTab: React.FC = () => {

    const server = useContext(ServerContext);
    const store  = useContext(StoreContext)
    const [catalog, setCatalog] = useState<TLot[] | null>(null);
    const [isMakeLot, setMakeLot] = useState<boolean>(false);
    const user = store.getUser();
    const inputBetRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        (async () => {
            const marketUpdateHandler = ( result: TUpdateMarketResponse ) => {
                const lots = result.lots;
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

    const makeBet = (lotId: number) => {
        const bet = inputBetRef?.current?.value;
        if (!bet || !lotId) { return }
        server.makeBet(lotId, bet);
    }

    const makeLot = () => {
        return
    }

    return (
    <div className='market-tab'>
        <div className='lots'>
            {catalog.map( (lot, index) => {
                return <div className='market-lot' key={index}>
                    <h1>{index+1}) [ {lot.datetime}]| {lot.selling_id} | {lot.type === ETypeLot.item? lot.amount: '1'} шт.| 
                        продавец: {lot.seller_id} | нач.цена: { lot.start_cost } | тек.цена: { lot.current_cost}|
                        шаг: { lot.step_cost}| {lot.buyer_id != null ? `${lot.buyer_id} |`: ''} {lot.status}|
                    </h1>
                    <Button 
                        onClick={() => makeBet(lot.id)}
                        text='поставить'
                    />
                    <input type="number" className='bet-input' ref={inputBetRef}
                    placeholder={`${lot.current_cost+ lot.step_cost}`}
                    min={lot.current_cost + lot.step_cost}
                    required
                    />
                </div>
            })}
        </div>
        <Button 
            onClick={() => makeLot()}
            text='создать лот'
        />
        {isMakeLot && <div className='makelot-tab'></div>}
    </div>)
}

export default MarketTab;
