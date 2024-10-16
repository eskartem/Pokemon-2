import React, { Component } from 'react';
import { Market } from './components/Market/Market';
import { RandomMarket } from './components/Market/randomMarket';
import storeImage from './components/assets/Store.jpg';
import randomMarketImage from './components/assets/randomMarket.png';
import pikachuImage from './components/assets/Pikachu.png';
import backArrow from './components/assets/strelka.png';
import { MarketVisibility } from './components/Enums/MarketVisibility';
import './components/CSS/App.css';

interface AppState {
  currentMarket: MarketVisibility;
  purchasedPokemons: { [key: string]: number };
  coins: number;
  inflationRates: { [key: string]: number };
  showPokemonList: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentMarket: MarketVisibility.None,
      purchasedPokemons: {},
      coins: 100,
      inflationRates: {
        Pikachu: 1.0,
        Charmander: 1.0,
        Bulbasaur: 1.0,
        Squirtle: 1.0,
      },
      showPokemonList: false,
    };
  }

  openMarket = () => {
    this.setState({ currentMarket: MarketVisibility.Market });
  };

  closeMarket = () => {
    this.setState({ currentMarket: MarketVisibility.None });
  };

  openRandomMarket = () => {
    this.setState({ currentMarket: MarketVisibility.RandomMarket });
  };

  closeRandomMarket = () => {
    this.setState({ currentMarket: MarketVisibility.None });
  };

  togglePokemonList = () => {
    this.setState(prevState => ({ showPokemonList: !prevState.showPokemonList }));
  };

  handlePokemonPurchase = (pokemonName: string, price: number) => {
    this.setState(prevState => ({
      purchasedPokemons: {
        ...prevState.purchasedPokemons,
        [pokemonName]: (prevState.purchasedPokemons[pokemonName] || 0) + 1,
      },
      coins: prevState.coins - price,
      inflationRates: {
        ...prevState.inflationRates,
        [pokemonName]: prevState.inflationRates[pokemonName] + 0.1,
      },
    }));
  };

  render() {
    const { currentMarket, coins, inflationRates, purchasedPokemons, showPokemonList } = this.state;

    return (
      <div>
        {currentMarket === MarketVisibility.None && (
          <div className="market-buttons">
            <img
              src={storeImage}
              alt="Store"
              className="store-image"
              onClick={this.openMarket}
            />
            <img
              src={randomMarketImage}
              alt="Random Market"
              className="random-market-image"
              onClick={this.openRandomMarket}
            />
          </div>
        )}
        {currentMarket === MarketVisibility.Market && (
          <div className="market-container">
            <img
              src={backArrow}
              alt="Back to Store"
              onClick={this.closeMarket}
              className="back-arrow"
            />
            <img
              src={pikachuImage}
              alt="Pikachu"
              className="pikachu-image"
              onClick={this.togglePokemonList} // По клику показываем или скрываем список
            />
            {showPokemonList && ( // Если showPokemonList === true, показываем Market
              <Market
                coins={coins}
                inflationRates={inflationRates}
                onPokemonPurchase={this.handlePokemonPurchase}
              />
            )}
            <div className="purchased-pokemons">
              <h3>Купленные покемоны:</h3>
              <ul>
                {Object.keys(purchasedPokemons).map(pokemon => (
                  <li key={pokemon}>
                    {pokemon}: {purchasedPokemons[pokemon]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {currentMarket === MarketVisibility.RandomMarket && (
          <div className="random-market-container">
            <img
              src={backArrow}
              alt="Back to Store"
              onClick={this.closeRandomMarket}
              className="back-arrow"
            />
            <RandomMarket
              coins={coins}
              onPokemonPurchase={this.handlePokemonPurchase}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
