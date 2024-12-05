import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../../App';
import { TSell } from '../../services/server/types';
import Button from '../../components/Button/Button';

const TraderTab: React.FC = () => {
  const server = useContext(ServerContext); // Используем контекст сервера
  const [catalog, setCatalog] = useState<TSell | null>(null);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      const fetchedCatalog = await server.sell('merchant', '0', '');
      if (fetchedCatalog) {
        setCatalog(fetchedCatalog);
      }
    };
    fetchCatalog();
  }, [server]);

  const handleResourceSelect = (resource: string) => {
    setSelectedResource(resource);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleSell = async () => {
    if (selectedResource && amount > 0) {
      const result = await server.sell('merchant', '0', ' ');
      if (result) {
        setMessage(`Успешно продано ${amount} ${selectedResource}`);
        // Обновляем состояние или показываем сообщение об успешной продаже
        const updatedCatalog = await server.sell('merchant', '0', '');
        if (updatedCatalog) {
          setCatalog(updatedCatalog);
        }
      } else {
        setMessage('Ошибка при продаже');
      }
    }
  };

  return (
    <div id="trader-tab-container">
      <h2>Торговец</h2>
      {message && <div>{message}</div>}
      <div>
        <h3>Доступные ресурсы для продажи:</h3>
        <ul>
          {catalog &&
            Object.keys(catalog).map((resource) => (
              <li key={resource}>
                <Button
                  text={resource}
                  onClick={() => handleResourceSelect(resource)}
                />
              </li>
            ))}
        </ul>
      </div>
      {selectedResource && (
        <div>
          <h3>Продажа {selectedResource}:</h3>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Количество"
          />
          <Button text="Продать" onClick={handleSell} />
        </div>
      )}
    </div>
  );
};

export default TraderTab;