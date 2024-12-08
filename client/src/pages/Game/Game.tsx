import React, {useContext, useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import Map from '../../components/Map/Map';
import Chat from '../../components/Chat/Chat';
import { StoreContext, ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import CONFIG, { TPoint } from '../../config';
import CoinImg from '../../assets/img/coin.png';
import RubyImg from '../../assets/img/Ruby.png';
import EggImg from '../../assets/img/Egg.png';
import EggBreakImg from '../../assets/img/EggBreak.png';
import ExitImg from '../../assets/img/ExitImg.png';

import './Game.scss';

const Game: React.FC<IBasePage> = (props: IBasePage) => {

    const {tileSize} = CONFIG;

    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    let user = store.getUser();

    const [userPosition, setUserPosition] = useState<TPoint>({x: (user?.x ?? 0) * tileSize, y: (user?.y ?? 0) * tileSize});

    const moveUser = async (dx: number, dy: number) => {
        if (!user) return;
        const result = await server.moveUser(user.x + dx, user.y + dy);
        if (!result) return;
        user.x += dx;
        user.y += dy;
        setUserPosition({x: user.x * tileSize, y: user.y * tileSize});
    }

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

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    moveUser(0, -1);
                    break;
                case 'ArrowDown':
                    moveUser(0, 1);
                    break;
                case 'ArrowLeft':
                    moveUser(-1, 0);    
                    break;
                case 'ArrowRight':
                    moveUser(1, 0);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', keyDownHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    });
    
    if (!user) { return ( <div><h1> Что-то пошло не так. </h1></div> );} // закоментировать для работы без бекэнда

    const panelHeight = '65px';

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
                    <Button id='test-game-button-market' onClick={marketClickHandler} text='Рынок' />
                    <Button id='test-game-button-battle' onClick={battleClickHandler} text='Битва' />
                </div>
                <div className='button-panel-test-right'>
                    <Button id='test-game-button-mute' onClick={muteButtonHandler} text='заглушить' />
                    <Button id='test-game-button-logout' onClick={logoutClickHandler} text='Выйти' />
                    <img id='test-game-img-logout' className='img-logout' src={ExitImg} alt="ExitImg" onClick={logoutClickHandler} />
                </div>
            </div>
            <div className="map-container" style={{ paddingTop: panelHeight }}>
                <Map userPosition={userPosition} />
            </div>
        </div>
    );

    /*return (
        <div className="game-wrapper" >
            <div>
                <div className='user-panel'>
                    <h1 className='user-panel-nick'> Ник:</h1>
                    <h1 id='test-game-h1-name' className='user-panel-nick'> {user?.name} | </h1>
                </div>
                <div className='button-panel'>
                    <Button id='test-game-button-inventory' onClick={inventoryClickHandler} text='Инвентарь' />
                    <Button id='test-game-button-market' onClick={marketClickHandler} text='Рынок' />
                    <Button id='test-game-button-battle' onClick={battleClickHandler} text='Битва' />
                    <Button id='test-game-button-mute' onClick={muteButtonHandler} text='заглушить' />
                    <Button id='test-game-button-logout' onClick={logoutClickHandler} text='Выйти' />
                </div>
                <Chat />
            </div>
            <div>
                <div className='user-resources'>
                    <h1 className='user-resources-coins'>монеты: </h1>
                    <h1 id='test-game-h1-coins' className='user-resources-coins'> {user?.coins} </h1>
                </div>
                <Map userPosition={userPosition} />
                <div className="control-panel">
                    <Button id='test-game-button-arrowleft' className="move-button" 
                    onClick={() => moveUser(-1, 0)} text={'←'} />
                    <div className='vertical-move-buttons'>
                        <Button id='test-game-button-arrowup' className="move-button" onClick={() => moveUser(0, -1)} text={'↑'} />
                        <Button id='test-game-button-arrowdown' className="move-button" onClick={() => moveUser(0, 1)} text={'↓'} />
                    </div>
                    <Button id='test-game-button-arrowright' className="move-button" onClick={() => moveUser(1, 0)} text={'→'} />
                </div>
            </div>
        </div>
    );*/
}

export default Game;


