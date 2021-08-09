import React from "react";
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function SubmittedForm() {

    const location = useLocation();
    const { fullname, email, message, bcc_to, contactRefNo } = location.state.formState;

    return (
        <React.Fragment>
            <Container>
                <h1>Contact Reference No. {contactRefNo}:</h1> 
                <h3>Thank you for contacting us.</h3>
                <p>Your Name: {fullname}</p>
                <p>Your Email: {email}</p>             
                <p>Your Message: {message}</p>
                <p>BCC: {bcc_to}</p>   
            </Container>

        </React.Fragment>
    )
}