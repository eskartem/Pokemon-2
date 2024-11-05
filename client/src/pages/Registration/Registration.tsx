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

    const isValidPassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"№;%:?*()_+=\-\`{}"?><.])(?=.*\S).{8,}$/;
        return passwordRegex.test(password);
    };

    const registClickHandler = async (): Promise<void> => {
        const login = loginRef.current?.value;
        const password = passwordRef.current?.value;
        const name = nameRef.current?.value;

        if (!name || !login || !password) {
            alert("Все поля должны быть заполнены!");
            return;
        }

        if (!isValidPassword(password)) {
            alert("Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифры и специальные символы.");
            return;
        }

        if (await server.registration(login, password, name)) {
            if (await server.login(login, password)) {
                setPage(PAGES.MAINMENU);
            }
        }
    };

    const backClickHandler = () => setPage(PAGES.LOGIN);

    return (
        <div className='regist'>
            <div>Регистрация</div>
            <div className='regist-wrapper'>
                <div className='regist-inputs'>
                    <input ref={nameRef} placeholder='Никнейм' />
                    <input ref={loginRef} placeholder='логин' />
                    <input ref={passwordRef} placeholder='пароль' type='password' />
                </div>
                <div className='regist-buttons'>
                    <Button onClick={registClickHandler} text='Зарегистрироваться' />
                    <span className='register-link' onClick={backClickHandler}>
                        У меня есть аккаунт
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Registration;
