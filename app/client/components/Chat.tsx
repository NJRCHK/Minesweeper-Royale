import React, { useState } from 'react';
import { ChatMessage, ChatMessageProps } from '../../shared/types';
import { MAX_CHAT_MESSAGE_LENGTH } from '../../shared/constants';

export default function Chat (props: ChatMessageProps) {
    const [myMessage, setMyMessage] = useState('');

    function handleMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.value.length >= MAX_CHAT_MESSAGE_LENGTH){
            return;
        }
        setMyMessage(event.currentTarget.value);
    }

    function validateAndSendMessage(event: React.SyntheticEvent) {
        event.preventDefault();
        props.sendChatMessage(myMessage);
        setMyMessage('');
    }

    function renderChatMessages() {
        return props.messages.map(message => {
            return (
                <div>
                    <div>{message.username}</div>
                    <div>{message.text}</div>
                </div>
            )
        });
    }

    console.log(props);
    return (
        <div className='chatbox'>
            <div className='chatbox-message-display'>
                {renderChatMessages()}
            </div>
            <form onSubmit={validateAndSendMessage}>
                <input className='chatbox-message-enter' onChange={handleMessageChange} value={myMessage}/>
                <input type="submit" value="Send" />
            </form>
        </div>

    );
}