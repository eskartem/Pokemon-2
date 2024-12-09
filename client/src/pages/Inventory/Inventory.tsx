import React, { useState, useEffect, useContext } from 'react';
import Button from '../../components/Button/Button';
import { TCreature, TUserResources } from '../../services/server/types';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager'; 
import './Inventory.scss';

export enum TABS {
    INVENTORY
}

const Inventory: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const backClickHandler = () => setPage(PAGES.GAME);
    const server = useContext(ServerContext);
    const [allPokemons] = useState<TCreature[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<TCreature | null>(null);
    const [userResources, setUserResources] = useState<TUserResources[]>([]);
    const [tab, setTab] = useState<TABS>(TABS.INVENTORY);

    useEffect(() => {
        async function fetchData() {
            try {
                const resources = await server.userInfo();
    
                if (resources) {
                    if (Array.isArray(resources)) {
                        setUserResources(resources);
                    } else if (typeof resources === 'object') {
                        setUserResources([resources]);
                    } else {
                        console.error('Unexpected data format:', resources);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch user resources:', error);
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

    const getResourceAmount = (type: string) => {
        const resource = userResources.find(res => res.resource_type === type);
        return resource ? resource.resource : 0;
    };

    return (
        <div className="inventory">
            <div className="resources">
                {userResources.length > 0 ? (
                    <>
                        <p>Монеты: {getResourceAmount('')}</p>
                        <p>Яйца: {getResourceAmount('eggs')}</p>
                        <p>Фрагменты яиц: {getResourceAmount('eggFragments')}</p>
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
                <Button onClick={handleUpgrade} text="Улучшить" />
                <Button onClick={handleStats} text="Статистика" />
                <Button onClick={backClickHandler} text="Назад" />
            </div>
        </div>
    );
};

export default Inventory;
