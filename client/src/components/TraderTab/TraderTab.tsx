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
    const [sellingResource, setSellingResource] = useState<{ id: string; name: string } | null>(null);
    const [amountToSell, setAmountToSell] = useState<string>("");
    const [sellError, setSellError] = useState<string>("");

    const fetchResources = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await server.getCatalog(TOKEN);
            if (!response || !Array.isArray(response)) {
                throw new Error('');
            }
            setResources(response);
        } catch {
            setError('');
        } finally {
            setLoading(false);
        }
    };

    const sellResource = async () => {
        if (!sellingResource) return;

        const { id } = sellingResource;
        const parsedAmount = Number(amountToSell);

        if (!amountToSell || isNaN(parsedAmount) || parsedAmount <= 0) {
            setSellError('Введите корректное количество!');
            return;
        }

        try {
            const response = await server.sell(TOKEN, id, amountToSell);
            if (!response) throw new Error('Ресурс не продан');
            setSellError('');
            setSellingResource(null);
            setAmountToSell('');
            fetchResources();
        } catch (err) {
            setSellError('Ошибка при продаже ресурса');
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    if (loading) return <div id="test-loading-indicator">Загрузка...</div>;
    if (error) return <div className="error" id="test-error-message">{error}</div>;
    if (!resources.length) return <div id="test-no-resources-message">Ресурсы отсутствуют</div>;

    return (
        <div className="trader-tab" id="test-trader-tab">
            <h1 id="test-trader-title">Торговец</h1>
            <div className="trader-resources" id="test-trader-resources">
                {resources.map(({ id, name, cost }) => (
                    <div className="trader-resource" key={id} id={`test-resource-${id}`}>
                        <h3 id={`test-resource-name-${id}`}>Ресурс: {name}</h3>
                        <p id={`test-resource-cost-${id}`}>Стоимость: {cost} монет</p>
                        <Button
                            id={`test-sell-button-${id}`}
                            text="Продать"
                            onClick={() => setSellingResource({ id: id.toString(), name })}
                            isDisabled={false}
                        />
                    </div>
                ))}
            </div>

            {sellingResource && (
                <div className="sell-modal" id="test-sell-modal">
                    <h2>Продажа ресурса: {sellingResource.name}</h2>
                    <input
                        type="number"
                        placeholder="Введите количество"
                        value={amountToSell}
                        onChange={(e) => setAmountToSell(e.target.value)}
                        id="test-sell-input"
                    />
                    {sellError && <p className="error" id="test-sell-error">{sellError}</p>}
                    <Button
                        id="test-confirm-sell-button"
                        text="Подтвердить продажу"
                        onClick={sellResource}
                        isDisabled={false}
                    />
                    <Button
                        id="test-cancel-sell-button"
                        text="Отмена"
                        onClick={() => setSellingResource(null)}
                        isDisabled={false}
                    />
                </div>
            )}
        </div>
    );
};

export default TraderTab;