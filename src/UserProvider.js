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
            console.log("refreshing token...")
            let refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                const response = await axios.post(config.API_URL + '/users/refresh', {
                    refreshToken
                })
                localStorage.setItem('accessToken', response.data.accessToken);
            } else {
                localStorage.clear();
                console.log("Session expired");
            }
        }, config.REFRESH_INTERVAL)
    }, []);
  
    const userContext = {
        getUser: () => { return user },
        setUser: (user) => { setUser(user) },

        logout: async () => {
            let refreshToken = localStorage.getItem('refreshToken');
            try {
                let response = await axios.post(config.API_URL + "/users/logout", {
                    refreshToken
                });
                console.log("logout successful", response);
            } catch(e) {
                console.log("logout error", e)
            }
            // clear all user data
            localStorage.clear();
            userContext.setUser(null)
            history.push('/', {
                welcomeUser : 'N',
            })
        },

        login: async (email, password) => {
            try {
                let response = await axios.post(config.API_URL + "/users/login", {
                    email,
                    password
                });
                // save token and user details
                console.log("login successful:", response.data)
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('userName', response.data.userName); // to be used by NavBar
                userContext.setUser({
                    'email': email,
                    'userName': response.data.userName,
                    'accessToken': response.data.accessToken,
                    'refreshToken': response.data.refreshToken
                })
                history.push('/', {
                    welcomeUser : 'Y'
                })
            } catch (e) {
                localStorage.clear();
                userContext.setUser(null)
                history.push('/login', {
                    loginFail : 'Y'
                })
            }
        },

        getProfile: async () => {
            try {
                const response = await axios.get(config.API_URL + "/users/profile", {
                    'headers': {
                        'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                    }
                });
                return response;
            } catch (e) {
                if (e.response) {
                    return (e.response)
                }
                console.log("API profile error", e)
            }
        },

        register: async (formState) => {
            const { email, password } = formState;
            try {
                await axios.post(config.API_URL + "/users/profile", {
                    ...formState
                });
                // auto login user 
                userContext.login(email, password);
            } catch (error) {
                console.log("Register failed >> ", error.response.data.error)
                if (error.response) {
                    return(error.response.data.error)
                }
                return (error);
            }
        },

        saveProfile: async (formState) => {
            try {
                const options = { 'headers': {'Authorization' : 'Bear ' + localStorage.getItem('accessToken')} };
                const data = {
                    ...formState
                }
                const response = await axios.put(config.API_URL + "/users/profile", data, options);
                return response;
            } catch (error) {
                console.log("Register failed >> ", error.response.data.error)
                if (error.response) {
                    return(error.response.data.error)
                }
                return (error);
            }
        }
    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}