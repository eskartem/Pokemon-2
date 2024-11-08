import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../../App';
import { TMarketCatalog } from '../../services/server/types';
import Button from '../Button/Button';

const TraderTab: React.FC = () => {
    const server = useContext(ServerContext); // Используем контекст
    const [catalog, setCatalog] = useState<TMarketCatalog | null>(null);

    useEffect(() => {
        (async () => {
            const data = await server.getTraderCatalog();
            setCatalog(data);
        })();
    }, [server]);

    const handleBuy = async (id: string) => {
        const success = await server.buyFromTrader(id);
        if (success) {
            alert('Покупка успешна!');
            window.location.reload();
        } else {
            alert('Ошибка при покупке.');
        }
    };

    return (
        <div>
            {catalog?.creatures.map((creature) => (
                <div key={creature.id}>
                    <h3>{creature.name}</h3>
                    <p>Цена: {creature.cost}</p>
                    <Button onClick={() => handleBuy(creature.id.toString())} text="Купить" />
                </div>
            ))}
        </div>
    );
};

export default TraderTab;