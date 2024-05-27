import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = 'http://localhost:8082/ws';

function PrivateChat() {
    const { receiverId } = useParams();
    const senderId = localStorage.getItem('token').replace(/"/g, '');

    // Generate a combined token
    const combinedToken = senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;

    const [userMessages, setUserMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        connect();
    }, [combinedToken]);

    const connect = () => {
        const socket = new SockJS(SOCKET_URL, null, {
            withCredentials: true
        });
        const temp = over(socket);
        setStompClient(temp);

        temp.connect({}, frame => {
            console.log('Connected: ' + frame);

            // Subscribe to private messages using the combined token
            temp.subscribe(`/queue/messages/${combinedToken}`, response => {
                const newMessage = JSON.parse(response.body);
                setUserMessages(prevMessages => [...prevMessages, newMessage]);
            });
        });
    };

    const sendMessage = () => {
        if (stompClient && stompClient.connected) {
            const newMessage = {
                content: message,
                sender: senderId,
                receiver: receiverId,
                type: "CHAT",
                timestamp: new Date().toISOString()
            };
            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(newMessage));
            setMessage('');
        }
    };

    const handleChange = event => {
        setMessage(event.target.value);
    };

    return (
        <div>
            <h2>Private Chat</h2>
            <p>Sender ID: {senderId}</p>
            <p>Receiver ID: {receiverId}</p>
            <div>
                {userMessages.map((msg, index) => (
                    <div key={index}>
                        <p>{msg.sender}: {msg.content}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleChange}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default PrivateChat;
