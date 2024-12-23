import React, {useContext, useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import { StoreContext, ServerContext } from '../../App';
import { IBasePage, PAGES } from '../../pages/PageManager';

import CoinImg from '../../assets/img/coin.png';
import RubyImg from '../../assets/img/Ruby.png';
import EggImg from '../../assets/img/Egg.png';
import EggBreakImg from '../../assets/img/EggBreak.png';
import ExitImg from '../../assets/img/ExitImg.png';

import './UserPanel.scss';

interface User {
    name: string;
    coins: number;
}

interface UserPanelProps {
    user: User; // Добавляем типизацию для пользователя
    inventoryClickHandler: () => void;
    marketClickHandler: () => void;
    battleClickHandler: () => void;
    logoutClickHandler: () => Promise<void>;
}

const UserPanel: React.FC<UserPanelProps> = ({
    user,
    inventoryClickHandler,
    marketClickHandler,
    battleClickHandler,
    logoutClickHandler,
}) => {

    return (
        <div className="header-user-panel">
            <div className='user-panel-left-items'>
                <h1 id='test-game-h1-name' className='user-panel-nick'> {user?.name} | </h1>
                <img src={CoinImg} alt="CoinImg" className='user-resources'/>
                <h1 id='test-game-h1-coins' className='user-resources-coins'> {user?.coins} </h1>
                <img src={RubyImg} alt="RubyImg" className='user-resources'/>
                <img src={EggImg} alt="EggImg" className='user-resources'/>
                <img src={EggBreakImg} alt="EggBreakImg" className='user-resources'/>
            </div>
            <div className='user-panel-centre-items'>
                <Button id='test-game-button-inventory' onClick={inventoryClickHandler} text='Инвентарь' />
                <Button id='test-game-button-market' onClick={marketClickHandler} text='Рынок' />
                <Button id='test-game-button-battle' onClick={battleClickHandler} text='Битва' />
            </div>
            <div className='user-panel-right-items'>
                <img id='test-game-img-logout' className='img-logout' src={ExitImg} alt="ExitImg" onClick={logoutClickHandler} />
            </div>
        </div>
    )
}

export default UserPanel;