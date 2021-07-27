import React, { useState, useContext } from 'react';
import axios from 'axios';
import config from '../config';

import UserContext from '../UserContext';

export default function Login() {

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
            userContext.setUser({
                email: formState.email
            })

            console.log("login successful")
        } catch (e) {
            alert("Login Failed!", e)
        }

    }

    return <div>
        <h1>Login</h1>
        <div>
            <label className="form-label">Email</label>
            <input type="text" name="email" value={formState.email} className="form-control" onChange={updateFormField}/>
        </div>
        <div>
            <label className="form-label">Password</label>
            <input type="text" name="password" value={formState.password} className="form-control" onChange={updateFormField}/>
        </div>
        <button className="my-3 btn btn-primary" onClick={login}>Submit</button>
    </div>

}
