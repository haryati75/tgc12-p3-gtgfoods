import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function UserProfile() {
    const [ profile, setProfile ] = useState({});

    useEffect(() => {
        // load in the user profile using the access token
        async function fetch() {
            const response = await axios.get(config.API_URL + "/users/profile", {
                'headers': {
                    'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                }
            });
            setProfile(response.data)
        }
        fetch();
    }, [])

    return (
        <React.Fragment>
            <h1>User Profile</h1>
            <ul>
                <li>User Name: {profile.username}</li>
                <li>Email: {profile.email}</li>
            </ul>
        </React.Fragment>
    )

}
