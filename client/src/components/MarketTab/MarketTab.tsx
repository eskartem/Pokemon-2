import React, { useContext, useState, useEffect } from 'react';
import { ServerContext } from '../../App';
import { TMarketCatalog } from '../../services/server/types';
import Button from '../Button/Button';

import './MarketTab.scss';

const MarketTab: React.FC = () => {

    const server = useContext(ServerContext);
    const [catalog, setCatalog] = useState<TMarketCatalog | null>(null);
    let indexElem = 0;
    useEffect(() => {
        (async () => {
            setCatalog(await server.getCatalog());
       })();
    }, []);

    if (!catalog) {
        return (
            <div>
                ошибка
            </div>
        )
    }

    return (
    <div className='market-tab'>
            {catalog.creatures.map( (elem, index) => {
                indexElem++;
                return ( 
                    <div className='market-lot'>
                            {index + 1} | {elem.cost} coins: {elem.name} | {elem.element} | lvl:{elem.lvl} | {elem.rarity} |
                            stats: {elem.stats.hp} hp, {elem.stats.ad} ad, {elem.stats.df} df |
                            <Button onClick={()=>{}} text='купить'/>
                    </div> )
                    }   
            )}
            {catalog.resources.map( (elem, index) => {
                return ( 
                    <div className='market-lot'>
                            {index + 1 + indexElem} | {elem.cost} coins: {elem.name} | {elem.number} шт. |
                            <Button onClick={()=>{}} text='купить'/>
                    </div> )
                    }   
            )}
    </div>)
}

export default MarketTab;