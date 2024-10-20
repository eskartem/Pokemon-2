import React from 'react';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

import './Settings.scss';

const Settings: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;

    const backClickHandler = () => setPage(PAGES.MAINMENU);

    return (
    <div className='Settings'>
        <Button onClick={backClickHandler} text='назад' />
    </div>)
}

export default Settings;