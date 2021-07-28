import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from "./UserContext";
import config from './config';

export default function UserProvider(props) {
    const history = useHistory()
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
            console.log('logging out...')
            localStorage.clear();
            try {
                let response = await axios.post(config.API_URL + "/users/logout", {
                    refreshToken : user.refreshToken
                });
                // clear all user data
                userContext.setUser(null)
                console.log("logged out successful", response)
            } catch(e) {
                userContext.setUser(null)
                console.log("logout error", e)
            }
            history.push('/all-products', {
                welcomeUser : 'N'
            })
        }
    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}