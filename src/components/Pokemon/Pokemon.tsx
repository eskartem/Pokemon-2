import React from 'react';
import '../CSS/Pokemon.css';

interface PokemonProps {
  pokemon: {
    id: number;
    name: string;
    basePrice: number;
  };
  inflationRate: number;
  onBuy: () => void;
  canBuy: boolean;
}

export const Pokemon: React.FC<PokemonProps> = ({ pokemon, inflationRate, onBuy, canBuy }) => {
  const price = Math.round(pokemon.basePrice * inflationRate * 1.1); // Цена с комиссией

  return (
    <div className="pokemon">
      <span>{pokemon.name} - {price} монет</span>
      <button
        className={`button ${canBuy ? 'can-buy' : 'cannot-buy'}`}
        onClick={onBuy}
        disabled={!canBuy}
      >
        Купить
      </button>
    </div>
  );
};
