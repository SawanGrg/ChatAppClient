import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getAllUser from '../services/user/GetAllUser';
import './Home.css';

function Home() {
    const [users, setUsers] = useState([]);

    const userName = localStorage.getItem('userName').replace(/"/g, '');

    const getAllUsers = async () => {
        try {
            const response = await getAllUser();
            console.log(response);
            setUsers(response.result);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        console.log("Home Page");
        getAllUsers();
    }, []);

    return (
        <div className='parent-div'>
            <div>
                <h2>Friend List of {userName}</h2>

                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            <div>
                                Username:
                                <br />
                                {user.username}
                            </div>
                            <Link to={`/privateChat/${user.token}/${user.username}`}>Chat with {user.username}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                Specific chat
            </div>
        </div>
    );
}

export default Home;
