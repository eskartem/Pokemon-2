import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

import './Login.scss';

const Login: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginClickHandler = async () => {
        if (!loginRef.current || !passwordRef.current) {return;}
        const login = loginRef.current.value;
        const password = passwordRef.current.value;
        // if (1) { // тестовое условие, чтобы логин всегда был успешный и работал без бекенда
        if (login && password && await server.login(login, password)) { // login: admin, пароль: 111
            setPage(PAGES.GAME); 
        }
    }

    const registerClickHandler = () => setPage(PAGES.REGISTRATION);
    const backClickHandler = () => setPage(PAGES.PRELOADER);

    return (<div className='login' id='test-login-page'>
        <div>Логин</div>
        <div className='login-wrapper' >
            <div className='login-inputs'>
                <input ref={loginRef} placeholder='логин' id='test-login-input_login'/>
                <input ref={passwordRef} placeholder='пароль' type='password' id='test-login-input_pass' />
            </div>
            <div className='login-buttons'>
                <Button onClick={loginClickHandler} text='Авторизоваться' id='test-login-button_auth' />
                <Button onClick={backClickHandler} text='Назад' />
            </div>
            <span className='register-link' onClick={registerClickHandler}>
                У меня нет аккаунта
            </span>
        </div>
    </div>)
}

export default Login;