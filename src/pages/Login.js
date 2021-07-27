import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';

import UserContext from '../UserContext';

export default function Login() {

    // create a history hook (cannot use this in an IF!)
    const history = useHistory()

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

    async function login() {

        try {
            let response = await axios.post(config.API_URL + "/users/login", {
                email: formState.email,
                password: formState.password
            });

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('userName', response.data.userName); // to be used by NavBar
            userContext.setUser({
                'email': formState.email,
                'userName': response.data.userName,
                'accessToken': response.data.accessToken,
                'refreshToken': response.data.refreshToken
            })

            console.log("login successful", response.data)
        } catch (e) {
            alert("Login Failed!", e)
        }

        history.push('/all-products', {
            formState
        })

    }

    return <div>

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

            <Button variant="primary" onClick={login}>
                Submit
            </Button>
        </Form>

                {/* <>
        <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
        >
            <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        </> */}

    </div>

}
