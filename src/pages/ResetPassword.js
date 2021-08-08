import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';
import UserContext from '../UserContext';

export default function ResetPassword() {
    const history = useHistory();
    
    const { accessToken } = useParams();
    localStorage.setItem('accessToken', accessToken);

    const userContext = useContext(UserContext);
    const [alertJSX, setAlertJSX] = useState();

    const [ formState, setFormState ] = useState({
        'newPassword': '',
        'confirmPassword': ''
    })

    const updateFormField = (e) => {
        setFormState (
            {
                ...formState,
                [e.target.name]: e.target.value
            }
        )
    }

    useEffect( () => {
        // load in the user profile using the access token
        async function fetch() {
            try {
                const result = await userContext.getProfile();
                console.log("Reset password get profile", result )
                setAlertJSX(<Alert variant="success">Your profile has been verified.</Alert>)
            } catch (err) {
                console.log("Change Password, getting Profile error", err)
                setAlertJSX(<Alert variant="danger">You are not authorised to access this page.</Alert>)
            }
        }
        fetch();
    }, [])

    const submitForm = async () => {

        try {
            const options = { 'headers': {'Authorization' : 'Bear ' + localStorage.getItem('accessToken')} };
            const data = {
                ...formState
            }
            await axios.put(config.API_URL + "/users/reset_password", data, options);
            setAlertJSX(<Alert variant="success">Password successfully changed.</Alert>) 
            setFormState({
                'newPassword': '',
                'confirmPassword': ''
            })

        } catch (e) {
            setAlertJSX(<Alert variant="danger">Invalid credentials provided.</Alert>)   
        }
    }

    return (
        <React.Fragment>
        <Container>
            <h1>Change Password</h1>
            { alertJSX ? alertJSX : null }
            <Form>
                <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new Password" 
                        name="newPassword" value={formState.newPassword} 
                        onChange={updateFormField} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm new Password" 
                        name="confirmPassword" value={formState.confirmPassword} 
                        onChange={updateFormField} />
                </Form.Group>

                <Button variant="primary" onClick={submitForm}>Submit</Button>{' '}
            </Form>
        </Container>
        </React.Fragment>
    )
}