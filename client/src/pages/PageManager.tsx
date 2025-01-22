import React, { useState } from 'react';

import Preloader from './Preloader/Preloader';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Inventory from './Inventory/Inventory';
import Market from './Market/Market';
import Battle from './Battle/Battle';
import Game from './Game/Game';
import NotFound from './NotFound/NotFound';

export enum PAGES {
    PRELOADER,
    LOGIN,
    REGISTRATION,
    INVENTORY,
    MARKET,
    BATTLE,
    GAME,
    NOT_FOUND,
}

export interface IBasePage {
    setPage: (name: PAGES) => void
}

const PageManager: React.FC = () => {
    const [page, setPage] = useState<PAGES>(PAGES.LOGIN);
    return (
        <>
            {page === PAGES.PRELOADER && <Preloader setPage={setPage} />}
            {page === PAGES.LOGIN && <Login setPage={setPage} />}
            {page === PAGES.REGISTRATION && <Registration setPage={setPage} />}
            {page === PAGES.GAME && <Game setPage={setPage} />}
            {page === PAGES.INVENTORY && <Inventory setPage={setPage} />}
            {page === PAGES.MARKET && <Market setPage={setPage} />}
            {page === PAGES.BATTLE && <Battle setPage={setPage} />}
            {page === PAGES.NOT_FOUND && <NotFound setPage={setPage} />}
        </>
    );
}

export default PageManager;