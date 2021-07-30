import React, { useEffect, useState } from 'react';
import { Alert, Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';

export default function UserProfile() {
    const [ profile, setProfile ] = useState({});
    const [alertJSX, setAlertJSX] = useState();

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
                setAlertJSX(<Alert variant="danger">You are not authorised to access this page.</Alert>)
                setProfile(null);
            }
        }
        fetch();
    }, [])

    const renderProfile = () => {
        return (<React.Fragment>
            <Card>
                <Card.Header><Card.Title>User Profile</Card.Title></Card.Header>
                <Card.Body>
                    <ul>
                        <li>User Name: {profile.username}</li>
                        <li>Email: {profile.email}</li>
                    </ul>   
                </Card.Body>
            </Card>
            <Button variant="secondary" href="/change-password" >Change Password</Button>
        </React.Fragment>)
    }

    return (
        <React.Fragment>
            <Container>
                { profile ? renderProfile() : alertJSX }
            </Container>
        </React.Fragment>
    )

}
