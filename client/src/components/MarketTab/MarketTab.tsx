import React, { useContext, useState, useEffect } from 'react';
import { ServerContext } from '../../App';
import { TMarketCreature, TMarketCatalog, TMarketItem } from '../../services/server/types';
import Button from '../Button/Button';

import './MarketTab.scss';

enum EMarketType {
    monster,
    item
}

const MarketTab: React.FC = () => {

    const server = useContext(ServerContext);
    const [catalog, setCatalog] = useState<TMarketCatalog | null>(null);
    useEffect(() => {
        (async () => {
            setCatalog(await server.getMarketCatalog());
       })();
    }, []);

    if (!catalog) {
        return (
            <div>
                ошибка
            </div>
        )
    }

    const buyItemHandler = (type: EMarketType, id: number): void => { //типы, id 
        console.log(`купил ${type == EMarketType.item? ' предмет': 'монстра' } под номером ${id}`);
        // вызываешь функцию для покупки предемета из сервера.
        // обновляешь юзера либо с метода сервера либо с метода со стора.
        // обновить каталог
    }

    return (
    <div className='market-tab'>
       <div className='monsters-tab'>
       {catalog.creatures.map( (elem, index) => {
                return ( 
                    <div className='market-lot' key={index}>
                            {index + 1} | {elem.cost} coins: {elem.name} | {elem.element} | lvl:{elem.lvl} |
                            stats: {elem.stats.hp} hp, {elem.stats.ad} ad, {elem.stats.df} df |
                            <Button onClick={() => buyItemHandler(EMarketType.monster, index + 1)} text='купить'/>
                    </div> )
                    }
            )}
        </div>
        <div className='items_tab'>
        {catalog.resources.map( (elem, index) => {
                return ( 
                    <div className='market-lot' key={index}>
                            {index + 1 + catalog.creatures.length} | {elem.cost} coins: {elem.name} | {elem.number} шт. |
                            <Button onClick={() => buyItemHandler(EMarketType.item, index + 1 + catalog.creatures.length)} text='купить'/>
                    </div> )
                    }   
            )}
        </div>
    </div>)
}

export default MarketTab;

// нужно сделать хандлер, к каждой кнопкке