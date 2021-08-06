import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';

export default function ChangePassword() {
    const history = useHistory();

    const [alertJSX, setAlertJSX] = useState();

    const [ formState, setFormState ] = useState({
        'oldPassword': '',
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

    const submitForm = async () => {
        // Validate inputs before submit
        if (formState.newPassword === '' || formState.oldPassword === '' || formState.confirmPassword === '') {
            setAlertJSX(<Alert variant="danger">All fields needs to be filled in.</Alert>)   
            return;
        }

        if (formState.newPassword !== formState.confirmPassword) {
            setAlertJSX(<Alert variant="danger">Confirm Password is not equal to New Password.</Alert>)   
            return;
        }

        try {
            const options = { 'headers': {'Authorization' : 'Bear ' + localStorage.getItem('accessToken')} };
            const data = {
                'oldPassword': formState.oldPassword, 
                'newPassword': formState.newPassword
            }
            await axios.put(config.API_URL + "/users/change_password", data, options);
            setAlertJSX(<Alert variant="success">Password successfully changed.</Alert>) 
            setFormState({
                'oldPassword': '',
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
                <Form.Group className="mb-3" controlId="oldPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter current password" 
                        name="oldPassword" value={formState.oldPassword}
                        onChange={updateFormField} />
                </Form.Group>

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
                <Button variant="secondary" onClick={() => history.push('/profile')} >Back to Profile</Button>{' '}
                <Button variant="dark" onClick={() => history.goBack()}>Go Back</Button>

            </Form>
        </Container>
        </React.Fragment>
    )
}