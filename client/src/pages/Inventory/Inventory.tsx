import React, { useState, useEffect, useContext } from 'react';  
import Button from '../../components/Button/Button';
import { TCreature, TResource, TStats, TMonsters_level } from '../../services/server/types';
import { ServerContext } from '../../App';
import firstHydroMonster from '../../assets/img_monster/firstHydroMonster.png';
import fourthHydroMonster from '../../assets/img_monster/fourthHydroMonster.png';
import { IBasePage, PAGES } from '../PageManager';
import './Inventory.scss';

const TOKEN = 'user-token';

const Inventory: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);

    const [allPokemons, setAllPokemons] = useState<TCreature[]>([]);
    const [userResources, setUserResources] = useState<TResource[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<TCreature | null>(null);
    const [battleTeam, setBattleTeam] = useState<TCreature[]>([]);

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
                        id: monster.id, 
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

    const upgradePokemonHandler = async (pokemonIndex: number) => {
        try {
            const pokemonToUpgrade = allPokemons[pokemonIndex];
            if (!pokemonToUpgrade) {
                console.error('Покемон для улучшения не найден');
                return;
            }

            const upgradedPokemon = await server.upgradePokemon(TOKEN, pokemonToUpgrade.id);

            if (upgradedPokemon) {
                setAllPokemons((prev) => {
                    const updatedPokemons = [...prev];
                    updatedPokemons[pokemonIndex] = {
                        ...pokemonToUpgrade,
                        lvl: upgradedPokemon.level,
                        stats: upgradedPokemon.stats, 
                    };
                    return updatedPokemons;
                });
            }
        } catch (error) {
            console.error('Ошибка обновления покемонов:', error);
        }
    };

    const selectPokemonHandler = (pokemon: TCreature) => {
        setSelectedPokemon(pokemon);
    };

    const addToBattleTeam = (pokemon: TCreature) => {
        if (battleTeam.length < 3) {
            setBattleTeam([...battleTeam, pokemon]);
        }
    };

    const replaceInBattleTeam = (index: number, newPokemon: TCreature) => {
        const updatedTeam = [...battleTeam];
        updatedTeam[index] = newPokemon;
        setBattleTeam(updatedTeam);
    };
    
    return (
        <div className="inventory">
            <h1>Инвентарь</h1>
            <div className="battle-team">
                <h2>Команда для боя</h2>
                {battleTeam.map((pokemon, index) => (
                    <div key={index} className="pokemon-card">
                        <h2>{pokemon.name}</h2>
                        <p>Уровень: {pokemon.lvl}</p>
                        <p>Элемент: {pokemon.element}</p>
                        <p>HP: {pokemon.stats?.hp || 'N/A'}</p>
                        <Button
                            text="Заменить"
                            onClick={() => replaceInBattleTeam(index, selectedPokemon!)}
                        />
                    </div>
                ))}
            </div>
            <div className="pokemon-list">
                {allPokemons.map((pokemon, index) => {
                    if (!pokemon) return null;
    
                    return (
                        <div key={index} className="pokemon-card">
                            <h2>{pokemon.name}</h2>
                            <p>Уровень: {pokemon.lvl}</p>
                            <p>Элемент: {pokemon.element}</p>
                            <p>HP: {pokemon.stats?.hp || 'N/A'}</p>
                            <p>AD: {pokemon.stats?.ad || 'N/A'}</p>
                            <p>DF: {pokemon.stats?.df || 'N/A'}</p>
                            <Button
                                text="Улучшить"
                                onClick={() => upgradePokemonHandler(index)}
                            />
                            <Button
                                text={selectedPokemon?.id === pokemon.id ? "Выбран" : "Выбрать"} 
                                onClick={() => selectPokemonHandler(pokemon)} 
                            />
                            <Button
                                text="Добавить в команду"
                                onClick={() => addToBattleTeam(pokemon)}
                            />
                        </div>
                    );
                })}
            </div>
            {selectedPokemon && (
                <div className="selected-pokemon">
                    <h2>Выбранный покемон:</h2>
                    <p>Имя: {selectedPokemon.name}</p>
                    <p>Уровень: {selectedPokemon.lvl}</p>
                    <p>Элемент: {selectedPokemon.element}</p>
                    <p>HP: {selectedPokemon.stats?.hp || 'N/A'}</p>
                    <p>AD: {selectedPokemon.stats?.ad || 'N/A'}</p>
                    <p>DF: {selectedPokemon.stats?.df || 'N/A'}</p>
                </div>
            )}
            <div className="back-button-container">
                <Button onClick={backClickHandler} text='Назад' />
            </div>
        </div>
    );
};

export default Inventory;