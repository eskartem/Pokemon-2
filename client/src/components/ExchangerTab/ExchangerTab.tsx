import React, { useContext, useEffect, useState } from 'react'; 
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import ExchangerImage from '../../assets/ExchangerImage/Exchanger.jpg';
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

    return (
        <div className="exchanger-container">
            <img 
                src={ExchangerImage} 
                alt="Exchanger" 
                className="exchanger-image" 
            />
            <Button 
                text="Обменять на яйцо"
                onClick={handleExchange}
                className="exchange-button"
            />
        </div>
    );
};

export default ExchangerTab;