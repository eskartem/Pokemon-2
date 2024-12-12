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
    const [resources, setResources] = useState<string[]>([]);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const response = await server.getCatalog(TOKEN);
            if (Array.isArray(response)) setResources(response);
            else throw new Error();
        } catch {
            setError('Ошибка при загрузке ресурсов');
        } finally {
            setLoading(false);
        }
    };

    const handleExchange = async () => {
        try {
            const success = await server.sellExchanger(TOKEN, '50');
            if (success) {
                alert('Поздравляем! Вы получили яйцо покемона.');
                fetchResources();
            } else throw new Error();
        } catch {
            setError('Ошибка при обмене ресурсов');
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;

    const hasSufficientResources = resources.includes('50');

    return (
        <div className="exchanger-container">
            <img 
                src={hasSufficientResources ? ExchangerImage : MeanExchangerImage} 
                alt="Exchanger" 
                className="exchanger-image" 
            />
            <Button 
                text={hasSufficientResources ? "Обменять на яйцо" : "Пошел отсюда, бомж. Приходи, когда соберешь необходимое количество кусков яиц!"} // Меняем текст на кнопке
                onClick={handleExchange}
                className="exchange-button"
                isDisabled={!hasSufficientResources}  
            />
        </div>
    );
};

export default ExchangerTab;
