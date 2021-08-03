import React, { useState, useContext } from 'react';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';

import axios from 'axios';
import config from '../config';
import UserContext from '../UserContext';

export default function RegisterPage() {

    // create a history hook (cannot use this in an IF!)
    const userContext = useContext(UserContext);

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
        'gender': '-',
        'birth_date': '',

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


    const [alertJSX, setAlertJSX] = useState();

    const submitForm = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { email, password, confirm_password, ...customerData } = formState;

        if (formState.first_name !== '' && email !== '' && password !== '' && password === confirm_password) {
            const userData = {
                'name': formState.first_name + ' ' + formState.last_name,
                email,
                password
            }
            // call API to register user and login when successful
            try {
                let response = await axios.post(config.API_URL + "/users/register", {
                    'user': userData, 
                    'customer': {...customerData}                    
                });
                console.log(response.data);
                userContext.login(email, password)
               
            } catch (e) {
                console.log("Register failed >> ", e.status, e.message)
                setAlertJSX(<Alert variant="danger">Credential already exists. Please try login.</Alert>)   
            }
        } else if (password !== confirm_password) {
            setAlertJSX(<Alert variant="danger">Confirm Password did not match with Password.</Alert>)
        } else {
            setAlertJSX(<Alert variant="danger">Required fields not keyed in. Please try again.</Alert>) 
        }
    }

    return (
        <React.Fragment>
        <Container className="card">
            <header className="card-header"><h1>Register with GreatToGo Foods today!</h1></header>
            { alertJSX ? alertJSX : null }

            <Form className="card-body">
                <Row><h5>Required Fields:</h5></Row>
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
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="6" className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" 
                            name="email" value={formState.email}
                            onChange={updateFormField} />
                        <Form.Control.Feedback type="invalid">
                            Please enter your email address.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" 
                            name="password" value={formState.password} 
                            onChange={updateFormField} />
                    </Form.Group>

                    <Form.Group as={Col} md="3" className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" placeholder="Confirm Password" 
                            name="confirm_password" value={formState.confirm_password} 
                            onChange={updateFormField} />
                        <Form.Control.Feedback type="invalid">
                            Not Match. Please confirm password again.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <hr></hr>
                <Row><h5>Optional:</h5></Row>
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
                <Row>
                <Form.Group className="mb-6" controlId="formGender">
                    <Form.Label>Gender:</Form.Label>{' '}
                    <Form.Check 
                        inline
                        type="radio"
                        name="gender"
                        id="formGenderNotProvided"
                        label="Not Provided"
                        value="-"
                        checked={formState.gender==='-'}
                        onChange={updateFormField}
                    />
                    <Form.Check 
                        inline
                        type="radio"
                        name="gender"
                        id="formGenderFemale"
                        label="Female"
                        value="F"
                        checked={formState.gender==='F'}
                        onChange={updateFormField}
                    />
                    <Form.Check 
                        inline
                        type="radio"
                        name="gender"
                        id="formGenderMale"
                        label="Male"
                        value="M"
                        checked={formState.gender==='M'}
                        onChange={updateFormField}
                    />
                </Form.Group>

                <Form.Group as={Col} md="6" className="mb-3" controlId="formBirthDate">
                    <Form.Label>Birth Date (YYYY-MM-DD)</Form.Label>
                    <Form.Control type="text" placeholder="Enter birth date" 
                        name="birth_date" value={formState.birth_date}
                        onChange={updateFormField} />
                </Form.Group>
                </Row>
                <Button onClick={submitForm}>Submit Registration</Button>
            </Form>
        </Container>

        </React.Fragment>
    )
}