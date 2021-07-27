import React, { useState, useContext } from 'react';
import axios from 'axios';
import config from '../config';

import UserContext from '../UserContext';

export default function Logout() {

    const userContext = useContext(UserContext);
    // need refreshToken to logout

    try {
        let response = await axios.post(config.API_URL + "/users/logout", {
            refreshToken : userContext.getUser().refreshToken
        });
        // clear all user data
        localStorage.setItem('accessToken', null);
        localStorage.setItem('refreshToken', null);
        localStorage.setItem('userName', null); 
        userContext.setUser(null)
        console.log(response.data.message)
    } catch(e) {
        alert("Failed logout.")
    }

    return (
        <div></div>
    )

}