import React from 'react';
import { Pokemon } from '../Pokemon/Pokemon';
import '../CSS/Market.css';

interface MarketProps {
  coins: number;
  inflationRates: { [key: string]: number };
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

export const Market: React.FC<MarketProps> = ({ coins, inflationRates, onPokemonPurchase }) => {
  const [pokemons] = React.useState<PokemonType[]>(initialPokemons);

  const buyPokemon = (id: number, price: number, name: string) => {
    const inflationRate = inflationRates[name] || 1.0;
    const adjustedPrice = Math.round(price * inflationRate);
    const finalPrice = Math.round(adjustedPrice * 1.1);  // Комиссия 10%

    if (coins >= finalPrice) {
      onPokemonPurchase(name, finalPrice);
      alert(`Вы купили ${name} за ${finalPrice} монет (включая комиссию 10%)!`);
    } else {
      alert("Недостаточно монет!");
    }
  };

  return (
    <div className="market">
      <p>Монеты: {coins}</p>
      <h2>Доступные покемоны</h2>
      <div className="pokemon-list">
        {pokemons.map(pokemon => (
          <Pokemon
            key={pokemon.id}
            pokemon={pokemon}
            inflationRate={inflationRates[pokemon.name]}
            onBuy={() => buyPokemon(pokemon.id, pokemon.basePrice, pokemon.name)}
            canBuy={coins >= Math.round(pokemon.basePrice * inflationRates[pokemon.name] * 1.1)} // Цена с учетом комиссии
          />
        ))}
      </div>
    </div>
  );
};
