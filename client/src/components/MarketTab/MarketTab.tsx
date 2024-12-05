import React, { useContext, useState, useEffect } from 'react'; 
import { ServerContext } from '../../App';
import { TLot } from '../../services/server/types';

import './MarketTab.scss';

const MarketTab: React.FC = () => {
    const server = useContext(ServerContext);
    const [catalog, setCatalog] = useState<TLot[] | null>(null);

    // Загружаем данные каталога
    useEffect(() => {
        (async () => {
            const catalogData = await server.getMarket();
            setCatalog(catalogData);
        })();
    });

    // Обработчик покупки
    const handleBuy = async (id: number) => { // перепиши по новой, для измененых данных
        // try {
        //     console.log('Покупка началась:', { id, type });
        //     let success: boolean | null = false;
        //     if (type === EMarketType.monster) {
        //         console.log('Запрос на покупку существа:', { id });
        //         success = await server.buyItem(id.toString()); // Покупаем существо
        //     } else if (type === EMarketType.item) {
        //         console.log('Запрос на покупку ресурса:', { id });
        //         success = await server.buyItem(id.toString()); // Покупаем ресурс
        //     }

        //     if (success) {
        //         alert('Покупка успешна!');
        //         const updatedCatalog = await server.getMarket(); // Обновление каталога
        //         setCatalog(updatedCatalog);
        //     } else {
        //         alert('Не удалось выполнить покупку.');
        //     }
        // } catch (err) {
        //     console.error('Ошибка при покупке:', err);
        //     alert('Произошла ошибка при выполнении покупки.');
        // }
    };

    if (!catalog) {
        return <div> рынок не загружен</div>;
    }

    return (
        <div className="market-tab">
            <div className="lots">
                {/* нужно сюда добавить через метод catalog.map( ... ) добаить надпись для каждого лота 
                с информацией по лоту учитывая тип TLot */}
            </div>
        </div>
    );
};

export default MarketTab;
