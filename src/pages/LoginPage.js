import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import UserContext from '../UserContext';

export default function LoginPage() {

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
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                        name="email" value={formState.email}
                        onChange={updateFormField} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
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
