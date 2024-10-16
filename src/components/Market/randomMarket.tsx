import React from 'react';
import '../CSS/randomMarket.css';

interface RandomMarketProps {
  coins: number;
  onPokemonPurchase: (pokemonName: string, price: number) => void;
}

interface PokemonType {
  id: number;
  name: string;
  basePrice: number;
}

const initialPokemons: PokemonType[] = [
  { id: 1, name: "Pikachu", basePrice: 10 },
  { id: 2, name: "Charmander", basePrice: 15 },
  { id: 3, name: "Bulbasaur", basePrice: 12 },
  { id: 4, name: "Squirtle", basePrice: 8 },
];

export const RandomMarket: React.FC<RandomMarketProps> = ({ coins, onPokemonPurchase }) => {
  const buyRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * initialPokemons.length);
    const randomPokemon = initialPokemons[randomIndex];
    const fixedPrice = 5; // Фиксированная цена 5 монет

    if (coins >= fixedPrice) {
      onPokemonPurchase(randomPokemon.name, fixedPrice);
      alert(`Вы купили случайного покемона: ${randomPokemon.name} за ${fixedPrice} монет!`);
    } else {
      alert('Недостаточно монет!');
    }
  };

  return (
    <div className="random-market">
      <h2>Случайный Магазин</h2>
      <button className="buy-button" onClick={buyRandomPokemon}>
        Купить случайного покемона за 5 монет
      </button>
    </div>
  );
};
