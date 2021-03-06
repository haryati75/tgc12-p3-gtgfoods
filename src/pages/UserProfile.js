import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Alert, Container, Card, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import UserContext from '../UserContext';

export default function UserProfile() {
    const history = useHistory();
    const userContext = useContext(UserContext);

    const location = useLocation();
    // const savedProfile = location.state && location.state.savedProfile ? true : false;

    const [ profile, setProfile ] = useState({});
    const [ customer, setCustomer ] = useState({})
    const [ alertJSX, setAlertJSX ] = useState();

    useEffect( () => {
        // load in the user profile using the access token
        async function fetch() {
            const result = await userContext.getProfile();
            if (result && result.status) {
                if (result.status === 200) {
                    setProfile(result.data.user);
                    setCustomer(result.data)
                    if (location.state && location.state.savedProfile) {
                        setAlertJSX(<Alert variant="success">Profile has been updated successfully.</Alert>)
                    }
                } else {
                    setAlertJSX(<Alert variant="danger">You are not authorised to access this page.</Alert>)
                    setProfile(null); 
                    setCustomer(null);
                }
            } else {
                setAlertJSX(<Alert variant="danger">Unable to retrieve profile from server.</Alert>)
                setProfile(null); 
                setCustomer(null);            
            }  
        }
        fetch();
    }, [userContext, location.state])

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
            <Button variant="warning" onClick={()=>history.push("/change-password")} >Change Password</Button>{' '}
            <Button variant="secondary" onClick={()=>history.push("/edit-profile")} >Update My Profile</Button>{' '}
            <Button variant="primary" onClick={()=>history.push("/orders")} >View Order History</Button>{' '}
            <Button variant="dark" onClick={() => history.goBack()}>Go Back</Button>
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
