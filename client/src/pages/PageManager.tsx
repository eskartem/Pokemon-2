import React, { useState } from 'react';

import Preloader from './Preloader/Preloader';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import MainMenu from './MainMenu/MainMenu';
import Settings from './Settings/Settings';
import Inventory from './Inventory/Inventory';
import Map from './Map/Map';
import Market from './Market/Market';
import Battle from './Battle/Battle';
import Chat from './Chat/Chat';
// import GamePage from './Game/Game';
import NotFound from './NotFound/NotFound';

export enum PAGES {
    PRELOADER,
    LOGIN,
    REGISTRATION,
    MAINMENU,
    INVENTORY,
    SETTINGS,
    MAP,
    MARKET,
    BATTLE,
    CHAT,
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
            {page === PAGES.MAINMENU && <MainMenu setPage={setPage} />}
            {page === PAGES.INVENTORY && <Inventory setPage={setPage} />}
            {page === PAGES.SETTINGS && <Settings setPage={setPage} />}
            {page === PAGES.MAP && <Map setPage={setPage} />}
            {page === PAGES.MARKET && <Market setPage={setPage} />}
            {page === PAGES.BATTLE && <Battle setPage={setPage} />}
            {page === PAGES.CHAT && <Chat setPage={setPage} />}
            {/* {page === PAGES.GAME && <GamePage setPage={setPage} />} */}
            {page === PAGES.NOT_FOUND && <NotFound setPage={setPage} />}
        </>
    );
}

export default PageManager;