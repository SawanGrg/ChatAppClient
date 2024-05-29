import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import './PrivateChat.css'; // Import your CSS file for styling

const SOCKET_URL = 'http://localhost:8082/ws';

function PrivateChat() {
    const { receiverId, receiverName } = useParams();
    const senderId = localStorage.getItem('token').replace(/"/g, '');
    const senderName = localStorage.getItem('userName').replace(/"/g, '');

    // Generate a combined token
    const combinedToken = senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;

    const [userMessages, setUserMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const stompClientRef = useRef(null);

    useEffect(() => {
        if (!connected) {
            connect();
        }
    }, [combinedToken, connected]);

    const connect = () => {
        const socket = new SockJS(SOCKET_URL, null, {
            withCredentials: true
        });
        const temp = over(socket);
        stompClientRef.current = temp;

        temp.connect({}, frame => {
            console.log('Connected: ' + frame);
            setConnected(true);

            // Subscribe to private messages using the combined token
            temp.subscribe(`/queue/messages/${combinedToken}`, response => {
                const newMessage = JSON.parse(response.body);
                setUserMessages(prevMessages => [...prevMessages, newMessage]);
            });
        }, error => {
            console.error('Connection error: ', error);
            setConnected(false); // Try to reconnect on error
        });
    };

    const sendMessage = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            const newMessage = {
                content: message,
                sender: senderId,
                receiver: receiverId,
                type: "CHAT",
                timestamp: new Date().toISOString()
            };
            stompClientRef.current.send('/app/chat.sendMessage', {}, JSON.stringify(newMessage));
            setMessage('');
        }
    };

    const handleChange = event => {
        setMessage(event.target.value);
    };

    return (
        <div className="chat-container">
            <h2>Private Chat between {senderName} and {receiverName}</h2>
            <div className="messages-container">
                {userMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.sender === senderId ? "sender-message" : "receiver-message"}
                    >
                        <p> <strong> {msg.sender === senderId ? senderName : receiverName} </strong> {msg.content}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={handleChange}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default PrivateChat;
