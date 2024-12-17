import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import ExchangerImage from '../../assets/ExchangerImage/Exchanger.jpg';
import MeanExchangerImage from '../../assets/ExchangerImage/MeanExchangerImage.jpg';
import './ExchangerTab.scss';

const TOKEN = 'user-token';

const ExchangerTab: React.FC = () => {
    const server = useContext(ServerContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [eggFragments, setEggFragments] = useState(0);

    const fetchResources = async () => {
        try {
            setLoading(true);

            const inventory = await server.getInventory(TOKEN);

            if (!inventory || !Array.isArray(inventory.inventory)) {
                throw new Error('Некорректные данные');
            }

            const eggFragmentResource = inventory.inventory.find(
                (resource) => resource.resource_id === 3
            );

            setEggFragments(eggFragmentResource ? eggFragmentResource.resource_amount : 0);
        } catch (error) {
            console.error('Ошибка при загрузке ресурсов:', error);
            setError('Ошибка при загрузке ресурсов');
        } finally {
            setLoading(false);
        }
    };

    const handleExchange = async () => {
        try {
            const success = await server.sellExchanger(TOKEN, '50'); 
            if (success) {
                fetchResources(); 
            } else {
                throw new Error('Ошибка обмена');
            }
        } catch (error) {
            console.error('Ошибка при обмене:', error);
            setError('Ошибка при обмене ресурсов');
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    if (loading) return <div id="test-loading-indicator">Загрузка...</div>;
    if (error) return <div className="error" id="test-error-message">{error}</div>;

    const hasSufficientResources = eggFragments >= 50;

    return (
        <div className="exchanger-container" id="test-exchanger-container">
            <img
                src={hasSufficientResources ? ExchangerImage : MeanExchangerImage}
                alt="Exchanger"
                className="exchanger-image"
                id="test-exchanger-image"
            />
            <Button
                text={
                    hasSufficientResources
                        ? 'Обменять на яйцо'
                        : 'Пошел отсюда, бомж. Приходи, когда соберешь необходимое количество кусков яиц!'
                }
                onClick={handleExchange}
                className="exchange-button"
                isDisabled={!hasSufficientResources}
                id={hasSufficientResources ? "test-exchange-button" : "test-exchange-button-disabled"}
            />
        </div>
    );
};

export default ExchangerTab;
