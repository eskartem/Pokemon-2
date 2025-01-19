import React, {useContext, useState, useEffect} from 'react';
import Button from '../../components/Button/Button';
import Map from '../../components/Map/Map';
import Chat from '../../components/Chat/Chat';
import { StoreContext, ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import ExitImg from '../../assets/img/cross.png';
import ChatImg from '../../assets/img/chat.png';
import ChatCloseImg from '../../assets/img/chatclose.png';
import moneyImage from '../../assets/img/money.png';
import crystalImage from '../../assets/img/crystal.png';
import eggImage from '../../assets/img/egg_new.png';
import eggShellImage from '../../assets/img/egg_shell.png';
import inventImage from '../../assets/img/inventImg.png';
import marketImage from '../../assets/img/marketImg.png';
import { TInventory } from '../../services/server/types';

import './Game.scss';

const Game: React.FC<IBasePage> = (props: IBasePage) => {

    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    let user = store.getUser();

    //Ресурсы
    const [inventory, setInventory] = useState<TInventory | null>(null);

    useEffect(() => {
        if (user) {
            const fetchInventory = async () => {
                const inv = await server.getInventory();
                if (inv && JSON.stringify(inv) !== JSON.stringify(inventory)) {
                    setInventory(inv);
                }
            };
    
            fetchInventory();
    
            const intervalId = setInterval(fetchInventory, 1000);
    
            return () => clearInterval(intervalId);
        }
    }, [user, server, store, inventory]); // Добавьте inventory в зависимости
        
    const crystals = inventory?.inventory?.find(item => item.resource_id === 1)?.resource_amount || 0;
    const eggs = inventory?.inventory?.find(item => item.resource_id === 2)?.resource_amount || 0;
    const shells = inventory?.inventory?.find(item => item.resource_id === 3)?.resource_amount || 0;

    //Чат
    const [isChatVisible, setIsChatVisible] = useState(false); // Состояние для управления видимостью чата
    const [isUserInTown, setIsUserInTown] = useState(false); // Для отображения кнопки рынка, когда пользователь в городе 

    const toggleChatVisibility = () => {
        setIsChatVisible(prevState => !prevState); // Переключаем состояние видимости
    };

    //Кнопки
    const inventoryClickHandler = () => setPage(PAGES.INVENTORY);
    const marketClickHandler = () => setPage(PAGES.MARKET);
    const battleClickHandler = () => setPage(PAGES.BATTLE);
    const logoutClickHandler = async () => {
        if (await server.logout()) {
            setPage(PAGES.LOGIN);
        }
    }

    //const panelHeight = '65px';
    
    if (!user) { return ( <div><h1> Что-то пошло не так. </h1></div> );} // закоментировать для работы без бекэнда

    return (
        <div className="game-wrapper">
            <div className="button-panel-test">
                <div className='button-panel-test-left'>
                    <h1 id='test-game-h1-name' className='user-panel-nick'> {user?.name} | </h1>
                    <div className='user-resource'>
                        <div className='moneyMenu'>
                            <img src={moneyImage} alt="" />
                            <h1 >
                                {inventory?.balance || 0}
                            </h1>
                        </div>
                        <div className='crystalMenu'>
                            <img src={crystalImage} alt="" />
                            <h1>
                                {crystals}
                            </h1>
                        </div>
                        <div className='eggMenu'>
                            <img src={eggImage} alt="" />
                            <h1>
                                {eggs}
                            </h1>
                        </div>
                        <div className='eggShellMenu'>
                            <img src={eggShellImage} alt="" />
                            <h1>
                                {shells}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className='button-panel-test-centre'>
                    <img src={inventImage} alt="" onClick={inventoryClickHandler} className='imageButton' />
                    {isUserInTown && <img src={marketImage} alt="" onClick={marketClickHandler} className='imageButton' /> }

                    <Button id='test-game-button-battle' onClick={battleClickHandler} text='Битва' />
                </div>
                <div className='button-panel-test-right'>
                    <img id='test-game-img-logout' className='img-logout' src={ExitImg} alt="ExitImg" onClick={logoutClickHandler} />
                </div>
            </div>
            {isChatVisible && (
                <div className='game-chat'>
                    <Chat />
                </div>
            )}
            <img className='chat-button' onClick={toggleChatVisibility} src={isChatVisible ? ChatCloseImg : ChatImg } />

            <div className="map-container">
                <Map setIsUserInTown={setIsUserInTown}/>
            </div>
        </div>
    );
}
// style={{ paddingTop: panelHeight }}
export default Game;


