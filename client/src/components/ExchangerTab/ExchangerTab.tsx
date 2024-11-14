import React, { useState, useContext, useEffect } from 'react'; 
import ExchangerImage from '../../assets/ExchangerImage/Exchanger.jpg';
import MeanExchangerImage from '../../assets/ExchangerImage/MeanExchangerImage.jpg'; 
import Button from '../../components/Button/Button';
import { ServerContext, StoreContext } from '../../App';
import './ExchangerTab.scss';

const ExchangerTab: React.FC = () => {
  const serverContext = useContext(ServerContext);
  const storeContext = useContext(StoreContext);
  
  const user = storeContext.getUser(); // Получаем данные пользователя из store

  const [eggFragments, setEggFragments] = useState<number>(user?.eggFragments || 0);
  const [canExchange, setCanExchange] = useState<boolean>(false);
  const [exchangeStatus, setExchangeStatus] = useState<string>('');
  const [exchangerImage, setExchangerImage] = useState<string>(ExchangerImage);

  // Проверка количества кусков яиц и обновление состояния
  useEffect(() => {
    const checkExchangeAvailability = () => {
      if (eggFragments >= 50) {
        setCanExchange(true);
        setExchangeStatus('У вас достаточно кусков яиц для обмена.');
        setExchangerImage(ExchangerImage); 
      } else {
        setCanExchange(false);
        setExchangeStatus('Пошел отсюда, бомж. Приходи, когда соберешь необходимое количество кусков яиц!');
        setExchangerImage(MeanExchangerImage); 
      }
    };
    checkExchangeAvailability();
  }, [eggFragments]);

  // Функция для обработки обмена
  const handleExchange = async () => {
    if (canExchange) {
      try {
        const result = await serverContext.exchangeEggsForPokemon(); 
        if (result.success) {
          const newEggFragments = eggFragments - 50;
          if (user) {
            setEggFragments(newEggFragments);
          
            storeContext.setUser({
              ...user,
              eggFragments: newEggFragments,
              token: user.token ?? ''
            });
          }
          setExchangeStatus('Поздравляем! Вы получили яйцо покемона.');
        } else {
          setExchangeStatus('Произошла ошибка при обмене. Попробуйте снова.');
        }
      } catch (error) {
        setExchangeStatus('Ошибка сервера. Пожалуйста, попробуйте позже.');
      }
    }
  };

  return (
    <div className="exchanger-container" id="test-exchanger-tab-container">      
      <img 
        src={exchangerImage} 
        alt="Exchanger" 
        className="exchanger-image" 
        id="test-exchanger-image" 
      />
      <h2 className="exchange-status">{exchangeStatus}</h2>
      <h3 className="fragments-status">
        У вас доступно {eggFragments} кусков яиц из 50.
      </h3>
      <Button 
        text="Обменять на яйцо"
        isDisabled={!canExchange}  // Кнопка активна только если достаточно кусков
        onClick={handleExchange}
        className="exchange-button"
      />
    </div>
  );
};

export default ExchangerTab;
