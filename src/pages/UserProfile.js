import React, { useEffect, useState } from 'react';
import { Alert, Container, Card, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';
import config from '../config';

export default function UserProfile() {

    const [ profile, setProfile ] = useState({});
    const [ customer, setCustomer ] = useState({})
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
                setProfile(response.data.user);
                setCustomer(response.data)
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
            { alertJSX ? alertJSX : null }
            <Card>
                <Card.Header><Card.Title>{customer.first_name}'s Profile</Card.Title></Card.Header>
                <Card.Body>
                    <ul>
                        <li>Name: {profile.name}</li>
                        <li>Email: {profile.email}</li>
                        <li>Contact No: {customer.contact_no}</li>
                        <li>Delivery Address: {customer.address_blk} {customer.address_street_1} {customer.address_street_2}</li>
                        <li>Unit: {customer.address_unit}</li>
                        <li>Postal Code: Singapore {customer.address_postal_code}</li>
                        <li>Gender: {customer.gender === 'F' ? 'Female' : 'Male'}</li>
                        <li>Birth Date: <Moment format="DD/MM/YYYY">{customer.birth_date}</Moment></li>
                    </ul>   
                </Card.Body>
            </Card>
            <Button variant="secondary" href="/change-password" >Change Password</Button>
            <Button variant="secondary" href="/update-profile" >Update My Profile</Button>
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
