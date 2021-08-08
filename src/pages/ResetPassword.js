import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Container, Form, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';
import UserContext from '../UserContext';

export default function ResetPassword() {
    const history = useHistory();
    const { accessToken } = useParams();
    const userContext = useContext(UserContext);
    const [alertJSX, setAlertJSX] = useState([]);
    const [userName, setUserName] = useState('');

    const [ formState, setFormState ] = useState({
        'new_password': '',
        'confirm_password': ''
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
        console.log("Received ResetPassword", accessToken);
        async function fetch() {
            try {
                const result = await userContext.getProfileByToken(accessToken);
                console.log("Reset password get profile verified", result.data.name );
                setUserName(result.data.name);
                setAlertJSX(<Alert variant="success">Your profile has been verified.</Alert>);
            } catch (err) {
                console.log("Reset Password, getting Profile error", err);
                setAlertJSX(<Alert variant="danger">You are not authorised to access this page.</Alert>)
            }
        }

        fetch();

    }, [])

    const submitForm = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("submit reset password with token: ", accessToken);
        try {
            const options = { 'headers': {'Authorization' : 'Bear ' + accessToken } };
            const data = {
                ...formState
            }
            await axios.put(config.API_URL + "/users/reset_password", data, options);
            setAlertJSX(<Alert variant="success">Password successfully changed.</Alert>) 
            setFormState({
                'new_password': '',
                'confirm_password': ''
            })

            history.push('/login');

        } catch (e) {
            setAlertJSX(<Alert variant="danger">Invalid credentials provided.</Alert>)   
        }
    }


    return (<React.Fragment>
        <Container>
            { alertJSX ? alertJSX : null }
            <Card>
                <Card.Header><h1>Reset Password for {userName}</h1></Card.Header>
                <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="new-password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter new Password" 
                            name="new_password" value={formState.new_password} 
                            onChange={updateFormField} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirm-password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm new Password" 
                            name="confirm_password" value={formState.confirm_password} 
                            onChange={updateFormField} />
                    </Form.Group>

                    <Button variant="primary" onClick={submitForm}>Submit</Button>
                </Form>
                </Card.Body>
            </Card>
        </Container>
    </React.Fragment>)
}