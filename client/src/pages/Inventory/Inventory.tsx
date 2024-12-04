import React, { useState, useEffect, useContext } from 'react';
import Button from '../../components/Button/Button';
import { TCreature, TUserResources } from '../../services/server/types';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager'; 
import './Inventory.scss';

const Inventory: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const backClickHandler = () => setPage(PAGES.GAME);
    const server = useContext(ServerContext);
    const [allPokemons] = useState<TCreature[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<TCreature | null>(null);
    const [userResources, setUserResources] = useState<TUserResources | null>(null);

    useEffect(() => {
        async function fetchData() {
            // сюда еще про покемоны, но нет баттла в server.ts
            const resources = await server.userInfo();
            if (resources) {
                setUserResources(resources);
            }
        }
        fetchData();
    }, [server]);

    const handleUpgrade = async () => {
        if (!selectedPokemon) return;
        const success = await server.upgradePokemon(selectedPokemon.id);
        if (success) {
            alert('Покемон улучшен!');
        } else {
            alert('Недостаточно ресурсов, бомж!');
        }
    };

    const handleStats = () => {
        // в дальнейшем
    };

    return (
        <div className="inventory">
            <div className="resources">
                {userResources ? (
                    <>
                        <p>Ресурсы: {userResources.Inventory}</p>
                    </>
                ) : (
                    <p>Загрузка ресурсов...</p>
                )}
            </div>

            <div className="all-pokemons">
                <h3>Все покемоны:</h3>
                {allPokemons.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className={`pokemon ${selectedPokemon?.id === pokemon.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPokemon(pokemon)}
                    >
                        {pokemon.name} (Ур. {pokemon.lvl})
                    </div>
                ))}
            </div>

            <div className="actions">
                <Button onClick={handleUpgrade} text="Улучшить"  />
                <Button onClick={handleStats} text="Статистика" />
                <Button onClick={backClickHandler} text='назад' />
            </div>
        </div>
    );
};

export default Inventory;
