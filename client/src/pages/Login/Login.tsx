import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import LoginImg from '../../assets/img/login/login.png';

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
        //if (1) { // тестовое условие, чтобы логин всегда был успешный и работал без бекенда
        if (login && password && await server.login(login, password)) { // login: vasya, пароль: 111
            setPage(PAGES.GAME); 
        }
    }

    const registerClickHandler = () => setPage(PAGES.REGISTRATION);

    return (<div className='login' id='test-login-page'>
        <div className='textLogin'>ВХОД</div>
            <div className='login-wrapper'>
            <div className='login-inputs'>
                <input ref={loginRef} 
                id='test-login-input_login'
                placeholder='логин'
                onKeyDown={(event) => {if (event.key === "Enter") passwordRef.current?.focus()}}  
                />
                <input 
                ref={passwordRef}
                id='test-login-input_pass'
                onKeyDown={(event) => {if (event.key === "Enter") loginClickHandler()}}  
                placeholder='пароль' 
                type='password' 
                />
            </div>
            <div className='login-buttons'>
                <img className='loginClick' id='test-login-button_auth' src={LoginImg} alt='' onClick={loginClickHandler}></img>
            </div>
            <span className='register-link' id='test-login-register_label' onClick={registerClickHandler}>
                У меня нет аккаунта
            </span>
        </div>
    </div>)

}

export default Login;