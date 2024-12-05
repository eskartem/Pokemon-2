import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { TMessages } from '../../services/server/types';
import Button from '../Button/Button';

import './Chat.scss';

const Chat: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [messages, setMessages] = useState<TMessages>([]);
    const [_, setHash] = useState<string>('');
    const messageRef = useRef<HTMLInputElement>(null);
    const user = store.getUser();

    useEffect(() => {
        const newMessages = (hash: string) => {
            const messages = store.getMessages();
            if (messages?.length) {
                setMessages(messages);
                setHash(hash);
            }
        }

        if (user) {
            server.startChatMessages(newMessages);
        }

        return () => {
            server.stopChatMessages();
        }
    }, [server, store, user]);

    const input = useMemo(() => <input 
    ref={messageRef} 
    onKeyDown={(event) => {if (event.key === "Enter") sendClickHandler()}} 
    placeholder='сообщение' />
    , []);

    const sendClickHandler = () => {
        if (messageRef.current) {
            const message = messageRef.current.value;
            if (message) {
                server.sendMessage(message);
                messageRef.current.value = '';
            }
        }
    }

    if (!user) {
        return (<div className='chat'>
            <h1>Чат</h1>
            <h1>Что-то пошло не так =(</h1>
        </div>)
    }

    return (<div className='chat'>
        <h1>Чат</h1>
        <div id='test-chat-div-chat' className='chat-messages'>
            {messages.reverse().map((message, index) => 
            <div className='nt' key={index}>
                <span className="message-author">{message.author} </span> 
                <span className="message-timestamp">({message.created}): </span> 
                <span className="message-text">{message.message}</span>
            </div>)}
        </div>
        <div id='test-chat-div-input' className='chat-input'>
            {input}
        </div>
        <div className='chat-buttons'>
            <Button id='test-chat-button-send' onClick={sendClickHandler} text='Отправить' />
        </div>
    </div>)
}

export default Chat;