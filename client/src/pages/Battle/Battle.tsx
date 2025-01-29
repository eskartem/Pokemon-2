import { useEffect, useState, useContext } from 'react';
import { Stage } from '@pixi/react';
import { ServerContext, StoreContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import Button from '../../components/Button/Button';
import { TMonster, TUpdateBattleResponse, TPlayers, TUserInfo, TBattle } from '../../services/server/types';

import './Battle.scss';

const Battle: React.FC<IBasePage> = (props: IBasePage) => {

    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const user = store.getUser();


    const backClickHandler = () => setPage(PAGES.GAME);
    
    useEffect(
        () => {
            const updateBattle = (result: TUpdateBattleResponse) => {
                console.log(result);
            }
            
            if (user) {
                server.startBattleUpdate(updateBattle);
            }
    
            return () => {
                server.stopBattleUpdate();
            }
        }
    )
    
    return (
        <div>
            <Button onClick={backClickHandler} text='назад' />
        </div>
    );
};

export default Battle;
