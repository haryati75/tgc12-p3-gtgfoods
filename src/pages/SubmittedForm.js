import React from "react";
import { useLocation } from 'react-router-dom';

export default function SubmittedForm() {

    const location = useLocation();
    const formState = location.state.formState;
    const fullname = formState.fullname;
    const email = formState.email;

    return (
        <React.Fragment>
            <h1>Thank you for contacting us</h1> 
            <p>Your Name: {fullname}</p>
            <p>Your Email: {email}</p>
        </React.Fragment>
    )
}