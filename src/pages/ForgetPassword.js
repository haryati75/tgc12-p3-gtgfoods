import React, { useState, useContext } from 'react';
import { Container, Card, Form, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import UserContext from '../UserContext';
import axios from 'axios';
import config from '../config';

export default function ForgetPassword() {
    const history = useHistory()
    const userContext = useContext(UserContext);
    const [ formState, setFormState ] = useState({
        'email': ''
    });
    const [ alertJSX, setAlertJSX ] = useState();

    const updateFormField = (e) => {
        setFormState (
            {
                ...formState,
                [e.target.name]: e.target.value
            }
        )
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {

            // generate access token backend
            let resetResult = await userContext.getResetToken(formState)
            console.log("getResetToken", resetResult);

            if (resetResult.accessToken && resetResult.accessToken !== '') {
                const emailData = {
                    service_id: 'contact_service',
                    template_id: 'forget_pwd',
                    user_id: resetResult.emailJSUserId,
                    template_params: {
                        'email': formState.email,
                        'userName': resetResult.userName,
                        'accessToken': resetResult.accessToken,
                        'contact_us_url': config.BASE_URL + "/contact",
                        'reset_password_url': config.BASE_URL + "/reset-password/" + resetResult.accessToken
                    }
                }
                const options = { 'headers': {'Content-Type' : 'application/json'} };

                let result = await axios.post('https://api.emailjs.com/api/v1.0/email/send', JSON.stringify(emailData), options);

                console.log("emailJS response: ", result);
                history.push('/login', {
                    ...formState
                })                
            } else {
                console.log("Error getting reset Token", resetResult.error);
                setAlertJSX(<Alert variant="danger">You have provided the wrong credentials.</Alert>)
            }
        } catch (err) {
            console.log("Error sending to EmailJS", err);
            setAlertJSX(<Alert variant="danger">Unable to submit your Reset Password request.</Alert>)
        }
    }

    return (<React.Fragment>
        <Container>
            { alertJSX ? alertJSX : null }
            <Card>
                <Card.Header><h1>Forget Password</h1></Card.Header>
                <Card.Body>
                    <Form className="contact-form" onSubmit={sendEmail}>
                        <Form.Group className="mb-3" controlId="contactus-email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" 
                                placeholder="name@example.com"                                     
                                name="email"
                                value={formState.email}
                                onChange={updateFormField}/>
                        </Form.Group>
                        <input className="btn btn-primary" type="submit" value="Submit" />{' '}
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>We will send you an email with a link that will expire in 1 hour. Please check your email after you submit.</Card.Text>
                </Card.Footer>
            </Card>
        </Container>
    </React.Fragment>)
}