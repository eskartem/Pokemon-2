import React, { useState, useEffect, useContext } from 'react';
import Button from '../../components/Button/Button';
import { TResource, TStats, TCr } from '../../services/server/types';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import './Inventory.scss';
import Crystals from '../../assets/img/Ruby.png';
import Eggs from '../../assets/img/Egg.png';
import Shells from '../../assets/img/EggBreak.png';

const TOKEN = 'user-token';

const Inventory: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);

    const [allPokemons, setAllPokemons] = useState<TCr[]>([]);
    const [availableMonsterTypes, setAvailableMonsterTypes] = useState<any[]>([]); 
    const [userResources, setUserResources] = useState<TResource[]>([]); 
    const [selectedPokemon, setSelectedPokemon] = useState<TCr | null>(null);
    const [battleTeam, setBattleTeam] = useState<TCr[]>([]); 
    const [loading, setLoading] = useState<boolean>(false);

    const backClickHandler = () => setPage(PAGES.GAME);

    const fetchInventory = async () => {
        setLoading(true);
        try {
            const inventory = await server.getInventory();
            if (!inventory) return;

            const transformedPokemons: TCr[] = inventory.monsters.map((monster) => {
                const monsterType = inventory.monsters.find(mt => mt.id === monster.id);
                if (!monsterType) return null;

                const stats: TStats = {
                    current_hp: monster.current_hp,
                    max_HP: monster.max_HP,
                    ATK: monsterType.ATK,
                    DEF: monsterType.DEF,
                };

                return {
                    id: monster.id, 
                    name: monsterType.name,
                    level: monster.level,
                    element: monsterType.element, 
                    stats,
                    status: monster.status || 'not in team', 
                    current_hp: monsterType.current_hp,
                    max_HP: monsterType.max_HP,
                    ATK: monsterType.ATK,
                    DEF: monsterType.DEF,
                };
            }).filter((pokemon): pokemon is TCr => pokemon !== null);

            const uniquePokemons = transformedPokemons.reduce((acc, pokemon) => {
                if (!acc.some(p => p.id === pokemon.id)) {
                    acc.push(pokemon);
                }
                return acc;
            }, [] as TCr[]);

            setAllPokemons(uniquePokemons);
            setAvailableMonsterTypes(inventory.monsters);
            setUserResources(inventory.inventory);

            const team = uniquePokemons.filter(pokemon => pokemon.status === 'in team');
            setBattleTeam(team);

        } catch (error) {
            console.error('Ошибка при получении инвентаря:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [server]);

    const upgradePokemonHandler = async (pokemonId: number) => {
        try {
            const pokemonToUpgrade = allPokemons.find(pokemon => pokemon.id === pokemonId);
            if (!pokemonToUpgrade) {
                console.error('Покемон для улучшения не найден');
                return;
            }

            const upgradedPokemon = await server.upgradePokemon(TOKEN, pokemonToUpgrade.id);

            if (upgradedPokemon) {
                setAllPokemons((prev) => 
                    prev.map(pokemon => 
                        pokemon.id === pokemonToUpgrade.id 
                            ? { ...pokemon, level: upgradedPokemon.level, stats: upgradedPokemon.stats } 
                            : pokemon
                    )
                );
                fetchInventory(); 
            }
        } catch (error) {
            console.error('Ошибка обновления покемонов:', error);
        }
    };

    const selectPokemonHandler = (pokemon: TCr) => {
        if (!pokemon) return;
        setSelectedPokemon(pokemon);
    };

    const replaceInBattleTeam = async (index: number, newPokemon: TCr | null) => {
        if (!newPokemon) return;
    
        try {
            const oldPokemon = battleTeam[index];
            if (oldPokemon) {
                await server.removeFromTeam(TOKEN, oldPokemon.id);
            }
    
            const result = await server.addToTeam(TOKEN, newPokemon.id);
            if (result) {
                const updatedTeam = [...battleTeam];
                updatedTeam[index] = result;
                setBattleTeam(updatedTeam);
    
                setAllPokemons((prev) =>
                    prev.map((pokemon) =>
                        pokemon.id === newPokemon.id ? { ...pokemon, status: 'in team' } :
                        pokemon.id === oldPokemon?.id ? { ...pokemon, status: 'not in team' } : pokemon
                    )
                );
    
                fetchInventory();
            }
        } catch (error) {
            console.error('Ошибка замены покемона в команде:', error);
        }
    };

    const getResourceName = (resourceId: number) => {
        switch (resourceId) {
            case 1:
                return "Кристаллы";
            case 2:
                return "Яйца";
            case 3:
                return "Скорлупа";
            default:
                return "Неизвестный ресурс";
        }
    };

    const getResourceImage = (resourceId: number) => {
        switch (resourceId) {
            case 1:
                return Crystals;
            case 2:
                return Eggs;
            case 3:
                return Shells;
            default:
                return undefined;
        }
    };

    const pokemonsNotInTeam = allPokemons.filter(pokemon => pokemon.status !== 'in team');

    return (
        <div className="inventory" id="test-inventory-page">
            <h1 id="test-inventory-title">Инвентарь</h1>
            {loading && <p id="test-loading-indicator">Загрузка...</p>}

            <div id="test-resources-line">
                {userResources.map((res) => (
                    <span key={res.resource_id} id={`test-resource-${res.resource_id}`}>
                        <img src={getResourceImage(res.resource_id)} alt={getResourceName(res.resource_id)} />
                        {getResourceName(res.resource_id)}: {res.resource_amount}
                    </span>
                ))}
            </div>

            <div className="battle-team" id="test-battle-team-section">
                <h2 id="test-battle-team-title">Команда для боя</h2>
                {battleTeam.map((pokemon, index) => (
                    <div key={pokemon.id} className="pokemon-card" id={`test-battle-team-pokemon-${index}`}>
                        <h2 id="test-pokemon-name">{pokemon?.name}</h2>
                        <p id="test-pokemon-level">Уровень: {pokemon?.level}</p>
                        <p id="test-pokemon-element">Элемент: {pokemon?.element}</p>
                        <p id="test-pokemon-current_hp">Current_hp: {pokemon.stats?.current_hp || 'N/A'}</p>
                        <p id="test-pokemon-max_HP">Max_hp: {pokemon.stats?.max_HP || 'N/A'}</p>
                        <p id="test-pokemon-ad">ATK: {pokemon.stats?.ATK || 'N/A'}</p>
                        <p id="test-pokemon-df">DEF: {pokemon.stats?.DEF || 'N/A'}</p>
                        <Button
                            id="test-replace-button"
                            text="Заменить"
                            onClick={() => replaceInBattleTeam(index, selectedPokemon)}
                        />
                        <Button
                            id="test-upgrade-button"
                            text="Улучшить"
                            onClick={() => upgradePokemonHandler(pokemon.id)}
                        />
                    </div>
                ))}
            </div>

            <div className="pokemon-list" id="test-pokemon-list-section">
                <h2 id="test-pokemon-list-title">Покемоны не в команде</h2>
                {pokemonsNotInTeam.map((pokemon, index) => (
                    <div key={pokemon.id} className="pokemon-card" id={`test-pokemon-card-${index}`}>
                        <h2 id="test-pokemon-name">{pokemon.name}</h2>
                        <p id="test-pokemon-level">Уровень: {pokemon.level}</p>
                        <p id="test-pokemon-element">Элемент: {pokemon.element}</p>
                        <p id="test-pokemon-current_hp">Current_hp: {pokemon.stats?.current_hp || 'N/A'}</p>
                        <p id="test-pokemon-max_HP">Max_hp: {pokemon.stats?.max_HP || 'N/A'}</p>
                        <p id="test-pokemon-ad">ATK: {pokemon.stats?.ATK || 'N/A'}</p>
                        <p id="test-pokemon-df">DEF: {pokemon.stats?.DEF || 'N/A'}</p>
                        <Button
                            id="test-upgrade-button"
                            text="Улучшить"
                            onClick={() => upgradePokemonHandler(pokemon.id)}
                        />
                        <Button
                            id="test-select-button"
                            text="Выбрать"
                            onClick={() => selectPokemonHandler(pokemon)}
                        />
                    </div>
                ))}
            </div>

            <Button id="test-back-button" onClick={backClickHandler} text='назад' />
        </div>
    );
};

export default Inventory;