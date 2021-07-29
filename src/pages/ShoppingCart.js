import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';

export default function ShoppingCart() {

    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=> {
        const fetch = async() => {
            console.log("calling Shopping cart with JWT")
            let baseURL = config.API_URL + "/shopping-cart";
            try {
                let response = await axios.get(baseURL, {
                    'headers': {
                        'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                    }
                });
                setCartItems(response.data.cartItems);
                setTotalAmount(response.data.totalAmount);
                setTotalQuantity(response.data.totalQuantity);
                localStorage.setItem('cartTotalQuantity', response.data.totalQuantity);
                setIsAuthenticated(true);
                console.log("ShoppingCart", response.data);
            } catch (e) {
                console.log("Shopping Card failed access >> ", e)
                setIsAuthenticated(false);
            }
        }
        fetch();
    }, []);

    const renderCartJSX = () => {
        return (<React.Fragment>
            <Container>
                <Row>
                    <h1>{localStorage.getItem('userName')}'s Shopping Cart</h1>
                </Row>
                <Row>
                    { cartItems.map( p => <Col key={p.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={p.product.image_url} />
                            <Card.Body>
                                <Card.Title>{p.product.category.name}: {p.product.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">${p.product.unit_base_price/100}</Card.Subtitle>
                                <Card.Text>{p.product.description}</Card.Text>
                                <Card.Footer>Quantity To Order: {p.quantity}</Card.Footer>    
                            </Card.Body>
                        </Card>
                    </Col>) }
                </Row>
                <Row>
                    <h5>Total Quantity: {totalQuantity}</h5>
                    <Button variant="success" href="/" >Checkout to Stripe (Total: ${totalAmount})</Button>
                </Row>
            </Container>
        </React.Fragment>)
    }

    return (
        <React.Fragment>
            <Container>
                { isAuthenticated ? renderCartJSX()
                : <Alert variant="danger">You need to login/register to access the Shopping Cart.</Alert> }
            </Container>
        </React.Fragment>
    )
}