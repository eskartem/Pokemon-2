 import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

//logout не сделан

import './Home.scss'; 

const HomePage: React.FC<IBasePage> = (props: IBasePage) => {

    const { setPage } = props;
    const logoutClickHandler = () => setPage(PAGES.LOGIN);

    return (<div className='home-page'>
        <div>Ты в игре</div>
        <h1>Ура, ты авторизовался</h1>
            <div className='logout-buttons'>
                <Button onClick={logoutClickHandler} text='Выйти из аккаунта' />
                
            </div>
        </div>
    )
}
export default HomePage;