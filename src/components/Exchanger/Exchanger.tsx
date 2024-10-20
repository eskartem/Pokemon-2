import React from 'react';
import ExchangerImage from '../assets/Exchanger.jpg';
import '../CSS/Exchanger.css';

interface ExchangerProps {
  coins: number;
  updateCoins: (newCoins: number) => void;
  addEgg: () => void;
}

const Exchanger: React.FC<ExchangerProps> = ({ coins, updateCoins, addEgg }) => {
  const exchangeForEgg = () => {
    if (coins >= 50) {
      updateCoins(coins - 50);
      addEgg();
    } else {
      alert('Недостаточно монет для обмена на яйцо!');
    }
  };

  return (
    <div className="exchanger-container">
      <img src={ExchangerImage} alt="Exchanger" className="exchanger-image" />
      <button className="exchange-button" onClick={exchangeForEgg}>
        Обменять 50 монет на яйцо
      </button>
    </div>
  );
};

export default Exchanger;
