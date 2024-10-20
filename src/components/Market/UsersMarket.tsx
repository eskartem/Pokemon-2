import React, { useState } from 'react';
import { userSellers } from '../Users/Users';
import PikachuBuy from '../assets/PikachuBuy.jpg';
import CharmanderBuy from '../assets/CharmanderBuy.jpg';
import BulbasaurBuy from '../assets/BulbasaurBuy.jpg';
import SquirtleBuy from '../assets/SquirtleBuy.jpg';
import '../CSS/UsersMarket.css';

interface UsersMarketProps {
  coins: number;
  onPokemonPurchase: (pokemonName: string, price: number) => void;
}

export const UsersMarket: React.FC<UsersMarketProps> = ({ coins, onPokemonPurchase }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const handlePokemonClick = (pokemon: string) => {
    setSelectedPokemon(pokemon);
  };

  const handlePurchase = (pokemonName: string, price: number) => {
    if (coins >= price) {
      onPokemonPurchase(pokemonName, price);
    } else {
      alert('Недостаточно монет!');
    }
  };

  return (
    <div className="users-market">
      <h2>Магазин Пользователей</h2>
      <div className="pokemon-icons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <img
      src={PikachuBuy}
      alt="Pikachu"
      className="pokemon-icon"
      onClick={() => handlePokemonClick('Pikachu')}
    />
    <img
      src={CharmanderBuy}
      alt="Charmander"
      className="pokemon-icon"
      onClick={() => handlePokemonClick('Charmander')}
    />
    <img
      src={BulbasaurBuy}
      alt="Bulbasaur"
      className="pokemon-icon"
      onClick={() => handlePokemonClick('Bulbasaur')}
    />
    <img
      src={SquirtleBuy}
      alt="Squirtle"
      className="pokemon-icon"
      onClick={() => handlePokemonClick('Squirtle')}
    />

      </div>
      {selectedPokemon && (
        <div className="offers">
          <h3>Предложения для {selectedPokemon}</h3>
          {userSellers[selectedPokemon].map((seller, index) => (
            <button className="buy-button" key={index} onClick={() => handlePurchase(selectedPokemon, seller.price)}>
              {seller.name}: Купить за {seller.price} монет
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
