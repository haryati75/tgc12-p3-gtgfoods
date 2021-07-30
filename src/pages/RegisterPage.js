import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export default function RegisterPage() {
    // create a history hook (cannot use this in an IF!)
    const history = useHistory()

    const [ formState, setFormState ] = useState({
        'fullname': '',
        'email': ''
    })

    const updateFormField = (e) => {
        setFormState (
            {
                ...formState,
                [e.target.name]: e.target.value
            }
        )
    }

    function submitForm() {
        let message = "Registered and login."
        history.push('/', {
            message
        })
    }

    return (
        <React.Fragment>
            <h1>Register with Us:</h1>
            <div>
                <div>
                    <label>Full Name:</label>
                    <input type="text" name="fullname"
                        value={formState.fullname}
                        onChange={updateFormField}/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email"
                        value={formState.email}
                        onChange={updateFormField}/>
                </div>
                <input type="button" value="Submit" onClick={submitForm}/>
            </div>
        </React.Fragment>
    )
}