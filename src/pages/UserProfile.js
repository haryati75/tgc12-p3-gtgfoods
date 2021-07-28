import React, { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';

export default function UserProfile() {
    const [ profile, setProfile ] = useState({});

    useEffect( () => {
        // load in the user profile using the access token
        async function fetch() {
            try {
                const response = await axios.get(config.API_URL + "/users/profile", {
                    'headers': {
                        'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                    }
                });
                setProfile(response.data)
            } catch (e) {
                console.log("API profile error", e)
                setProfile(null);
            }
        }
        fetch();
    }, [])

    const renderProfile = () => {
        return (<React.Fragment>
            <h1>User Profile</h1>
            <ul>
                <li>User Name: {profile.username}</li>
                <li>Email: {profile.email}</li>
            </ul>
        </React.Fragment>)
    }

    return (
        <React.Fragment>
            <Container>
                { profile ? renderProfile()
                : <Alert variant="danger">You are not authorised to access this page.</Alert> }
            </Container>
        </React.Fragment>
    )

}
