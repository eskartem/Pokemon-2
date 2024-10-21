import React, { useReducer, useCallback } from 'react';
import { MarketVisibility } from './components/Enums/MarketVisibility';
import storeImage from './components/assets/Store.jpg';
import randomMarketImage from './components/assets/randomMarket.png';
import userMarketImage from './components/assets/MarketUser.jpg';
import exchangerImage from './components/assets/Exchanger.jpg';
import backArrow from './components/assets/strelka.png';
import Market from './components/Market/Market';
import { RandomMarket } from './components/Market/randomMarket';
import { UsersMarket } from './components/Market/UsersMarket';
import Exchanger from './components/Exchanger/Exchanger';
import './components/CSS/App.css';

// Тип для редюсера
type Action =
  | { type: 'SET_MARKET'; market: MarketVisibility }
  | { type: 'UPDATE_COINS'; coins: number }
  | { type: 'ADD_EGG' };

const initialState = {
  currentMarket: MarketVisibility.None,
  coins: 10000,
  eggs: 0,
};

// Редюсер для управления состоянием
const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'SET_MARKET':
      return { ...state, currentMarket: action.market };
    case 'UPDATE_COINS':
      return { ...state, coins: action.coins };
    case 'ADD_EGG':
      return { ...state, eggs: state.eggs + 1 };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openMarket = useCallback(() => {
    dispatch({ type: 'SET_MARKET', market: MarketVisibility.Market });
  }, []);

  const openRandomMarket = useCallback(() => {
    dispatch({ type: 'SET_MARKET', market: MarketVisibility.RandomMarket });
  }, []);

  const openUsersMarket = useCallback(() => {
    dispatch({ type: 'SET_MARKET', market: MarketVisibility.UsersMarket });
  }, []);

  const openExchanger = useCallback(() => {
    dispatch({ type: 'SET_MARKET', market: MarketVisibility.Exchanger });
  }, []);

  const closeMarket = useCallback(() => {
    dispatch({ type: 'SET_MARKET', market: MarketVisibility.None });
  }, []);

  const updateCoins = useCallback((newCoins: number) => {
    dispatch({ type: 'UPDATE_COINS', coins: newCoins });
  }, []);

  const addEgg = useCallback(() => {
    dispatch({ type: 'ADD_EGG' });
  }, []);

  const handlePokemonPurchase = useCallback((pokemonName: string, price: number) => {
    if (state.coins >= price) {
      dispatch({ type: 'UPDATE_COINS', coins: state.coins - price });
    } else {
      alert('Недостаточно монет!');
    }
  }, [state.coins]);

  const { currentMarket, coins, eggs } = state;

  return (
    <div>
      {currentMarket === MarketVisibility.None && (
        <div className="market-buttons">
          <img src={storeImage} alt="Store" className="store-image" onClick={openMarket} />
          <img src={randomMarketImage} alt="Random Market" className="random-market-image" onClick={openRandomMarket} />
          <img src={userMarketImage} alt="User Market" className="user-market-image" onClick={openUsersMarket} />
          <img src={exchangerImage} alt="Exchanger" className="exchanger-image" onClick={openExchanger} />
        </div>
      )}
      {(currentMarket === MarketVisibility.Market || currentMarket === MarketVisibility.RandomMarket || currentMarket === MarketVisibility.UsersMarket || currentMarket === MarketVisibility.Exchanger) && (
        <div>
          <img src={backArrow} alt="Back to Store" onClick={closeMarket} className="back-arrow" />
          <div className="coins-display">
            <h3>Монеты: {coins}</h3>
            <h4>Яйца: {eggs}</h4>
          </div>
          {currentMarket === MarketVisibility.Market && (
            <Market coins={coins} updateCoins={updateCoins} />
          )}
          {currentMarket === MarketVisibility.RandomMarket && (
            <RandomMarket coins={coins} onPokemonPurchase={handlePokemonPurchase} />
          )}
          {currentMarket === MarketVisibility.UsersMarket && (
            <UsersMarket coins={coins} onPokemonPurchase={handlePokemonPurchase} />
          )}
          {currentMarket === MarketVisibility.Exchanger && (
            <Exchanger coins={coins} updateCoins={updateCoins} addEgg={addEgg} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
