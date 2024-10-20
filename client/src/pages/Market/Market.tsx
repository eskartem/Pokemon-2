import React from 'react';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

import './Market.scss';

const Market: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;

    const backClickHandler = () => setPage(PAGES.MAINMENU);

    return (
    <div className='Market'>
        я не смог, это пиздец кромешный 😫
        <Button onClick={backClickHandler} text='назад' />
    </div>)
}

export default Market;