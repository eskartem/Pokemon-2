import React, { useState, useEffect, useContext } from 'react';
import Button from '../../components/Button/Button';
import { TCreature, TInventory } from '../../services/server/types';
import { ServerContext } from '../../App';
import { IBasePage } from '../PageManager';
import './Inventory.scss';

const Inventory: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);

    const [allPokemons, setAllPokemons] = useState<TCreature[]>([]);
    const [userResources, setUserResources] = useState<TInventory[]>([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // Получение данных об инвентаре
                const inventory = await server.getInventory();
                if (!inventory) return;

                // Преобразование данных о покемонах
                const pokemons: TCreature[] = inventory.monsters.map((monster) => ({
                    name: monster.monster_type_id === 1 ? 'Рыба капля' : 'Эмобойчик',
                    lvl: monster.level,
                    element: monster.monster_type_id, // Используем monster_type_id как элемент
                    stats: {
                        hp: monster.hp,
                        attack: monster.monster_type_id === 1 ? 100 : 140, // Прямое сопоставление
                        defense: monster.monster_type_id === 1 ? 40 : 45,
                    },
                }));

                setAllPokemons(pokemons);
                setUserResources(inventory.inventory);
            } catch (error) {
                console.error('Ошибка при загрузке инвентаря:', error);
            }
        };

        fetchInventory();
    }, [server]);

    return (
        <div className="inventory">
            <h1>Инвентарь</h1>
            <div className="pokemon-list">
                {allPokemons.map((pokemon, index) => (
                    <div key={index} className="pokemon-card">
                        <h2>{pokemon.name}</h2>
                        <p>Уровень: {pokemon.lvl}</p>
                        <p>Элемент: {pokemon.element}</p>
                        <p>HP: {pokemon.stats.hp}</p>
                        <Button
                            text="Выбрать"
                            onClick={() => console.log(`Выбран покемон: ${pokemon.name}`)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
