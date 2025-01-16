import React, { useState, useEffect, useContext } from 'react';
import Button from '../../components/Button/Button';
import { TResource, TStats, TCr } from '../../services/server/types';
import blobfishfire from '../../assets/characters/blob_fish_water.png';
import frog_water from '../../assets/characters/frog_water.png';
import meatboy_fire from '../../assets/characters/meatboy_fire.png';
import lizard_fire from '../../assets/characters/lizard_fire.png';
import emoboy_fire from '../../assets/characters/emoboy_fire.png';
import worm_earth from '../../assets/characters/worm_earth.png';
import bee_earth from '../../assets/characters/bee_earth.png';
import mushroom_earth from '../../assets/characters/mushroom_earth.png';
import cat_lit_energy_air from '../../assets/characters/cat_lit_energy_air.png';
import elephant_air from '../../assets/characters/elephant_air.png';
import InfoModal from '../../components/InfoModal/InfoModal'; 
import question from '../../assets/img/question.png';
import bear_air from '../../assets/characters/bear_air.png';
import crystalImage from '../../assets/img/crystal.png';
import eggImage from '../../assets/img/Egg.png'; 
import eggShellImage from '../../assets/img/egg_shell.png';
import butterflyWaterImage from '../../assets/characters/butterfly_water.png';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import './Inventory.scss';


