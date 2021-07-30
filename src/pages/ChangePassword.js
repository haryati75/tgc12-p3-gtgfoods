import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import config from '../config';

export default function ChangePassword() {
    // create a history hook (cannot use this in an IF!)
    const history = useHistory()

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
        // check for empty form
        let message = "";
        // call API to change password
        try {
            await axios.get(config.API_URL + "/users/change-password", {
                'headers': {
                    'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                },
                'oldPassword': formState.oldPassword,
                'newPassword': formState.newPassword
            });
            message = "Password changed successfully."

        } catch (e) {
            console.log("API profile error", e)
            message = "Re-enter correct password or re-login to change password."
        }
        history.push('/profile', {
            message
        })

    }

    return (
        <React.Fragment>
        <Container>
            <header>Change Password</header>
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

                <Button variant="primary" onClick={submitForm}>
                    Submit
                </Button>
            </Form>
        </Container>
        </React.Fragment>
    )
}