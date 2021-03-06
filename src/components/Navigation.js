import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar, Container, Button, Alert } from 'react-bootstrap';
import UserContext from '../UserContext';

export default function Navigation() {
    const history = useHistory();
    const userContext = useContext(UserContext);

    const loginJSX = () => {
        if (localStorage.getItem('userName')) {
            return (<React.Fragment>
                <Nav>
                    <Navbar.Text>Hello</Navbar.Text>
                    <Nav.Link onClick={()=>history.push('/profile')} active>{localStorage.getItem('userName')} <i className="far fa-user"></i></Nav.Link>                    
                </Nav>
                <Button className="ms-1"variant="light" onClick={()=>history.push("/cart")} ><i className="fas fa-shopping-cart"></i></Button> 
                <Button className="mx-3" variant="dark" onClick={userContext.logout}>Logout</Button>
            </React.Fragment>)
        } else {
            return (<React.Fragment>
                <Navbar.Text>Hello Stranger</Navbar.Text>
                <Button className="ms-3" variant="primary" onClick={()=>history.push("/login")} >Login</Button> 
                <Button className="ms-1"variant="light" onClick={()=>history.push("/register")} >Register</Button> 
            </React.Fragment>)
        }
    }

    return (<React.Fragment>

        <Navbar collapseOnSelect fixed='sticky' expand='sm' bg='success' variant='dark'>
            <Container>
                <Navbar.Brand href="/">
                <img
                    alt="Healthy Food Delivery"
                    src="%PUBLIC_URL%/../../great-to-go-logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    onClick={()=>history.push("/")}
                    />{` `}
                    GreatToGo Foods
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="me-auto">
                    <Nav.Link onClick={()=>history.push('/products')} >Home</Nav.Link>
                   
                    <Nav.Link onClick={()=>history.push('/about')} >About</Nav.Link>
                    <Nav.Link onClick={()=>history.push('/contact')} >Contact Us</Nav.Link>
                </Nav>
                <Nav>
                    {loginJSX()}                 
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        { localStorage.getItem('sessionExpired') === '1' ? <Alert variant="danger">Your session has expired. Please login Again. </Alert> : null }

    </React.Fragment>)
}