import React, { useContext, useState, useEffect, useRef } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { TUpdateMarketResponse, TLot, ETypeLot, ELotStatus, 
    TInventory, EMonsterStatus } from '../../services/server/types';
import Button from '../Button/Button';
import Lot from '../Lot/Lot';

import './MarketTab.scss';

const MarketTab: React.FC = () => {

    const server = useContext(ServerContext);
    const store  = useContext(StoreContext)
    const [catalog, setCatalog] = useState<TLot[] | null>(null); // показываемый список лотов
    const [allLots, setAllLots] = useState<TLot[]>([]); // вообще все лоты
    const [isMakeLot, setMakeLot] = useState<boolean>(false);
    const [inventory, setInventory] = useState<TInventory | null>(null);
    const user = store.getUser();
    const selectRef = useRef<HTMLSelectElement>(null);

    const filterLots = () => {
        const currenStatus = selectRef.current?.value as ELotStatus;
        const filteredLots = allLots.filter(lot => {
            return lot.status === currenStatus});
        setCatalog(filteredLots);
    };

    const makeLot = () => {
        return
    }

    useEffect(() => {
        const marketUpdateHandler = ( result: TUpdateMarketResponse ) => {
            if (!result.lots) return;
            setAllLots(result.lots);
            setCatalog(result.lots.filter(lot => lot.status === ELotStatus.open));

            ( async () => { // получаю инвентарь
                const inventory = await server.getInventory();
                setInventory(inventory);
            })();
        }

        if (user) {
            server.startMarketUpdate(marketUpdateHandler);
        }
        
        return (() => {
            server.stopMarketUpdate();
        })

    }, [server, store, user]);

    if (!catalog) {
        return (
            <div>
                Рынок не загружен.
            </div>
        )
    }

    return (
    <div className='market-tab'>
        <label htmlFor="test-select_lot_status"> лоты: </label>
        <select name="фильтр" 
            className='lot-filter' 
            id='test-select_lot_status' 
            ref={selectRef} 
            onChange={() => filterLots()}
            defaultValue={ELotStatus.open}
        >
            <option value={ELotStatus.open} >открытые</option>
            <option value={ELotStatus.closed}>закрытые</option>
            <option value={ELotStatus.canceled}>отмененные</option>
        </select>
        <div className='lots'>
            {catalog.map( (lot, index) => {
                return <Lot lot={lot} index={index} />
            })}
        </div>
        {/* <Button 
            onClick={() => setMakeLot(true)}
            text='создать лот'
        /> */}
        {isMakeLot && // создание лота
            <div className='make_lot-tab'>
                <div className='sell-menu'>
                    {inventory?.monsters.map((monster , index) =>  {
                        if (monster.status === EMonsterStatus.inTeam) return
                        return <div key={index} className='make_lot-selling_item'>
                            {/* <h1> {monster.name} | LVL:{ monster.level} 
                                | HP:{monster.hp}  | ATK:{monster.atk}  | DEF:{monster.def} |</h1> */}
                            <Button 
                                onClick={() => {}}
                                text='выбрать'
                            />
                        </div>
                    } )}
                </div>
                <label htmlFor="test-market-make_lot-start_price">нач.цена</label>  
                <input type="number" id='test-market-make_lot-start_price' className='bet-input'/>
                <label htmlFor="test-market-make_lot-step_cost">шаг: </label>
                <input type="number" id='test-market-make_lot-step_cost' className='bet-input' />
                <Button text='выставить' onClick={() => makeLot()} />
                <Button text='x' onClick={() =>setMakeLot(false)} />
            </div>}
    </div>)
}

export default MarketTab;