const Inventory: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);

    const [allPokemons, setAllPokemons] = useState<TCr[]>([]);
    const [availableMonsterTypes, setAvailableMonsterTypes] = useState<any[]>([]); 
    const [userResources, setUserResources] = useState<TResource[]>([]); 
    const [selectedPokemon, setSelectedPokemon] = useState<TCr | null>(null);
    const [selectedPokemonForReplace, setSelectedPokemonForReplace] = useState<TCr | null>(null); 
    const [battleTeam, setBattleTeam] = useState<TCr[]>([]); 
    const [loading, setLoading] = useState<boolean>(false);
    const [replacedPokemonIndex, setReplacedPokemonIndex] = useState<number | null>(null);
    const [upgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);
    const [upgradeInfo, setUpgradeInfo] = useState<any>(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

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
                    asset: monsterType.asset, 
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
        } finally {
            setLoading(false);
        }
    };

    const handleOpenInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    useEffect(() => {
        fetchInventory();
    }, [server]);

    const openUpgradeModal = async (pokemonId: number) => {
        const info = await server.getInfoAboutUpgrade(pokemonId);
        setUpgradeInfo(info);
        setUpgradeModalOpen(true);
        setSelectedPokemon(allPokemons.find(pokemon => pokemon.id === pokemonId) || null);
    };

    const closeUpgradeModal = () => {
        setUpgradeModalOpen(false);
        setUpgradeInfo(null);
    };

    const upgradePokemonHandler = async (pokemonId: number) => {
        if (!pokemonId) return;

        try {
            const pokemonToUpgrade = allPokemons.find(pokemon => pokemon.id === pokemonId);
            if (!pokemonToUpgrade) return;
    
            if (pokemonToUpgrade.level === 5) return;
    
            const crystalResource = userResources.find(res => res.resource_id === 1);
            const crystalAmount = crystalResource ? crystalResource.resource_amount : 0;
            const requiredCrystals = getRequiredCrystals(pokemonToUpgrade.level);
    
            if (crystalAmount < requiredCrystals) return;
    
            const upgradedPokemon = await server.upgradePokemon(pokemonId);
    
            if (upgradedPokemon) {
                setAllPokemons((prev) => 
                    prev.map(pokemon => 
                        pokemon.id === pokemonId 
                            ? { ...pokemon, level: upgradedPokemon.level, stats: upgradedPokemon.stats } 
                            : pokemon
                    )
                );
                fetchInventory(); 
            }
        } catch (error) {
        } finally {
            closeUpgradeModal();
        }
    };

    const selectPokemonHandler = (pokemon: TCr) => {
        if (!pokemon) return;
        setSelectedPokemonForReplace(pokemon); 
    };

    const replaceInBattleTeam = async (index: number, newPokemon: TCr | null) => {
        if (!newPokemon) return;
    
        try {
            const oldPokemon = battleTeam[index];
            if (oldPokemon) {
                await server.removeFromTeam(oldPokemon.id);
            }
    
            const result = await server.addToTeam(newPokemon.id);
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
                setReplacedPokemonIndex(index);
                setSelectedPokemonForReplace(null); 
                fetchInventory();
            }
        } catch (error) {
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

    const getResourceImage = (resourceId: number): string | undefined => {
        const resourceImageMap: Record<number, string> = {
            1: crystalImage,
            2: eggImage,
            3: eggShellImage,
        };
    
        return resourceImageMap[resourceId];
    };

    const getPokemonImage = (assetPath: string): string | undefined => {
        if (!assetPath) {
            return undefined;
        }
    
        const imageMap: Record<string, string> = {
            '../../assets/characters/butterfly_water.png': butterflyWaterImage,
            '../../assets/characters/blob_fish_water.png': blobfishfire,
            '../../assets/characters/frog_water.png': frog_water,
            '../../assets/characters/meatboy_fire.png': meatboy_fire,
            '../../assets/characters/lizard_fire.png': lizard_fire,
            '../../assets/characters/emoboy_fire.png': emoboy_fire,
            '../../assets/characters/worm_earth.png': worm_earth,
            '../../assets/characters/bee_earth.png': bee_earth,
            '../../assets/characters/mushroom_earth.png': mushroom_earth,
            '../../assets/characters/cat_lit_energy_air.png': cat_lit_energy_air,
            '../../assets/characters/elephant_air.png': elephant_air,
            '../../assets/characters/bear_air.png': bear_air,
        };
    
        const normalizedPath = assetPath.replace(/\\/g, '/');
    
        if (!imageMap[normalizedPath]) {
        }
    
        return imageMap[normalizedPath] || undefined;
    };

    const pokemonsNotInTeam = allPokemons.filter(pokemon => pokemon.status !== 'in team');

    const getUpgradeButtonText = (pokemon: TCr) => {
        const crystalResource = userResources.find(res => res.resource_id === 1);
        const crystalAmount = crystalResource ? crystalResource.resource_amount : 0;

        if (pokemon.level === 5) {
            return "Макс уровень";
        } else if (crystalAmount < getRequiredCrystals(pokemon.level)) {
            return "Недостаточно ресурсов";
        } else {
            return "Улучшить";
        }
    };

    const getRequiredCrystals = (level: number) => {
        switch (level) {
            case 1:
                return 10;
            case 2:
                return 20;
            case 3:
                return 100;
            case 4:
                return 500;
            default:
                return Infinity;
        }
    };

    const isUpgradeButtonDisabled = (pokemon: TCr) => {
        const crystalResource = userResources.find(res => res.resource_id === 1);
        const crystalAmount = crystalResource ? crystalResource.resource_amount : 0;
    
        return pokemon.level === 5 || crystalAmount < getRequiredCrystals(pokemon.level);
    };

    return (
        <div className="inventory-container">
            <div className="inventory" id="test-inventory-page">
                <h1 id="test-inventory-title">Инвентарь</h1>
                <img
                    src={question}
                    onClick={handleOpenInfoModal}
                    className="info-icon" 
                    id="test-info-icon" 
                />
                <InfoModal
                    isOpen={isInfoModalOpen}
                    onClose={handleCloseInfoModal}
                    title="Инвентарь"
                    content="Здесь ты можешь выбрать себе команду или улучшить покемонов"
                    id="test-inventory-info-modal"
                />
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
                            <img src={getPokemonImage(pokemon.asset)} alt={pokemon.name} className="pokemon-image" />
                            <h2 id="test-pokemon-name">{pokemon?.name}</h2>
                            <p id="test-pokemon-level">Уровень: {pokemon?.level}</p>
                            <p id="test-pokemon-element">Стихия: {pokemon?.element}</p>
                            <p id="test-pokemon-max_HP">Здоровье: {pokemon.stats?.max_HP || 'N/A'}</p>
                            <p id="test-pokemon-ad">Атака: {pokemon.stats?.ATK || 'N/A'}</p>
                            <p id="test-pokemon-df">Защита: {pokemon.stats?.DEF || 'N/A'}</p>
                            {selectedPokemonForReplace && (
                                <Button
                                    id="test-replace-button"
                                    text="Заменить"
                                    onClick={() => replaceInBattleTeam(index, selectedPokemonForReplace)}
                                    isDisabled={replacedPokemonIndex === index}
                                />
                            )}
                            <Button
                                id="test-upgrade-button"
                                text={getUpgradeButtonText(pokemon)}
                                onClick={() => {
                                    if (!isUpgradeButtonDisabled(pokemon)) {
                                        openUpgradeModal(pokemon.id);
                                    }
                                }}
                                isDisabled={isUpgradeButtonDisabled(pokemon)}
                            />
                        </div>
                    ))}
                </div>
    
                <div className="pokemon-list" id="test-pokemon-list-section">
                    <h2 id="test-pokemon-list-title">Покемоны не в команде</h2>
                    {pokemonsNotInTeam.map((pokemon, index) => (
                        <div key={pokemon.id} className="pokemon-card" id={`test-pokemon-card-${index}`}>
                            <img src={getPokemonImage(pokemon.asset)} alt={pokemon.name} />
                            <h2 id="test-pokemon-name">{pokemon.name}</h2>
                            <p id="test-pokemon-level">Уровень: {pokemon.level}</p>
                            <p id="test-pokemon-element">Стихия: {pokemon.element}</p>
                            <p id="test-pokemon-max_HP">Здоровье: {pokemon.stats?.max_HP || 'N/A'}</p>
                            <p id="test-pokemon-ad">Атака: {pokemon.stats?.ATK || 'N/A'}</p>
                            <p id="test-pokemon-df">Защита: {pokemon.stats?.DEF || 'N/A'}</p>
                            <Button
                                id="test-upgrade-button"
                                text={getUpgradeButtonText(pokemon)}
                                onClick={() => {
                                    if (!isUpgradeButtonDisabled(pokemon)) {
                                        openUpgradeModal(pokemon.id);
                                    }
                                }}
                                isDisabled={isUpgradeButtonDisabled(pokemon)}
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
    
            {upgradeModalOpen && (
                <div className="upgrade-modal">
                    <div className="upgrade-modal-content">
                        <h2>Вы точно хотите улучшить?</h2>
                        <img src={getPokemonImage(upgradeInfo.image)} alt={upgradeInfo.name} />
                        <p>Имя: {upgradeInfo.name}</p>
                        <p>Уровень: {selectedPokemon?.level} {'→'} {upgradeInfo.level}</p>
                        <p>Стоимость: {upgradeInfo.cost} кристаллов</p>
                        <Button
                            id="test-upgrade-confirm-button" 
                            className="upgrade-confirm-button"
                            text="Улучшить"
                            onClick={() => {
                                upgradePokemonHandler(selectedPokemon?.id || 0);
                            }}
                        />
                        <Button
                            id="test-upgrade-cancel-button"  
                            className="upgrade-cancel-button"
                            text="Отмена"
                            onClick={closeUpgradeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;