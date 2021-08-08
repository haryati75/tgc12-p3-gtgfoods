import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

import UserContext from '../UserContext';

export default function LoginPage() {
    const userContext = useContext(UserContext);
    const location = useLocation();
    const locationEmail = location.state && location.state.email ? location.state.email : null;
    const history = useHistory();
    const loginFail = location.state && location.state.loginFail ? location.state.loginFail : null;

    const [formState, setFormState] = useState({
        'email': locationEmail ? locationEmail : '',
        'password': ""
    })

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })
    }

    return <div>
        <Container>
            { loginFail ? <Alert variant="danger">Login Failed. Please try again.</Alert> : null }
            { locationEmail ? <Alert variant="success">Please check your email to reset your password.</Alert> : null }
            <Card>
                <Card.Header><h1>Login to GreatToGo Foods</h1></Card.Header>
                <Card.Body>
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
                        </Button>{' '}
                        <Button variant="secondary" onClick={()=>history.push('/forget-password')} >Forget Password</Button>
                    </Form>                    
                </Card.Body>
            </Card>
        </Container>
    </div>

}
