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
        server.makeBet(lotId, bet);
    }

    const cancelLot = (lot_id: number) => {
        if (!lot_id) return
        server.cancelLot(lot_id);
    }

    return (
        <div className="market-lot" key={index}>
            <div className='lot-header'>
                <h3 id='test-market-market_tab-lot-number'>{index+1}</h3>
                <h3 id='test-market-market_tab-lot-start_datetime'>{lot.datetime}</h3>
            </div>
            <div className='lot-item'>
                {/* <img src={lot.image_source} /> */}
                {lot.type === ETypeLot.item? 
                    <div>
                        <h3>{ lot.resource }</h3>
                        <div className='lot-text_pair'>
                            <h3>шт:</h3>
                            <h3 id='test-market-market_tab-lot-item_amount'>{lot.amount}</h3>
                        </div>
                    </div>: 
                    <div>
                        <h3>{ lot.monster_name }</h3>
                        <div className='lot-text_pair'>
                            <h3>ЛВЛ:</h3>
                            <h3>{lot.monster_level} </h3>
                        </div>
                        <div className='monster-stats'>
                            <div className='lot-text_pair'>
                                <h3>АТК: </h3>
                                <h3>{ lot.ATK }</h3>
                            </div>
                            <div className='lot-text_pair'>
                                <h3>ОЗ: </h3>
                                <h3>{ lot.max_HP }</h3>
                            </div>
                            <div className='lot-text_pair'>
                                <h3>ЗЩ: </h3>
                                <h3>{ lot.DEF }</h3>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='lot-text_pair'>
                <h3>продавец:</h3> 
                <h3 id='test-market-market_tab-lot-seller_name'>{ lot.seller_name }</h3>
            </div>
            <div className='lot-text_pair'>
                <h3>нач.цена: </h3>
                <h3 id='test-market-market_tab-lot-start_cost'>{ lot.start_cost }</h3>
            </div>
            <div className='lot-text_pair'>
                <h3>шаг:</h3> 
                <h3 id='test-market-market_tab-lot-step_cost'>{ lot.step_cost}</h3>
            </div>
            <div className='lot-text_pair'>
                <h3>тек.цена: </h3>
                <h3 id='test-market-market_tab-lot-start_cost'>{ lot.start_cost }</h3>
            </div>

            {lot.buyer_name != null ?
            <div className='lot-text_pair'>
                <h3>купил: </h3> 
                <h3 id='test-market-market_tab-lot-buyer_name'>{ lot.buyer_name }</h3>
            </div>
            : ''}
            {lot.status === ELotStatus.open? <div id='test-market-market_tab-lot-status' 
                                                className='open-status'>открыт</div>: 
            lot.status === ELotStatus.closed? <div id='test-market-market_tab-lot-status'  
                                                className='close-status'>закрыт</div>: 
            lot.status === ELotStatus.canceled? <div id='test-market-market_tab-lot-status'  
                                                className='cancelled-status'>отменён</div>: ''}

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