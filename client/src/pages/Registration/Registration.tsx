import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';
import RegistrImg from '../../assets/img/login/registr.png';
import './Registration.scss';

const Registration: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const isValidPassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"№;%:?*()_+=\-`{}"?><.])(?=.*\S).{8,15}$/;
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
            alert("Пароль должен содержать не менее 8 символов и не более 15, включая заглавные и строчные буквы латинского алфавита, цифры и специальные символы.");
            return;
        }

        if (login && password && name && await server.registration(login, password, name) ) {
            if (await server.login(login, password)) {
                setPage(PAGES.GAME);
            }
        }
    };

    const backClickHandler = () => setPage(PAGES.LOGIN);

    return (<div className='regist' id='test-registration-page'>
        <div className='regist-wrapper'>
            <div className='regist-inputs'>
                <input 
                ref={nameRef}
                id='test-registration-input_name'
                placeholder ='никнейм' 
                onKeyDown={(event) => {if (event.key === "Enter") loginRef.current?.focus()}}
                />
                <input 
                ref={loginRef}
                id='test-registration-input_login'
                placeholder='логин' 
                onKeyDown={(event) => {if (event.key === "Enter") passwordRef.current?.focus()}}
                />
                <input 
                onKeyDown={(event) => {if (event.key === "Enter") registClickHandler()}}
                ref={passwordRef}
                id='test-registration-input_pass'
                placeholder='пароль' 
                type='password' 
                />
            </div>
            <div className='regist-buttons'>
                <img className='registrClick' id='test-registration-button_auth' src={RegistrImg} alt='' onClick={registClickHandler}></img>
                <span className='login-link' onClick={backClickHandler}>
                У меня уже есть аккаунт
                </span>
            </div>
        </div>
    </div>);

}

export default Registration;
