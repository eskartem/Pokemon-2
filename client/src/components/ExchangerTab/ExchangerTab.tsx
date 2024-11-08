import React, { useContext } from 'react';
import ExchangerImage from '../../assets/ExchangerImage/Exchanger.jpg';
import { ServerContext } from '../../App';
import Button from '../Button/Button';
import { TExchanger } from '../../services/server/types';
import './ExchangerTab.scss';

interface ExchangerProps extends TExchanger {}
const ExchangerTab: React.FC<ExchangerProps> = ({ requiredCoins, updateCoins, addEgg, coins }) => {
const serverContext = useContext(ServerContext); // Контекст сервера, если нужен для работы обменника
  const exchangeForEgg = () => {
    if (coins >= requiredCoins) {
      updateCoins(coins - requiredCoins);
      addEgg();
    } else {
      alert('Недостаточно монет для обмена на яйцо!');
    }
  };
  return (
    <div className="exchanger-container">
      <img src={ExchangerImage} alt="Exchanger" className="exchanger-image" />
      <Button
        className="exchange-button"
        onClick={exchangeForEgg}
        text={`Обменять ${requiredCoins} монет на яйцо`}
        isDisabled={coins < requiredCoins} // Отключаем кнопку, если недостаточно монет
      />
    </div>
  );
};
export default ExchangerTab;