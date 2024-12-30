import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import { THatchedResponse, THashEgg } from '../../services/server/types';
import InfoModal from '../../components/InfoModal/InfoModal';
import question from '../../assets/img/question.png';
import ExchangerImage from '../../assets/ExchangerImage/Exchanger.jpg';
import MeanExchangerImage from '../../assets/ExchangerImage/MeanExchangerImage.jpg';
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
import bear_air from '../../assets/characters/bear_air.png';
import butterflyWaterImage from '../../assets/characters/butterfly_water.png';
import './ExchangerTab.scss';

const ExchangerTab: React.FC = () => {
    const server = useContext(ServerContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [eggFragments, setEggFragments] = useState(0);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isHatchModalOpen, setIsHatchModalOpen] = useState(false);
    const [hatchedPokemon, setHatchedPokemon] = useState<THatchedResponse | null>(null);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const inventory = await server.getInventory();
            if (!inventory || !Array.isArray(inventory.inventory)) {
                throw new Error('Некорректные данные');
            }
            const eggFragmentResource = inventory.inventory.find(
                (resource) => resource.resource_id === 3
            );
            setEggFragments(eggFragmentResource ? eggFragmentResource.resource_amount : 0);
        } finally {
            setLoading(false);
        }
    };

    const handleExchange = async () => {
        if (!hasSufficientResources) {
            setError('');
            return;
        }
        try {
            const success = await server.sellExchanger('50');
            if (success) {
                fetchResources();
            } else {
                throw new Error('Ошибка обмена');
            }
        } catch (error) {
            setError('Произошла ошибка при обмене');
        }
    };

    const handleOpenInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    const handleHatchEgg = async () => {
        try {
            const result = await server.hatchEgg();
            if (result) {
                setHatchedPokemon(result);
                setIsHatchModalOpen(true);
            }
        } catch (error) {
            setError('Произошла ошибка при вылуплении покемона');
        }
    };

    const handleCloseHatchModal = () => {
        setIsHatchModalOpen(false);
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
        return imageMap[normalizedPath] || undefined;
    };


    useEffect(() => {
        fetchResources();
    }, []);

    if (error) return <div className="error" id="test-error-message">{error}</div>;

    const hasSufficientResources = eggFragments >= 50;

    return (
        <div className="exchanger-container" id="test-exchanger-container">
            <img
                src={question}
                onClick={handleOpenInfoModal}
                className="info-icon"
                id="test-info-icon"
            />
            <InfoModal
                isOpen={isInfoModalOpen}
                onClose={handleCloseInfoModal}
                title="Обменник"
                content="Позволяет обменивать 50 кусков яиц на одно яйцо покемона. Куски яиц можно собирать в активностях для получения новых покемонов"
                id="test-info-modal"
            />
            <img
                src={hasSufficientResources ? ExchangerImage : MeanExchangerImage}
                alt="Exchanger"
                className="exchanger-image"
                id="test-exchanger-image"
            />
            <Button
                text={
                    hasSufficientResources
                        ? 'Обменять на яйцо'
                        : 'Пошел отсюда, бомж. Приходи, когда соберешь необходимое количество кусков яиц!'
                }
                onClick={handleExchange}
                className="exchange-button"
                isDisabled={!hasSufficientResources}
                id={hasSufficientResources ? "test-exchange-button" : "test-exchange-button-disabled"}
            />
            <Button
                text="Получить покемона"
                onClick={handleHatchEgg}
                className="exchange-button"
                id="test-hatch-egg-button"
            />
            {hatchedPokemon && (
                <InfoModal
                    isOpen={isHatchModalOpen}
                    onClose={handleCloseHatchModal}
                    title="Поздравляем!"
                    content={
                        <div className="hatched-pokemon-modal" id="test-hatched-pokemon-modal">
                            <p>Вы получили покемона:</p>
                            {hatchedPokemon.hatched ? (
                                <div>
                                    <h3 id="test-hatched-pokemon-name">{hatchedPokemon.hatched.name}</h3>
                                    <p id="test-hatched-pokemon-level">Уровень: {hatchedPokemon.hatched.level}</p>
                                    <p id="test-hatched-pokemon-element">Стихия: {hatchedPokemon.hatched.element}</p>
                                    <p id="test-hatched-pokemon-hp">Здоровье: {hatchedPokemon.hatched.base_hp}</p>
                                    <p id="test-hatched-pokemon-atk">Атака: {hatchedPokemon.hatched.base_atk}</p>
                                    <p id="test-hatched-pokemon-def">Защита: {hatchedPokemon.hatched.base_def}</p>
                                    <img src={getPokemonImage(hatchedPokemon.hatched.asset)} alt={hatchedPokemon.hatched.name} id="test-hatched-pokemon-image" />
                                </div>
                            ) : (
                                <p>Данные о покемоне отсутствуют.</p>
                            )}
                        </div>
                    }
                    id="test-hatched-pokemon-info-modal"
                />
            )}
        </div>
    );
};

export default ExchangerTab;