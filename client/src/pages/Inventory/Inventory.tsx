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

    const backClickHandler = () => setPage(PAGES.GAME);

    const [allPokemons, setAllPokemons] = useState<TCreature[]>([]);
    const [userResources, setUserResources] = useState<TResource[]>([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // Получение данных об инвентаре
                const inventory = await server.getInventory(TOKEN);
                if (!inventory) return;

                // Преобразование данных для соответствия TCreature
                const transformedPokemons: TCreature[] = inventory.monsters.map((monster) => {
                    const monsterType = inventory.monsterTypes.find(mt => mt.id === monster.monster_type_id);
                    if (!monsterType) 
                    return null;

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
                console.error('Error fetching inventory:', error);
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
                        <p>AD: {pokemon.stats.ad}</p>
                        <p>DF: {pokemon.stats.df}</p>
                        <Button
                            text="Выбрать"
                            onClick={() => console.log(`Выбран покемон: ${pokemon.name}`)}
                        />
                        <Button onClick={backClickHandler} text='назад' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
