import React, { Component } from 'react';
import { MarketVisibility } from './components/Enums/MarketVisibility';
import { pokemonDescriptions } from './components/Pokemon/pokemonDescriptions';
import PikachuBuy from './components/assets/PikachuBuy.jpg';
import CharmanderBuy from './components/assets/CharmanderBuy.jpg';
import BulbasaurBuy from './components/assets/BulbasaurBuy.jpg';
import SquirtleBuy from './components/assets/SquirtleBuy.jpg';
import storeImage from './components/assets/Store.jpg';
import randomMarketImage from './components/assets/randomMarket.png';
import backArrow from './components/assets/strelka.png';
import { Market } from './components/Market/Market';
import { RandomMarket } from './components/Market/randomMarket';
import './components/CSS/App.css';

interface AppState {
  currentMarket: MarketVisibility;
  purchasedPokemons: { [key: string]: number };
  coins: number;
  inflationRates: { [key: string]: number };
  selectedPokemon: 'Pikachu' | 'Charmander' | 'Bulbasaur' | 'Squirtle' | null;
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
      selectedPokemon: null,
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

  handlePokemonPurchase = (pokemonName: string, price: number) => {
    // Дополнительная проверка на случай, если цена будет выше доступных монет
    if (this.state.coins >= price) {
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
    } else {
      alert("Недостаточно монет!");
    }
  };

  handleIconClick = (pokemon: 'Pikachu' | 'Charmander' | 'Bulbasaur' | 'Squirtle') => {
    this.setState({ selectedPokemon: pokemon });
  };

  renderPokemonInfo = () => {
    const { selectedPokemon } = this.state;
    if (!selectedPokemon) return null;

    return (
      <div className="pokemon-info">
        <h2>{selectedPokemon}</h2>
        <p>{pokemonDescriptions[selectedPokemon]}</p>
        <button
          className="buy-button"
          onClick={() => this.handlePokemonPurchase(selectedPokemon, Math.round(10 * this.state.inflationRates[selectedPokemon]))}
        >
          Купить за {Math.round(10 * this.state.inflationRates[selectedPokemon])} монет
        </button>
      </div>
    );
  };

  render() {
    const { currentMarket, coins, inflationRates, purchasedPokemons } = this.state;

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
            <div className="coins-display">
              <h3>Монеты: {coins}</h3>
            </div>
            <div className="pokemon-icons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <img
                src={PikachuBuy}
                alt="Pikachu"
                className="pokemon-icon"
                style={{ width: '50px', height: '50px', marginBottom: '10px' }}
                onClick={() => this.handleIconClick('Pikachu')}
              />
              <img
                src={CharmanderBuy}
                alt="Charmander"
                className="pokemon-icon"
                style={{ width: '50px', height: '50px', marginBottom: '10px' }}
                onClick={() => this.handleIconClick('Charmander')}
              />
              <img
                src={BulbasaurBuy}
                alt="Bulbasaur"
                className="pokemon-icon"
                style={{ width: '50px', height: '50px', marginBottom: '10px' }}
                onClick={() => this.handleIconClick('Bulbasaur')}
              />
              <img
                src={SquirtleBuy}
                alt="Squirtle"
                className="pokemon-icon"
                style={{ width: '50px', height: '50px', marginBottom: '10px' }}
                onClick={() => this.handleIconClick('Squirtle')}
              />
            </div>
            {this.renderPokemonInfo()}
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
