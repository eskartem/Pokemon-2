import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

import './Registration.scss';

const Registration: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const registClickHandler  = async (): Promise<void> => {
        const login = loginRef.current?.value;
        const password = passwordRef.current?.value;
        const name = nameRef.current?.value;
        
        if (login && password && name && await server.registration(login, password, name) ) {
            if (await server.login(login, password)) {
                setPage(PAGES.MAINMENU);
            }
        }
     }

    const backClickHandler = () => setPage(PAGES.LOGIN);

    return (<div className='regist'>
        <div>Регистрация</div>
        <div className='regist-wrapper'>
            <div className='regist-inputs'>
                <input ref={nameRef} placeholder ='Никнейм' />
                <input ref={loginRef} placeholder='логин' />
                <input ref={passwordRef} placeholder='пароль' type='password' />
            </div>
            <div className='regist-buttons'>
                <Button onClick={registClickHandler} text='Зарегистрироваться' />
                <span onClick={backClickHandler}>
                У меня есть аккаунт
                </span>
            </div>
        </div>
    </div>)
}

export default Registration;