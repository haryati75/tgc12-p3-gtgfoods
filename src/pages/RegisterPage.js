import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function RegisterPage() {

    // create a history hook (cannot use this in an IF!)
    const history = useHistory()

    const [birthDate, setBirthDate] = useState(new Date());

    const [ formState, setFormState ] = useState({
        // Customer data
        'first_name': '',
        'last_name' : '',
        'contact_no': '',
        'address_blk': '',
        'address_unit': '',
        'address_street_1': '',
        'address_street_2': '',
        'address_postal_code': '',
        'gender': '',
        'birth_date': null,

        // User data
        'email': '',
        'password': '',
        'confirm_password': ''
    })

    const updateFormField = (e) => {
        setFormState (
            {
                ...formState,
                [e.target.name]: e.target.value
            }
        )
    }

    const [validated, setValidated] = useState(false);
    const [alertJSX, setAlertJSX] = useState();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    
        setValidated(true);
        submitForm();
    };

    function submitForm() {
        if (validated) {
            history.push('/', {
                welcomeUser : 'Y'
            })
        } else {
            setAlertJSX(<Alert variant="danger">You have not keyed in the required fields.</Alert>)
        }
    }

    return (
        <React.Fragment>
        <Container className="card">
            <header className="card-header"><h1>Register with GreatToGo Foods today!</h1></header>
            { alertJSX ? alertJSX : null }

            <Form className="card-body" noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Col} md="4" className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter first name" 
                            name="first_name" value={formState.first_name}
                            onChange={updateFormField} />
                        <Form.Control.Feedback>Fantastic!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter last name" 
                            name="last_name" value={formState.last_name}
                            onChange={updateFormField} />
                        <Form.Control.Feedback>Fantastic!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" className="mb-3" controlId="formContactNo">
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control required type="text" placeholder="Enter main contact number" 
                            name="contact_no" value={formState.contact_no}
                            onChange={updateFormField} />
                        <Form.Control.Feedback>Fantastic!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="7" className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" 
                            name="email" value={formState.email}
                            onChange={updateFormField} />
                    </Form.Group>

                    <Form.Group as={Col} md="5" className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" 
                            name="password" value={formState.password} 
                            onChange={updateFormField} />
                    </Form.Group>
                </Row>
                <hr></hr>
                <Row>
                <Form.Group as={Col} md="4" className="mb-3" controlId="formAddressBlk">
                    <Form.Label>Block No</Form.Label>
                    <Form.Control type="text" placeholder="Enter block no. or building no." 
                        name="address_blk" value={formState.address_blk}
                        onChange={updateFormField} />
                </Form.Group>

                <Form.Group as={Col} md="8" className="mb-3" controlId="formAddressStreet1">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="Enter Street Details" 
                        name="address_street_1" value={formState.address_street_1}
                        onChange={updateFormField} />
                </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} md="3" className="mb-3" controlId="formAddressUnit">
                    <Form.Label>Unit No</Form.Label>
                    <Form.Control type="text" placeholder="Enter Unit no." 
                        name="address_unit" value={formState.address_unit}
                        onChange={updateFormField} />
                </Form.Group>                
                <Form.Group as={Col} md="6" className="mb-3" controlId="formAddressStreet2">
                    <Form.Label>Building Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Building Name, if any" 
                        name="address_street_2" value={formState.address_street_2}
                        onChange={updateFormField} />
                </Form.Group>

                <Form.Group as={Col} md="3" className="mb-3" controlId="formAddressPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter Singapore Postal Code" 
                        name="address_postal_code" value={formState.address_postal_code}
                        onChange={updateFormField} />
                </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Gender:</Form.Label>
                    <Form.Check 
                        type="radio"
                        name="gender"
                        id="formGenderFemale"
                        label="Female"
                        value="F"
                        checked={formState.gender==='F'}
                        onChange={updateFormField}
                    />
                    <Form.Check 
                        type="radio"
                        name="gender"
                        id="formGenderMale"
                        label="Male"
                        value="M"
                        checked={formState.gender==='M'}
                        onChange={updateFormField}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthDate">
                    <Form.Label>Date of Birth</Form.Label>{' '}
                    <DatePicker selected={birthDate} 
                        isClearable 
                        closeOnScroll={true}
                        dateFormat="dd MMM yyyy"
                        onChange={(date) => setBirthDate(date)} />
                </Form.Group>

                <Button type="submit">Submit form</Button>
            </Form>
        </Container>

        </React.Fragment>
    )
}