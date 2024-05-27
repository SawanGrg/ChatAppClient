import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';

export default function UserWrapper({ children }) {
    
    const selector = useSelector((state) => state.user.userName);
    const navigate = useNavigate();

    console.log("----> ", selector);

    useEffect(()=>{
        {
            if(!selector) {
    
                navigate('/login');
            }
        }
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}
