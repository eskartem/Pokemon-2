import React, { useContext, useState, useEffect } from 'react'; 
import { ServerContext } from '../../App';
import { TMarketCatalog } from '../../services/server/types';
import Button from '../Button/Button';

import './MarketTab.scss';

const MarketTab: React.FC = () => {
    const server = useContext(ServerContext);
    const [catalog, setCatalog] = useState<TMarketCatalog | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Новый флаг загрузки

    enum EMarketType {
        monster,
        item
    }

    // Загружаем данные каталога
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                console.log('Полученные данные каталога:', catalog);
                const catalogData = await server.getCatalog(); // Используем getCatalog
                if (!catalogData) {
                    throw new Error('Каталог не найден');
                }
                setCatalog(catalogData);
                setError(null); 
            } catch (e) {
                console.error('Ошибка при загрузке каталога:', catalog);
                setError('Ошибка загрузки каталога. Попробуйте позже.');
            } finally {
                setIsLoading(false);
            }
        })();
    }, [server]);

    // Обработчик покупки
    const handleBuy = async (id: number, type: EMarketType) => {
        try {
            console.log('Покупка началась:', { id, type });
            let success: boolean | null = false;
            if (type === EMarketType.monster) {
                console.log('Запрос на покупку существа:', { id });
                success = await server.buyItem(id.toString()); // Покупаем существо
            } else if (type === EMarketType.item) {
                console.log('Запрос на покупку ресурса:', { id });
                success = await server.buyItem(id.toString()); // Покупаем ресурс
            }

            if (success) {
                alert('Покупка успешна!');
                const updatedCatalog = await server.getCatalog(); // Обновление каталога
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
