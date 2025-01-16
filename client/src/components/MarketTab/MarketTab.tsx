import React, { useContext, useState, useEffect, useRef } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { TUpdateMarketResponse, TLot, ETypeLot, ELotStatus, 
    TInventory, EMonsterStatus } from '../../services/server/types';
import Button from '../Button/Button';
import Lot from '../Lot/Lot';
import InfoModal from '../../components/InfoModal/InfoModal'; 
import question from '../../assets/img/question.png';

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
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const filterLots = () => {
        const currenStatus = selectRef.current?.value as ELotStatus;
        const filteredLots = allLots.filter(lot => {
            return lot.status === currenStatus});
        setCatalog(filteredLots);
    };

    const makeLot = () => {
        return
    }

    const handleOpenInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
    };

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
            <div className='market-tab'>
                <div className='filter-market'>
                    <h1 > лоты: </h1>
                    <img
                        src={question}
                        onClick={handleOpenInfoModal}
                        className="info-icon" 
                        id="test-info-icon" 
                     />
                     <InfoModal
                        isOpen={isInfoModalOpen}
                        onClose={handleCloseInfoModal}
                        title="Рынок"
                        content={
                            <div className="info-modal-content">
                                Находится в главном городе, позволяет торговать покемонами, ресурсами и предметами. Залог: 5% от цены. Возвращается при продаже, удерживается при снятии или истечении срока. Ограничения: нельзя продавать покемонов, если в инвентаре осталось меньше 3. Лоты: фиксированы на 5 минут, работают по принципу аукциона. Лимит лотов: залог обязателен для ограничения их количества. Контроль цен: минимальные и максимальные цены на товары. Цены на ресурсы: зависят от спроса и предложения, расчеты в разработке.
                            </div>
                        }
                    />
                    <select name="фильтр" 
                        className='lot-filter' 
                        id='test-select_lot_status' 
                        ref={selectRef} 
                        onChange={() => {}}
                        defaultValue={ELotStatus.open}
                    >
                        <option value={ELotStatus.open} >открытые</option>
                        <option value={ELotStatus.closed}>закрытые</option>
                        <option value={ELotStatus.canceled}>отмененные</option>
                    </select>
                </div>
                <div className='lots'>
                    <h1> Рынок пока не загружен.</h1>
                </div>
                {/* <Button 
                    onClick={() => {}}
                    text='создать лот'
                /> */}
            </div>
        )
    }

    return (
    <div className='market-tab'>
        <div className='filter-market'>
            <h1 > лоты: </h1>
            <img
                src={question}
                onClick={handleOpenInfoModal}
                className="info-icon" 
                id="test-info-icon" 
            />
            <InfoModal
                isOpen={isInfoModalOpen}
                onClose={handleCloseInfoModal}
                title="Рынок"
                content={
                    <div className="info-modal-content">
                Находится в главном городе, позволяет торговать покемонами, ресурсами и предметами. Залог: 5% от цены. Возвращается при продаже, удерживается при снятии или истечении срока. Ограничения: нельзя продавать покемонов, если в инвентаре осталось меньше 3. Лоты: фиксированы на 5 минут, работают по принципу аукциона. Лимит лотов: залог обязателен для ограничения их количества. Контроль цен: минимальные и максимальные цены на товары. Цены на ресурсы: зависят от спроса и предложения, расчеты в разработке.
                    </div>
                }
                id="test-market-info-modal"
            />
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
        </div>
        <div className='lots'>
            {catalog.map( (lot, index) => {
                return <Lot lot={lot} index={index} />
            })}
            {catalog.length === 0 && <h1> Похоже на рынке нет активных лотов...</h1>}
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
