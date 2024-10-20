import React, { Component } from 'react';
import { MarketVisibility } from './components/Enums/MarketVisibility';
import storeImage from './components/assets/Store.jpg';
import randomMarketImage from './components/assets/randomMarket.png';
import userMarketImage from './components/assets/MarketUser.jpg';
import exchangerImage from './components/assets/Exchanger.jpg';
import backArrow from './components/assets/strelka.png';
import { Market } from './components/Market/Market';
import { RandomMarket } from './components/Market/randomMarket';
import { UsersMarket } from './components/Market/UsersMarket';
import Exchanger from './components/Exchanger/Exchanger';
import './components/CSS/App.css';

interface AppState {
  currentMarket: MarketVisibility;
  coins: number;
  eggs: number;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentMarket: MarketVisibility.None,
      coins: 10000,
      eggs: 0,
    };
  }
  
  openMarket = () => {
    this.setState({ currentMarket: MarketVisibility.Market });
  };

  openRandomMarket = () => {
    this.setState({ currentMarket: MarketVisibility.RandomMarket });
  };

  openUsersMarket = () => {
    this.setState({ currentMarket: MarketVisibility.UsersMarket });
  };

  openExchanger = () => {
    this.setState({ currentMarket: MarketVisibility.Exchanger });
  };

  closeMarket = () => {
    this.setState({ currentMarket: MarketVisibility.None });
  };

  updateCoins = (newCoins: number) => {
    this.setState({ coins: newCoins });
  };

  addEgg = () => {
    this.setState((prevState) => ({
      eggs: prevState.eggs + 1,
    }));
  };

  handlePokemonPurchase = (pokemonName: string, price: number) => {
    if (this.state.coins >= price) {
      this.setState((prevState) => ({
        coins: prevState.coins - price,
      }));
    } else {
      alert('Недостаточно монет!');
    }
  };

  render() {
    const { currentMarket, coins, eggs } = this.state;

    return (
      <div>
        {currentMarket === MarketVisibility.None && (
          <div className="market-buttons">
            <img src={storeImage} alt="Store" className="store-image" onClick={this.openMarket} />
            <img src={randomMarketImage} alt="Random Market" className="random-market-image" onClick={this.openRandomMarket} />
            <img src={userMarketImage} alt="User Market" className="user-market-image" onClick={this.openUsersMarket} />
            <img src={exchangerImage} alt="Exchanger" className="exchanger-image" onClick={this.openExchanger} />
          </div>
        )}
        {(currentMarket === MarketVisibility.Market || currentMarket === MarketVisibility.RandomMarket || currentMarket === MarketVisibility.UsersMarket || currentMarket === MarketVisibility.Exchanger) && (
          <div>
            <img src={backArrow} alt="Back to Store" onClick={this.closeMarket} className="back-arrow" />
            <div className="coins-display">
              <h3>Монеты: {coins}</h3>
              <h4>Яйца: {eggs}</h4>
            </div>
            {currentMarket === MarketVisibility.Market && (
              <Market coins={coins} updateCoins={this.updateCoins} />
            )}
            {currentMarket === MarketVisibility.RandomMarket && (
              <RandomMarket coins={coins} onPokemonPurchase={this.handlePokemonPurchase} />
            )}
            {currentMarket === MarketVisibility.UsersMarket && (
              <UsersMarket coins={coins} onPokemonPurchase={this.handlePokemonPurchase} />
            )}
            {currentMarket === MarketVisibility.Exchanger && (
              <Exchanger coins={coins} updateCoins={this.updateCoins} addEgg={this.addEgg} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
