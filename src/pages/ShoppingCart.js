import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';

export default function ShoppingCart() {

    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [alertJSX, setAlertJSX] = useState();

    useEffect(()=> {
        const fetch = async() => {
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
            } catch (e) {
                setAlertJSX(<Alert variant="danger">You need to login/register to access the Shopping Cart.</Alert>)     
                console.log("Shopping Cart failed access >> ", e)
            }
        }
        fetch();
    }, []);

    const removeFromCart = async (cartItem) => {
        console.log("Removing from shopping cart", cartItem.product_id);
        let baseURL = config.API_URL + "/shopping-cart/" + cartItem.product_id + "/remove";
        try {
            await axios.get(baseURL, {
                'headers': {
                    'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                }
            });

            // update cartItems array
            let itemIndex = cartItems.findIndex(item => item.id === cartItem.id);
            setCartItems([
                ...cartItems.slice(0, itemIndex),
                ...cartItems.slice(itemIndex + 1)
            ])
            setTotalAmount(totalAmount - cartItem.amount);
            setTotalQuantity(totalQuantity - cartItem.quantity);

            setAlertJSX(<Alert variant="success">{cartItem.product.name} removed from Shopping Cart.</Alert>)            
        } catch (e) {
            console.log("error remove from cart: ", e)
            setAlertJSX(<Alert variant="danger">ERROR: Failed to remove {cartItem.product.name} from Shopping Cart.</Alert>)
        }
    }

    const clearCart = async (productId) => {
        let baseURL = config.API_URL + "/shopping-cart/clear";
        try {
            await axios.get(baseURL, {
                'headers': {
                    'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                }
            });
            setCartItems([]);
            setTotalAmount(0);
            setTotalQuantity(0);
            setAlertJSX(<Alert variant="success">Shopping Cart has been cleared.</Alert>)            
        } catch (e) {
            setAlertJSX(<Alert variant="danger">ERROR: Failed to clear Shopping Cart.</Alert>)
        }
    }

    const checkout = async () => {
        console.log("checking out");
        let baseURL = config.API_URL + "/checkout";
        try {
            // await axios.get(baseURL, {
            //     'headers': {
            //         'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
            //     }
            // });
            window.location.replace(baseURL + "?token=" + localStorage.getItem("accessToken") + "&callback=" + "https://3000-rose-hummingbird-7muwt07k.ws-us11.gitpod.io/")
            // setAlertJSX(<Alert variant="success">Checkout Successful.</Alert>)            
        } catch (e) {
            setAlertJSX(<Alert variant="danger">ERROR: Failed to checkout.</Alert>)
        }
    }

    const renderCartJSX = () => {
        return (<React.Fragment>
            <Card>
                <Row>
                    <h1>{localStorage.getItem('userName')}'s Shopping Cart</h1>
                </Row>
                <Row>
                    { cartItems.map( c => <Col key={c.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={c.product.image_url} />
                            <Card.Body>
                                <Card.Title>{c.product.category.name}: {c.product.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">${c.product.unit_base_price/100}</Card.Subtitle>
                                <Card.Text>{c.product.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                Quantity To Order: {c.quantity}
                                {' '}<Button variant="danger" onClick={() => removeFromCart(c)}>Remove</Button>
                            </Card.Footer>
                        </Card>
                    </Col>) }
                </Row>
                <Card.Footer>
                    <h5>Total Quantity: {totalQuantity}</h5>
                    <Button variant="success"onClick={checkout} >Checkout to Stripe (Total: ${totalAmount})</Button>
                    <Button variant="secondary" onClick={clearCart} >Clear Shopping Cart</Button>
                </Card.Footer>
            </Card>
        </React.Fragment>)
    }

    return (
        <React.Fragment>
            <Container>
                { alertJSX ? alertJSX : null }
                { totalQuantity > 0 ? renderCartJSX() : <h1>Empty Shopping Cart</h1> }
                <Button variant="primary" href="/" >Continue Shopping</Button>
            </Container>
        </React.Fragment>
    )
}