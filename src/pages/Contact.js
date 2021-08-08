import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import emailjs from 'emailjs-com';

export default function Contact() {
    const history = useHistory()

    const [ formState, setFormState ] = useState({
        'fullname': '',
        'email': '',
        'message': '', 
        'contactRefNo': (Math.random() * 100000 | 0)
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
        console.log("SendEmail", e.target)
        try {
            await emailjs.sendForm('contact_service', 'contact_form', e.target, 'user_Fvc9zxXoPQStYaW3e3DN0' );
            history.push('/form-submitted', {
                formState
            })
        } catch (err) {
            console.log("Error sending to EmailJS", err);
            setAlertJSX(<Alert variant="danger">Unable to submit your message.</Alert>)
        }
    }

    return (
        <React.Fragment>
            <Container>
                { alertJSX ? alertJSX : null }
                <Card>
                    <Card.Header><h1>Contact Us Page</h1></Card.Header>
                    <Card.Body>
                        <Form className="contact-form" onSubmit={sendEmail}>
                            <input type="hidden" name="contactRefNo" value={formState.contactRefNo} />
                            <Form.Group className="mb-3" controlId="contactus-name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="How do you like us to address you?"
                                    name="fullname"
                                    value={formState.fullname}
                                    onChange={updateFormField} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="contactus-email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" 
                                    placeholder="name@example.com"                                     
                                    name="email"
                                    value={formState.email}
                                    onChange={updateFormField}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="contactus-message">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={3} 
                                     name="message"
                                     value={formState.message}
                                     onChange={updateFormField}/>                               
                            </Form.Group>
                            <input className="btn btn-primary" type="submit" value="Submit" />{' '}
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="secondary" onClick={() => history.goBack()} >Go Back</Button>
                    </Card.Footer>
                </Card>
            </Container>
        </React.Fragment>
    )
}