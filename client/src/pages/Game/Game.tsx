import React, {useContext, useState} from 'react';
import Button from '../../components/Button/Button';
import Map from '../../components/Map/Map';
import Chat from '../../components/Chat/Chat';
import { StoreContext, ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import CoinImg from '../../assets/img/coin.png';
import RubyImg from '../../assets/img/Ruby.png';
import EggImg from '../../assets/img/Egg.png';
import EggBreakImg from '../../assets/img/EggBreak.png';
import ExitImg from '../../assets/img/ExitImg.png';
import VolumeImg from '../../assets/img/volume.png';
import ChatImg from '../../assets/img/chat.png';
import ChatCloseImg from '../../assets/img/chatclose.png';

import './Game.scss';

const Game: React.FC<IBasePage> = (props: IBasePage) => {

    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    let user = store.getUser();

    const [isChatVisible, setIsChatVisible] = useState(false); // Состояние для управления видимостью чата
    const [isUserInTown, setIsUserInTown] = useState(false); // Для отображения кнопки рынка, когда пользователь в городе 

    const toggleChatVisibility = () => {
        setIsChatVisible(prevState => !prevState); // Переключаем состояние видимости
    };

    const inventoryClickHandler = () => setPage(PAGES.INVENTORY);
    const marketClickHandler = () => setPage(PAGES.MARKET);
    const battleClickHandler = () => setPage(PAGES.BATTLE);
    const logoutClickHandler = async () => {
        if (await server.logout()) {
            setPage(PAGES.LOGIN);
        }
    }
    const muteButtonHandler = async () => {
        // сделать запрос на сервак по изменению поля is_mute в таблицe users
    }

    const panelHeight = '65px';
    
    if (!user) { return ( <div><h1> Что-то пошло не так. </h1></div> );} // закоментировать для работы без бекэнда

    return (
        <div className="game-wrapper">
            <div className="button-panel-test">
                <div className='button-panel-test-left'>
                    <h1 id='test-game-h1-name' className='user-panel-nick'> {user?.name} | </h1>
                    <img src={CoinImg} alt="CoinImg" className='user-resources'/>
                    <h1 id='test-game-h1-coins' className='user-resources-coins'> {user?.coins} </h1>
                    <img src={RubyImg} alt="RubyImg" className='user-resources'/>
                    <img src={EggImg} alt="EggImg" className='user-resources'/>
                    <img src={EggBreakImg} alt="EggBreakImg" className='user-resources'/>
                </div>
                <div className='button-panel-test-centre'>
                    <Button id='test-game-button-inventory' onClick={inventoryClickHandler} text='Инвентарь' />
                    {isUserInTown && <Button id='test-game-button-market' onClick={marketClickHandler} text='Рынок' /> }
                    <Button id='test-game-button-battle' onClick={battleClickHandler} text='Битва' />
                </div>
                <div className='button-panel-test-right'>
                    <img id='test-game-img-mute' className='img-volume' src={VolumeImg} alt='VolumeImg' onClick={muteButtonHandler} />
                    <img id='test-game-img-logout' className='img-logout' src={ExitImg} alt="ExitImg" onClick={logoutClickHandler} />
                </div>
            </div>
            {isChatVisible && (
                <div className='game-chat'>
                    <Chat />
                </div>
            )}
            <img className='chat-button' onClick={toggleChatVisibility} src={isChatVisible ? ChatCloseImg : ChatImg } />
            <div className="map-container" style={{ paddingTop: panelHeight }}>
                <Map setIsUserInTown={setIsUserInTown}/>
            </div>
        </div>
    );
}

export default Game;


