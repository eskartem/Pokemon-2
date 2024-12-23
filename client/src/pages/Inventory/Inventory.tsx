import React from 'react';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';
import UserPanel from '../../components/UserPanel/UserPanel';

import './Inventory.scss';

const Inventory: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;

    const backClickHandler = () => setPage(PAGES.GAME);
    
    return (
    <div className='inventory'>
        <Button onClick={backClickHandler} text='назад' />
    </div>)
}

export default Inventory;