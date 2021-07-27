import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserContext from "./UserContext";
import config from './config';

export default function UserProvider(props) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        setInterval(async () => {
            let refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
            const response = await axios.post(config.API_URL + '/users/refresh', {
                refreshToken
            })
            localStorage.setItem('accessToken', response.data.accessToken);
            }
        }, config.REFRESH_INTERVAL)
    }, []);
  
    const userContext = {
        getUser: () => { return user },
        setUser: (user) => { setUser(user) },
        logout: async () => {

            let response = await axios.post(config.API_URL + "/users/logout", {
                refreshToken : user.refreshToken
            });
            // clear all user data
            localStorage.setItem('accessToken', null);
            localStorage.setItem('refreshToken', null);
            localStorage.setItem('userName', null); 
            userContext.setUser(null)
            console.log(response.data.message)
        }
    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}