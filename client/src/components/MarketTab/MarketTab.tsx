import React, { useContext, useState, useEffect } from 'react';
import { ServerContext } from '../../App';
import { TMarketCatalog} from '../../services/server/types';
import Button from '../Button/Button';

import './MarketTab.scss';

const MarketTab: React.FC = () => {
    const server = useContext(ServerContext);
    const [catalog, setCatalog] = useState<TMarketCatalog | null>(null);
    const [error, setError] = useState<string | null>(null);


    enum EMarketType {
      monster,
      item
  }
  
    // Загружаем данные каталога
    useEffect(() => {
        (async () => {
            try {
                const catalogData = await server.getCatalog(); // Используем getCatalog
                setCatalog(catalogData);
            } catch (e) {
                setError('Ошибка загрузки каталога');
            }
        })();
    }, [server]);

    // Обработчик покупки
    const handleBuy = async (id: number, type: EMarketType) => {
        try {
            let success: boolean | null = false;
            if (type === EMarketType.monster) {
                success = await server.buyItem(id.toString()); // Покупаем существо
            } else if (type === EMarketType.item) {
                success = await server.buyItem(id.toString()); // Покупаем ресурс
            }

            if (success) {
                alert('Покупка успешна!');
                // Перезагружаем каталог после успешной покупки
                const updatedCatalog = await server.getCatalog();
                setCatalog(updatedCatalog);
            } else {
                alert('Не удалось выполнить покупку.');
            }
        } catch (err) {
            console.error('Ошибка при покупке:', err);
            alert('Произошла ошибка при выполнении покупки.');
        }
    };

 
    if (!catalog) {
        return <div>{error || 'Ошибка'}</div>;
    }

    return (
        <div className="market-tab">
            {/* Список существ */}
            <div className="monsters-tab">
                {catalog.creatures.map((elem) => (
                    <div className="market-lot" key={`creature-${elem.id}`}>
                        {elem.cost} coins: {elem.name} | {elem.element} | lvl: {elem.lvl} |
                        stats: {elem.stats.hp} hp, {elem.stats.ad} ad, {elem.stats.df} df |
                        <Button
                            text="Купить"
                            onClick={() => handleBuy(elem.id, EMarketType.monster)}
                        />
                    </div>
                ))}
            </div>

            {/* Список ресурсов */}
            <div className="items-tab">
                {catalog.resources.map((elem) => (
                    <div className="market-lot" key={`resource-${elem.id}`}>
                        {elem.cost} coins: {elem.name} | {elem.number} шт. |
                        <Button
                            text="Купить"
                            onClick={() => handleBuy(elem.id, EMarketType.item)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketTab;
