import React, { useState, useEffect } from 'react';
import { Container, Col, Card, Button, Alert, Table } from 'react-bootstrap';
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
            await axios.delete(baseURL, {
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
            await axios.delete(baseURL, {
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
        let callingURL = config.API_URL + "/checkout";
        try {
            window.location.replace(callingURL + "?token=" + localStorage.getItem("accessToken") + "&callback=" + config.BASE_URL) 
        } catch (e) {
            setAlertJSX(<Alert variant="danger">ERROR: Failed to checkout.</Alert>)
        }
    }

    const renderCartJSX = () => {
        return (<React.Fragment>
            <Card>
                <Card.Header>
                    <h1>{localStorage.getItem('userName')}'s Shopping Cart</h1>
                    <Col>
                        <Button variant="primary" href="/" >Continue Shopping</Button>{' '}
                        { totalQuantity > 0 ? <Button variant="secondary" onClick={clearCart} >Clear Shopping Cart</Button> : null }
                    </Col>
                </Card.Header>

                <Card.Body>
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Category/Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    { cartItems.map( c => <tr key={c.id}>
                        <td><img className="thumbnail rounded" style={{maxHeight:"200px", maxWidth:"200px"}} src={c.product.image_url} alt={c.product.name}/> </td>
                        <td>{c.product.category.name}: {c.product.name}</td>
                        <td>$ {c.unitPriceStr}</td>
                        <td>  {c.quantity}</td>
                        <td>$ {c.amountStr}</td>
                        <td>
                            <Button variant="danger" onClick={() => removeFromCart(c)}>Remove</Button>
                        </td>
                    </tr>) }
                    </tbody>
                </Table>
                </Card.Body>
                <Card.Footer>
                    <Col>
                        <h5>Total Quantity: {totalQuantity} | Total Amount: ${totalAmount}</h5>
                        <Button variant="success"onClick={checkout} >Proceed to Checkout</Button>                    
                    </Col>
                </Card.Footer>
            </Card>
        </React.Fragment>)
    }

    return (
        <React.Fragment>
            <Container>
                { alertJSX ? alertJSX : null }
                { totalQuantity > 0 ? renderCartJSX() : <h1>Empty Shopping Cart</h1> }
                
            </Container>
        </React.Fragment>
    )
}