import React, { useContext, useState, useEffect } from 'react';
import { ServerContext } from '../../App';
import { TLots } from '../../services/server/types';
import Button from '../../components/Button/Button';

import './MarketTab.scss';

const MarketTab: React.FC = () => {
    const server = useContext(ServerContext);
    const [catalog, setCatalog] = useState<TLots[] | null>(null);

    useEffect(() => {
        (async () => {
            const catalogData = await server.getAllLots();
            if (catalogData) {
                setCatalog(catalogData); 
            } else {
                setCatalog(null);
            }
        })();
    }, [server]);

    // Обработчик покупки
    const handleBuy = async (id: number) => {
        const result = await server.buyItem(id.toString());
        if (result) {
            // Обновление каталога
            const updatedCatalog = await server.getAllLots();
            if (updatedCatalog) {
                setCatalog(updatedCatalog); 
            } else {
                setCatalog(null);
            }
        }
    };

    if (!catalog) {
        return <div>Рынок не загружен</div>;
    }

    return (
        <div className="market-tab">
            <div className="lots">
                {catalog.map(lot => (
                    <div key={lot.id} className="lot">
                        <h3>{lot.seller_name}</h3>
                        <p>Дата: {new Date(lot.datatime * 1000).toLocaleString()}</p>
                        <p>Начальная цена: {lot.start_cost}</p>
                        <p>Шаг: {lot.step_cost}</p>
                        <p>Текущая цена: {lot.current_cost}</p>
                        <p>Время обновления цены: {new Date(lot.timestamp_cost * 1000).toLocaleString()}</p>
                        <p>Покупатель: {lot.buyer_name || 'Нет'}</p>
                        <p>Статус: {lot.status}</p>
                        <Button onClick={() => handleBuy(lot.id)} text="Купить" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketTab;
