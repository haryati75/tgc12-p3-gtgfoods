import React from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

export default function Navigation() {

    return (<React.Fragment>

        <Navbar collapseOnSelect fixed='sticky' expand='sm' bg='success' variant='dark'>
            <Container>
                <Navbar.Brand href="#home">GreatToGo Foods</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="me-auto">
                    <Nav.Link href='../'>Home</Nav.Link>
                    <Nav.Link href='../products'>Products</Nav.Link>
                    <Nav.Link href='../all-products'>Show All Products</Nav.Link>
                    <Nav.Link href='../about'>About</Nav.Link>
                    <Nav.Link href='../contact'>Contact Us</Nav.Link>
                </Nav>
                <Nav>
                    <Navbar.Text>
                        Hello 
                    </Navbar.Text>
                    <Nav.Link href='../profile' active>{localStorage.getItem('userName')}</Nav.Link>
                    <Button variant="light" href="/login">Login</Button>
                    <Button variant="dark" href="/logout">Logout</Button>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </React.Fragment>)

}