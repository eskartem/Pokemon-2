import React from 'react'; 
import PikachuBuy from '../assets/PikachuBuy.jpg';
import CharmanderBuy from '../assets/CharmanderBuy.jpg';
import BulbasaurBuy from '../assets/BulbasaurBuy.jpg';
import SquirtleBuy from '../assets/SquirtleBuy.jpg';
import { pokemonDescriptions } from '../Pokemon/pokemonDescriptions';
import '../CSS/Market.css';

interface MarketProps {
  coins: number;
  updateCoins: (newCoins: number) => void;
}

interface MarketState {
  inflationRates: { [key: string]: number };
  purchasedPokemons: { [key: string]: number };
  selectedPokemon: 'Pikachu' | 'Charmander' | 'Bulbasaur' | 'Squirtle' | null;
}

class Market extends React.Component<MarketProps, MarketState> {
  constructor(props: MarketProps) {
    super(props);
    this.state = {
      inflationRates: {
        Pikachu: 10.0,
        Charmander: 30.0,
        Bulbasaur: 50.0,
        Squirtle: 100.0,
      },
      purchasedPokemons: {},
      selectedPokemon: null,
    };
  }

  calculatePriceWithCommission = (basePrice: number) => {
    return Math.round(basePrice * 1.1);
  };

  handlePokemonPurchase = (pokemonName: string, basePrice: number) => {
    const priceWithCommission = this.calculatePriceWithCommission(basePrice);
    if (this.props.coins >= priceWithCommission) {
      this.setState((prevState) => ({
        purchasedPokemons: {
          ...prevState.purchasedPokemons,
          [pokemonName]: (prevState.purchasedPokemons[pokemonName] || 0) + 1,
        },
        inflationRates: {
          ...prevState.inflationRates,
          [pokemonName]: prevState.inflationRates[pokemonName] + 0.1,
        },
      }));
      this.props.updateCoins(this.props.coins - priceWithCommission);
    } else {
      alert('Недостаточно монет!');
    }
  };

  selectPokemon = (pokemon: 'Pikachu' | 'Charmander' | 'Bulbasaur' | 'Squirtle') => {
    this.setState({ selectedPokemon: pokemon });
  };

  renderPokemonInfo = () => {
    const { selectedPokemon } = this.state;
    if (!selectedPokemon) return null;

    const basePrice = 10 * this.state.inflationRates[selectedPokemon];
    const priceWithCommission = this.calculatePriceWithCommission(basePrice);

    return (
      <div className="pokemon-info">
        <h2>{selectedPokemon}</h2>
        <p>{pokemonDescriptions[selectedPokemon]}</p>
        <button
          className="buy-button"
          onClick={() => this.handlePokemonPurchase(selectedPokemon, basePrice)}
        >
          Купить за {priceWithCommission} монет
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="market-content">
        <div className="pokemon-icons">
          <img
            src={PikachuBuy}
            alt="Pikachu"
            className="pokemon-icon"
            onClick={() => this.selectPokemon('Pikachu')}
          />
          <img
            src={CharmanderBuy}
            alt="Charmander"
            className="pokemon-icon"
            onClick={() => this.selectPokemon('Charmander')}
          />
          <img
            src={BulbasaurBuy}
            alt="Bulbasaur"
            className="pokemon-icon"
            onClick={() => this.selectPokemon('Bulbasaur')}
          />
          <img
            src={SquirtleBuy}
            alt="Squirtle"
            className="pokemon-icon"
            onClick={() => this.selectPokemon('Squirtle')}
          />
        </div>
        {this.renderPokemonInfo()}
        <div className="purchased-pokemons">
          <h3>Купленные покемоны:</h3>
          <ul>
            {Object.keys(this.state.purchasedPokemons).map((pokemon) => (
              <li key={pokemon}>
                {pokemon}: {this.state.purchasedPokemons[pokemon]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Market;
