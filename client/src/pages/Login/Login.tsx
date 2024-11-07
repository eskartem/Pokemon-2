import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
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
        if (1) { // тестовое условие, чтобы логин всегда был успешный и работал без бекенда
            //if (login && password && await server.login(login, password)) { // login: admin, пароль: 111
            setPage(PAGES.MAINMENU);
        }
    }

    const registerClickHandler = () => setPage(PAGES.REGISTRATION);
    const backClickHandler = () => setPage(PAGES.PRELOADER);

    return (<div className='login'>
        <div className='login-wrapper'>
            <div className='login-inputs'>
                <input ref={loginRef} placeholder='логин' />
                <input ref={passwordRef} placeholder='пароль' type='password' />
            </div>
            <div className='login-buttons'>
                <img className='loginClick' src={LoginImg} alt='' onClick={loginClickHandler}></img>
            </div>
            <span className='register-link' onClick={registerClickHandler}>
                У меня нет аккаунта
            </span>
        </div>
    </div>)

    /*return (<div className='login'>
        <div className='login-wrapper'>
            <div className='login-inputs'>
                <input ref={loginRef} placeholder='логин' />
                <input ref={passwordRef} placeholder='пароль' type='password' />
            </div>
            <div className='login-buttons'>
                <Button onClick={loginClickHandler} text='Авторизоваться' />
                <Button onClick={backClickHandler} text='Назад' />
            </div>
            <span className='register-link' onClick={registerClickHandler}>
                У меня нет аккаунта
            </span>
        </div>
    </div>)*/
}

export default Login;