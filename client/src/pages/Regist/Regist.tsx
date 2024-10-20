import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

import './Regist.scss';

const Regist: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const registClickHandler = async () => {
        if (loginRef.current && passwordRef.current) {
            const login = loginRef.current.value;
            const password = passwordRef.current.value;
            //if (1) { // тестовое условие, чтобы логин всегда был успешный и работал без бекенда
            if (login && password && await server.login(login, password)) {
                setPage(PAGES.HOMEPAGE);
            }
        }
    }
    //const backClickHandler = () => setPage(PAGES.PRELOADER);
    const authorizClickHandler = () => setPage(PAGES.LOGIN);

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
            </div>
            <span className='register-link' onClick={authorizClickHandler}>
                у меня уже есть аккаунт
            </span>
        </div>
    </div>)
}

export default Regist;