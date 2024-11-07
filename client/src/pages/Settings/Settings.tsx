import React, { useContext } from 'react';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';
import { ServerContext } from '../../App'; 

import './Settings.scss';

const Settings: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);

    const backClickHandler = () => setPage(PAGES.MAINMENU);

    const logoutClickHandler = async () => {
        await server.logout();
        setPage(PAGES.LOGIN);
    }

    return (
    <div className='Settings'>
        <Button onClick={logoutClickHandler} text='Выйти из аккаунта' />
        <Button onClick={backClickHandler} text='Назад' />
    </div>)
}

export default Settings;