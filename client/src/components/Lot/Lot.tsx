import React, { useContext, useRef } from 'react';
import { ServerContext, StoreContext } from '../../App';
import Button from '../../components/Button/Button';
import { TUser, TLot, ETypeLot, ELotStatus } from '../../services/server/types';

import './Lot.scss';

type ILot = {
    lot: TLot,
    index: number
}

const Lot: React.FC<ILot> = (props: ILot) => {

    const {lot, index} = props;

    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const user = store.getUser();
    const inputBet = useRef<HTMLInputElement>(null);

    const makeBet = (lotId: number) => {
        const bet = inputBet.current?.value;
        if (!bet || !lotId) { return }
        console.log(bet);
        server.makeBet(lotId, bet);
    }

    const cancelLot = (lot_id: number) => {
        if (!lot_id) return
        server.cancelLot(lot_id);
    }

    return (
        <div className="market-lot" key={index}>

            <h1>
                {index+1}) [ {lot.datetime}]| 
                {lot.type === ETypeLot.item? `${lot.resource} | шт: ${lot.amount}  |`: `${lot.monster_name} | LVL:${lot.monster_level} 
                | ATK:${lot.ATK}, HP: ${lot.max_HP}, DEF: ${lot.DEF} |`}
                продавец: {lot.seller_name} | нач.цена: { lot.start_cost } | тек.цена: { lot.current_cost}|
                шаг: { lot.step_cost}| {lot.buyer_name != null ? `купил: ${lot.buyer_name} |`: ''} {lot.status}|
            </h1>

            { lot.status === ELotStatus.open && 
            <div className='lot-bet-panel'>
                <Button 
                    onClick={() => makeBet(lot.id)}
                    text='поставить'
                />
                <input 
                    key={index}
                    type="number"
                    ref={inputBet}
                    className='bet-input'
                    id={`test-${lot.id}-bet-input`}
                    placeholder={`${lot.current_cost+ lot.step_cost}`}
                    min={lot.current_cost + lot.step_cost}
                    required
                />
            </div>}
            { lot.seller_id === user?.id && lot.status === ELotStatus.open &&
            <Button 
                onClick={() => cancelLot(lot.id)}
                text='отменить'
            />}
        </div>
    );
};

export default Lot;