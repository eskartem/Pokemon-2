import React, { useContext, useState, useEffect } from 'react';
import { ServerContext } from '../../App';
import { TResources } from '../../services/server/types';
import Button from '../../components/Button/Button';
import './TraderTab.scss';

const TOKEN = 'user-token';

const TraderTab: React.FC = () => {
    const server = useContext(ServerContext);
    const [resources, setResources] = useState<TResources[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const fetchResources = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await server.getCatalog(TOKEN); 
            console.log(response);
            if (!response || !Array.isArray(response)) {
                throw new Error('Не удалось загрузить данные с сервера');
            }
            setResources(response);
        } catch {
            setError('Ошибка при загрузке ресурсов');
        } finally {
            setLoading(false);
        }
    };

    // Продажа ресурса
    const sellResource = async (id: string, name: string) => {
        const amountToSell = prompt(`Введите количество ${name} для продажи:`); // Диалог для ввода количества

        if (!amountToSell || isNaN(Number(amountToSell)) || Number(amountToSell) <= 0) {
            alert('Введите корректное количество!');
            return;
        }

        try {
            const response = await server.sell(TOKEN, id, amountToSell); 
            if (!response) throw new Error('Ресурс не продан');
            alert(`Успешно продано ${amountToSell} ресурса`);
            fetchResources();
        } catch (err) {
            setError('Ошибка при продаже ресурса');
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!resources.length) return <div>Ресурсы отсутствуют</div>;

    return (
        <div className="trader-tab">
            <h1>Торговец</h1>
            <div className="trader-resources">
                {resources.map(({ id, name, cost }) => (
                    <div className="trader-resource" key={id}>
                        <h3>Ресурс: {name}</h3>
                        <p>Стоимость: {cost} монет</p>
                        <Button
                            text="Продать"
                            onClick={() => sellResource(id.toString(), name)} 
                            isDisabled={false} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TraderTab;