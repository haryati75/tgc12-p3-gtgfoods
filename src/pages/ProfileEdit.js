import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import UserContext from '../UserContext';

export default function UserProfile() {

    const history = useHistory();
    const userContext = useContext(UserContext);

    const [alertJSX, setAlertJSX] = useState();

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

    useEffect( () => {
        // load in the user profile using the access token
        async function fetch() {

            const result = await userContext.getProfile();
            if (result.status === 200) {
                // set FormState data
                console.log("getProfile", result.data)
                let { id, user_id, user, ...customerData } = result.data
                let formData = {
                    ...customerData,
                    'email': user.email,
                    'password': 'blank',
                    'confirm_password':'blank'
                }
                setFormState({
                    ...formData
                })

            } else {
                if (result.status === 403 || result.status === 401) {
                    setAlertJSX(<Alert variant="danger">You are not authorised to access this page.</Alert>)
                } else {
                    setAlertJSX(<Alert variant="danger">Unable to retrieve profile.</Alert>)
                }
      
            }  

        }
        fetch();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        let result = await userContext.saveProfile(formState);
        if (result === 200) {
            history.push('/profile')
        }
        if (result && result !== 200) {
            if (typeof result === "string") {
            setAlertJSX(result);
            } else {
                setAlertJSX(Object.values(result))
            }
        }
    }

    const renderProfile = () => {
        return (<React.Fragment>
            <header className="card-header"><h1>Edit Profile</h1></header>
            <div>{ alertJSX ? <Alert variant="danger">{alertJSX}</Alert> : null }</div>

            <Form className="card-body">
                <Row><h5>Required Fields:</h5></Row>
                <Row>
                    <Form.Group as={Col} md="4" className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter first name" 
                            name="first_name" value={formState.first_name}
                            onChange={updateFormField} />
                    </Form.Group>

                    <Form.Group as={Col} md="4" className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter last name" 
                            name="last_name" value={formState.last_name}
                            onChange={updateFormField} />
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
                    </Form.Group>

                    {/* <Form.Group as={Col} md="3" className="mb-3" controlId="formPassword">
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
                    </Form.Group> */}
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
                <Button onClick={handleSubmit}>Save Profile</Button>{' '}
                <Button variant="secondary" href="/profile" >Cancel</Button>
            </Form>

        </React.Fragment>)
    }

    return (
        <React.Fragment>
            <Container className="card">
                { renderProfile() }
            </Container>
        </React.Fragment>
    )

}
