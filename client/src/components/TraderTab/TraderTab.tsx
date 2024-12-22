import React, { useContext, useState, useEffect } from 'react';
import { ServerContext } from '../../App';
import { TResources, TResource } from '../../services/server/types';
import Button from '../../components/Button/Button';
import './TraderTab.scss';

const TOKEN = 'user-token';

const TraderTab: React.FC = () => {
    const server = useContext(ServerContext);
    const [resources, setResources] = useState<TResources[]>([]);
    const [inventory, setInventory] = useState<TResource[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [sellingResource, setSellingResource] = useState<{ id: string; name: string } | null>(null);
    const [amountToSell, setAmountToSell] = useState<string>("");
    const [sellError, setSellError] = useState<string>("");

    const crystals = inventory.find(item => item.resource_id === 1)?.resource_amount || 0;
    const eggs = inventory.find(item => item.resource_id === 2)?.resource_amount || 0;
    const shells = inventory.find(item => item.resource_id === 3)?.resource_amount || 0;

    const fetchResources = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await server.getCatalog();
            const inventoryResponse = await server.getInventory(); 

            if (!response || !Array.isArray(response) || !inventoryResponse) {
                throw new Error('Ошибка получения данных');
            }

            setResources(response);
            setInventory(inventoryResponse.inventory || []); 
        } catch {
            setError('Ошибка загрузки ресурсов');
        } finally {
            setLoading(false);
        }
    };

    const sellResource = async () => {
        setSellError(''); 
    
        if (!sellingResource) return;
    
        const { id } = sellingResource;
        const parsedAmount = Number(amountToSell);
    
        if (!amountToSell || isNaN(parsedAmount) || parsedAmount <= 0 || amountToSell.startsWith('0') && amountToSell !== '0') {
            setSellError('Введите корректное количество!');
            return;
        }
    
        const inventoryResource = inventory.find(
            (resource) => resource.resource_id === Number(id)
        );
    
        if (!inventoryResource || inventoryResource.resource_amount < parsedAmount) {
            setSellError('Недостаточно ресурсов в инвентаре!');
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
                {resources.map(({ id, name, cost }) => {
                    let resourceAmount = 0;

                    if (id === 1) resourceAmount = crystals;
                    else if (id === 2) resourceAmount = eggs;
                    else if (id === 3) resourceAmount = shells;

                    const hasSufficientResources = resourceAmount > 0;

                    return (
                        <div className="trader-resource" key={id} id={`test-resource-${id}`}>
                            <h3 id={`test-resource-name-${id}`}>Ресурс: {name}</h3>
                            <p id={`test-resource-cost-${id}`}>Стоимость: {cost} монет</p>
                            <Button
                                id={`test-sell-button-${id}`}
                                text={hasSufficientResources ? 'Продать' : 'Недостаточно ресурсов'}
                                onClick={() => {
                                    if (hasSufficientResources) {
                                        setSellError("");
                                        setSellingResource({ id: id.toString(), name });
                                    }
                                }}
                                isDisabled={!hasSufficientResources || sellingResource !== null}
                            />
                        </div>
                    );
                })}
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
                        isDisabled={!amountToSell || Number(amountToSell) <= 0} 
                    />
                    <Button
                        id="test-cancel-sell-button"
                        text="Отмена"
                        onClick={() => {
                            setSellError("");
                            setSellingResource(null);
                        }}
                        isDisabled={false}
                    />
                </div>
            )}
        </div>
    );
};

export default TraderTab;