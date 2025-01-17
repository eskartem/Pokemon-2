import React, { useContext, useState, useEffect, useRef } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { 
    TUpdateMarketResponse, TLot, ETypeLot, ELotStatus, 
    TInventory, EMonsterStatus, 
    TResources, TCr 
} from '../../services/server/types';
import blobfishfire from '../../assets/characters/blob_fish_water.png';
import frog_water from '../../assets/characters/frog_water.png';
import meatboy_fire from '../../assets/characters/meatboy_fire.png';
import lizard_fire from '../../assets/characters/lizard_fire.png';
import emoboy_fire from '../../assets/characters/emoboy_fire.png';
import worm_earth from '../../assets/characters/worm_earth.png';
import bee_earth from '../../assets/characters/bee_earth.png';
import mushroom_earth from '../../assets/characters/mushroom_earth.png';
import cat_lit_energy_air from '../../assets/characters/cat_lit_energy_air.png';
import elephant_air from '../../assets/characters/elephant_air.png';
import bear_air from '../../assets/characters/bear_air.png';
import butterflyWaterImage from '../../assets/characters/butterfly_water.png';
import Button from '../Button/Button';
import Lot from '../Lot/Lot';
import InfoModal from '../../components/InfoModal/InfoModal'; 
import question from '../../assets/img/question.png';

import './MarketTab.scss';

const MarketTab: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [catalog, setCatalog] = useState<TLot[] | null>(null);
    const [allLots, setAllLots] = useState<TLot[]>([]);
    const [isMakeLot, setMakeLot] = useState<boolean>(false);
    const [inventory, setInventory] = useState<TInventory | null>(null);
    const [isItemList, setIsItemList] = useState<boolean>(true);
    const [sellingItem, setSellingItem] = useState<TCr | TResources | null>(null);
    const [sellingType, setSellingType] = useState<ETypeLot | null>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const startCost = useRef<HTMLInputElement>(null);
    const stepCost = useRef<HTMLInputElement>(null);
    const user = store.getUser();
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const filterLots = () => {
        const currentStatus = selectRef.current?.value as ELotStatus;
        const filteredLots = allLots.filter(lot => lot.status === currentStatus);
        setCatalog(filteredLots);
    };

    const makeLot = () => {
        const cost = startCost.current?.value;
        const step = stepCost.current?.value;

        if (!sellingItem || !cost || !step || !sellingType) return;

        setMakeLot(false);
        setIsItemList(true);
        server.makeLot(sellingType, sellingItem.id, cost, step, null);
    };

    const handleOpenInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const inventory = await server.getInventory();
                setInventory(inventory);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        const marketUpdateHandler = (result: TUpdateMarketResponse) => {
            if (result.lots) {
                setAllLots(result.lots);
                setCatalog(result.lots.filter(lot => lot.status === ELotStatus.open));
            }
        };

        if (user) {
            server.startMarketUpdate(marketUpdateHandler);
            fetchMarketData();
        }

        return () => {
            server.stopMarketUpdate();
        };
    }, [server, user]);

    const getMonsterImage = (assetPath: string | null): string | undefined => {
        if (!assetPath) return undefined;

        const imageMap: Record<string, string> = {
            '../../assets/characters/butterfly_water.png': butterflyWaterImage,
            '../../assets/characters/blob_fish_water.png': blobfishfire,
            '../../assets/characters/frog_water.png': frog_water,
            '../../assets/characters/meatboy_fire.png': meatboy_fire,
            '../../assets/characters/lizard_fire.png': lizard_fire,
            '../../assets/characters/emoboy_fire.png': emoboy_fire,
            '../../assets/characters/worm_earth.png': worm_earth,
            '../../assets/characters/bee_earth.png': bee_earth,
            '../../assets/characters/mushroom_earth.png': mushroom_earth,
            '../../assets/characters/cat_lit_energy_air.png': cat_lit_energy_air,
            '../../assets/characters/elephant_air.png': elephant_air,
            '../../assets/characters/bear_air.png': bear_air,
        };

        const normalizedPath = assetPath.replace(/\\/g, '/');
        return imageMap[normalizedPath] || undefined;
    };

    const pickMonster = (item: TCr | TResources) => {
        setSellingItem(item);
        setSellingType(ETypeLot.monster);
        setIsItemList(false);
    };

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
                        defaultValue={ELotStatus.open}
                        onChange={() => {}}
                    >
                        <option value={ELotStatus.open}>Открытые</option>
                        <option value={ELotStatus.closed}>Закрытые</option>
                        <option value={ELotStatus.canceled}>Отмененные</option>
                    </select>
                </div>
                <div className='lots'>
                    <h1>Рынок пока не загружен.</h1>
                </div>
            </div>
        );
    }

    return (
        <div className='market-tab'>
            <div className='filter-market'>
                <h1>Лоты:</h1>
                <select 
                    name='фильтр' 
                    className='lot-filter' 
                    id='test-select_lot_status' 
                    ref={selectRef} 
                    onChange={filterLots}
                    defaultValue={ELotStatus.open}
                >
                    <option value={ELotStatus.open}>Открытые</option>
                    <option value={ELotStatus.closed}>Закрытые</option>
                    <option value={ELotStatus.canceled}>Отмененные</option>
                </select>
            </div>
            <div className='lots'>
                {catalog.map((lot, index) => (
                    <Lot key={index} lot={lot} index={index} />
                ))}
                {catalog.length === 0 && <h1>Похоже на рынке нет активных лотов...</h1>}
            </div>
            <Button onClick={() => setMakeLot(true)} text='Создать лот' />

            {isMakeLot && (
                <div className='make_lot-tab'>
                    <div className='make_lot-content'>
                        {isItemList && (
                            <div className='monster-list'>
                                {inventory?.monsters.map((monster, index) => {
                                    if (monster.status === EMonsterStatus.inTeam) return null;
                                    return (
                                        <div key={index} className='make_lot-selling_item'>
                                            <img src={getMonsterImage(monster.asset)} alt='monster' />
                                            <h1>{monster.name}</h1>
                                            <h1>LVL: {monster.level}</h1>
                                            <h1>HP: {monster.max_HP}</h1>
                                            <h1>ATK: {monster.ATK}</h1>
                                            <h1>DEF: {monster.DEF}</h1>
                                            <Button onClick={() => pickMonster(monster)} text='Выбрать' />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        <label htmlFor='test-market-make_lot-start_price'>Начальная цена:</label>
                        <input 
                            type='number' 
                            id='test-market-make_lot-start_price' 
                            className='bet-input' 
                            ref={startCost} 
                        />
                        <label htmlFor='test-market-make_lot-step_cost'>Шаг:</label>
                        <input 
                            type='number' 
                            id='test-market-make_lot-step_cost' 
                            className='bet-input' 
                            ref={stepCost} 
                        />
                        <Button text='Выставить' onClick={makeLot} />
                        <Button 
                            text='Отменить' 
                            onClick={() => {
                                setMakeLot(false);
                                setIsItemList(true);
                            }} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketTab;
