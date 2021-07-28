import React, {useContext} from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import UserContext from '../UserContext';

export default function Navigation() {

    const userContext = useContext(UserContext);

    const loginJSX = () => {
        if (localStorage.getItem('userName')) {
            return (<React.Fragment>
                <Nav.Link href='../profile' active>Hello {localStorage.getItem('userName')}</Nav.Link>
                <Button className="mx-3" variant="dark" onClick={userContext.logout}>Logout</Button>
            </React.Fragment>)
        } else {
            return (<React.Fragment>
                <Navbar.Text>Hello Stranger</Navbar.Text>
                <Button className="ms-3" variant="primary" href="/login">Login</Button> 
                <Button className="ms-1"variant="light" href="/register">Register</Button> 
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
                    />{` `}
                    GreatToGo Foods
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="me-auto">
                    <Nav.Link href='/'>Home</Nav.Link>
                    {/* <Nav.Link href='../products'>Products</Nav.Link> */}
                    {/* <Nav.Link href='../all-products'>Show All Products</Nav.Link> */}
                    <Nav.Link href='../about'>About</Nav.Link>
                    <Nav.Link href='../contact'>Contact Us</Nav.Link>
                </Nav>
                <Nav>
                    {loginJSX()}                 
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </React.Fragment>)

}