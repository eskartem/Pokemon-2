import React, { useState, useEffect, useContext } from 'react';
import Button from '../../components/Button/Button';
import { TCreature, TResource, TStats } from '../../services/server/types';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import './Inventory.scss';

const TOKEN = 'user-token';

const Inventory: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);

    const [allPokemons, setAllPokemons] = useState<TCreature[]>([]);
    const [userResources, setUserResources] = useState<TResource[]>([]);
    const [showResources, setShowResources] = useState(false);

    const backClickHandler = () => setPage(PAGES.GAME);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const inventory = await server.getInventory(TOKEN);
                if (!inventory) return;

                const transformedPokemons: TCreature[] = inventory.monsters.map((monster) => {
                    const monsterType = inventory.monsterTypes.find(mt => mt.id === monster.monster_type_id);
                    if (!monsterType) return null;

                    const stats: TStats = {
                        hp: monster.hp,
                        ad: monsterType.attack,
                        df: monsterType.defense,
                    };

                    return {
                        name: monsterType.name,
                        lvl: monster.level,
                        element: monsterType.element_id, 
                        stats,
                    };
                }).filter((pokemon): pokemon is TCreature => pokemon !== null); 

                setAllPokemons(transformedPokemons);
                setUserResources(inventory.inventory);
            } catch (error) {
                console.error('Ошибка при получении инвентаря:', error);
            }
        };

        fetchInventory();
    }, [server]);

    const toggleResources = () => setShowResources((prev) => !prev);

    const upgradePokemonHandler = async (pokemonIndex: number) => {
        try {
            const pokemonToUpgrade = allPokemons[pokemonIndex];
            const upgradedPokemon = await server.upgradePokemon(TOKEN, pokemonIndex);

            if (upgradedPokemon) {
                setAllPokemons((prev) => {
                    const updatedPokemons = [...prev];
                    updatedPokemons[pokemonIndex] = upgradedPokemon;
                    return updatedPokemons;
                });
            }
        } catch (error) {
            console.error('Ошибка обновления покемонов:', error);
        }
    };

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
                        <p>AD: {pokemon.stats.ad}</p>
                        <p>DF: {pokemon.stats.df}</p>
                        <Button
                            text="Улучшить"
                            onClick={() => upgradePokemonHandler(index)}
                        />
                        <Button
                            text="Статистика"
                            onClick={toggleResources}
                        />
                        <Button onClick={backClickHandler} text='Назад' />
                    </div>
                ))}
            </div>
            {showResources && (
                <div className="resources-section">
                    <h2>Ресурсы игрока</h2>
                    <ul>
                        {userResources.map((res) => (
                            <li key={res.resource_id}>
                                Ресурс ID: {res.resource_id}, Количество: {res.resource_amount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Inventory;
