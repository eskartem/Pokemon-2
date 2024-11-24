import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../../App';
import { TTraderCatalog } from '../../services/server/types';
import Button from '../Button/Button';

import './TraderTab.scss';

const TraderTab: React.FC = () => {
  const server = useContext(ServerContext); // Используем контексты
  const [TraderCatalog, setTraderCatalog] = useState<TTraderCatalog | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Загружаем данные каталога торговца
  useEffect(() => {
    (async () => {
      try {
        const catalogData = await server.getTraderCatalog();
        setTraderCatalog(catalogData);
      } catch (e) {
        setError('Ошибка загрузки каталога торговца');
      }
    })();
  }, [server]);

  // Обработчик покупки
  const handleBuy = async (id: number) => {
    try {
      const success = await server.buyTraderId(id.toString());
      if (success) {
        alert('Покупка успешна!');
        const updatedTraderCatalog = await server.getTraderCatalog();
        setTraderCatalog(updatedTraderCatalog);
      } else {
        alert('Не удалось выполнить покупку.');
      }
    } catch (err) {
      console.error('Ошибка при покупке:', err);
      alert('Произошла ошибка при выполнении покупки.');
    }
  };

  if (!TraderCatalog) {
    return <div>{error || 'Ошибка'}</div>;
  }

  return (
    <div id="test-trader-tab-container">
      <h2>Торговец</h2>
      <div className="trader-catalog">
        {TraderCatalog.resources.map((item) => (
          <div className="trader-item" key={item.id}>
            <div>
              <strong>{item.name}</strong>
            </div>
            <div>Количество: {item.number}</div>
            <div>Цена: {item.cost} монет</div>
            <Button
              text="Купить"
              onClick={() => handleBuy(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraderTab;