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
    const [availableMonsterTypes, setAvailableMonsterTypes] = useState<any[]>([]); 
    const [userResources, setUserResources] = useState<TResource[]>([]); 
    const [selectedPokemon, setSelectedPokemon] = useState<TCreature | null>(null);
    const [battleTeam, setBattleTeam] = useState<TCreature[]>([]); 
    const [showResources, setShowResources] = useState<boolean>(false); 
    const [loading, setLoading] = useState<boolean>(false);

    const backClickHandler = () => setPage(PAGES.GAME);

    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true);
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
                        status: monster.status || 'not in team', 
                    };
                }).filter((pokemon): pokemon is TCreature => pokemon !== null);

                const uniquePokemons = transformedPokemons.reduce((acc, pokemon) => {
                    if (!acc.some(p => p.id === pokemon.id)) {
                        acc.push(pokemon);
                    }
                    return acc;
                }, [] as TCreature[]);

                const userMonsterTypeIds = uniquePokemons.map(pokemon => pokemon.id);
                const missingMonsterTypes = inventory.monsterTypes.filter(mt => !userMonsterTypeIds.includes(mt.id));

                const missingPokemons: TCreature[] = missingMonsterTypes.map(mt => ({
                    id: mt.id,
                    name: mt.name,
                    lvl: mt.lvl, 
                    element: mt.element_id,
                    stats: {
                        hp: mt.hp,
                        ad: mt.attack,
                        df: mt.defense,
                    },
                    status: 'not in team',
                }));

                const allPokemons = [...uniquePokemons, ...missingPokemons];

                setAllPokemons(allPokemons);
                setAvailableMonsterTypes(inventory.monsterTypes);
                setUserResources(inventory.inventory);

                const team = allPokemons.filter(pokemon => pokemon.status === 'in team');
                setBattleTeam(team);

            } catch (error) {
                console.error('Ошибка при получении инвентаря:', error);
            } finally {
                setLoading(false);
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
        if (!pokemon) return;
        setSelectedPokemon(pokemon);
    };

    const addToBattleTeam = async (pokemon: TCreature) => {
        if (!pokemon || battleTeam.length >= 3 || battleTeam.some(p => p.id === pokemon.id)) return;
    
        console.log(`Добавляем монстра с id: ${pokemon.id}`);
    
        try {
            const result = await server.addToTeam(TOKEN, pokemon.id);
            if (result) {
                setBattleTeam([...battleTeam, result]);
            }
        } catch (error) {
            console.error('Ошибка добавления покемона в команду:', error);
        }
    };

    const replaceInBattleTeam = async (index: number, newPokemon: TCreature | null) => {
        if (!newPokemon) return;
        try {
            const result = await server.addToTeam(TOKEN, newPokemon.id);
            if (result) {
                const updatedTeam = [...battleTeam];
                updatedTeam[index] = result;
                setBattleTeam(updatedTeam);
            }
        } catch (error) {
            console.error('Ошибка замены покемона в команде:', error);
        }
    };


    const toggleResources = () => {
        setShowResources(prevState => !prevState);
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

    const pokemonsNotInTeam = allPokemons.filter(pokemon => pokemon.status !== 'in team');

    return (
        <div className="inventory">
            <h1>Инвентарь</h1>
            {loading && <p>Загрузка...</p>}
            <div className="battle-team">
                <h2>Команда для боя</h2>
                {battleTeam.map((pokemon, index) => (
                    <div key={pokemon.id} className="pokemon-card">
                        <h2>{pokemon?.name}</h2>
                        <p>Уровень: {pokemon?.lvl}</p>
                        <p>Элемент: {pokemon?.element}</p>
                        <p>HP: {pokemon?.stats?.hp || 'N/A'}</p>
                        <Button
                            text="Заменить"
                            onClick={() => replaceInBattleTeam(index, selectedPokemon)}
                        />
                    </div>
                ))}
            </div>
            <div className="pokemon-list">
                {pokemonsNotInTeam.length > 0 && (
                    <div>
                        <h2>Покемоны не в команде</h2>
                        {pokemonsNotInTeam.map((pokemon, index) => (
                            <div key={pokemon.id} className="pokemon-card">
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
                                    text="Добавить в команду"
                                    onClick={() => addToBattleTeam(pokemon)}
                                />
                                <Button
                                    text="Выбрать"
                                    onClick={() => selectPokemonHandler(pokemon)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            

            <Button text="Статистика" onClick={toggleResources} />
            {showResources && (
                <div className="resources-section">
                    <h2>Ресурсы игрока</h2>
                    <ul>
                        {userResources.map((res) => (
                            <li key={res.resource_id}>
                                {getResourceName(res.resource_id)}: {res.resource_amount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Button onClick={backClickHandler} text='назад' />
        </div>
    );
};

export default Inventory;