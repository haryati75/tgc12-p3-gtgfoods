import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import UserContext from '../UserContext';

export default function LoginPage() {

    const location = useLocation();
    const loginFail = location.state && location.state.loginFail ? location.state.loginFail : null;

    const [formState, setFormState] = useState({
        'email': "",
        'password': ""
    })

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })
    }

    const userContext = useContext(UserContext);

    return <div>
        <Container>
            <header><h1>Login Page</h1></header>
            { loginFail ? <Alert variant="danger">Login Failed. Please try again.</Alert> : null }
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                        name="email" value={formState.email}
                        onChange={updateFormField} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                        name="password" value={formState.password} 
                        onChange={updateFormField} />
                </Form.Group>

                <Button variant="primary" onClick={()=> { userContext.login(formState.email, formState.password) }}>
                    Submit
                </Button>
            </Form>
        </Container>
    </div>

}
