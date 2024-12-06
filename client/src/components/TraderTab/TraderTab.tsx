import React, { useContext, useState, useEffect } from 'react';
import { ServerContext } from '../../App';
import { TLots, EStatus } from '../../services/server/types';
import Button from '../../components/Button/Button';
import './TraderTab.scss';

const TOKEN = 'user-token'; 

const TraderTab: React.FC = () => {
    const server = useContext(ServerContext);
    const [lots, setLots] = useState<TLots[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    // Получение списка лотов
    const fetchLots = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await server.getAllLots();
            if (!response) throw new Error('Не удалось загрузить данные с сервера');
            setLots(response);
        } catch {
            setError('Ошибка при загрузке лотов');
        } finally {
            setLoading(false);
        }
    };

    // Продажа лота
    const sellItem = async (id: number) => {
        try {
            const response = await server.sell(TOKEN, id.toString(), '1');
            if (!response) throw new Error('Лот не продан');
            alert(`Успешно продан лот с ID: ${id}`);
            fetchLots();
        } catch {
            setError('Ошибка при продаже лота');
        }
    };

    useEffect(() => {
        fetchLots();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!lots.length) return <div>Лоты отсутствуют</div>;

    return (
        <div className="trader-tab">
            <h1>Торговец</h1>
            <div className="trader-lots">
                {lots.map(({ id, seller_name, current_cost, step_cost, status }) => (
                    <div className="trader-lot" key={id}>
                        <h3>Продавец: {seller_name}</h3>
                        <p>Текущая цена: {current_cost} монет</p>
                        <p>Шаг цены: {step_cost} монет</p>
                        <p>Статус: {EStatus[status]}</p>
                        <Button
                            text="Продать"
                            onClick={() => sellItem(id)}
                            isDisabled={status !== EStatus.open}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TraderTab;
