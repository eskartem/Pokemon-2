import React, { useState } from 'react';

//import Preloader from './Preloader/Preloader';
import Login from './Login/Login';
//import Chat from './Chat/Chat';
import Regist from './Regist/Regist';
import HomePage from './HomePage/HomePage';
//import NotFound from './NotFound/NotFound';

export enum PAGES {
    //PRELOADER,
    LOGIN,
    REGIST,
    //CHAT,
    HOMEPAGE,
    //NOT_FOUND,
}

export interface IBasePage {
    setPage: (name: PAGES) => void
}

const PageManager: React.FC = () => {
    const [page, setPage] = useState<PAGES>(PAGES.LOGIN);

    return (
        <> 
            {page === PAGES.LOGIN && <Login setPage={setPage} />}
            {page === PAGES.REGIST && <Regist setPage={setPage} />}
            {page === PAGES.HOMEPAGE && <HomePage setPage={setPage}/>}
        </>
    );
}

export default PageManager;