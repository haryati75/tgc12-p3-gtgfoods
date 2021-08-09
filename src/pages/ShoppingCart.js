import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Col, Card, Button, Alert, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';
import config from '../config';

export default function ShoppingCart() {
    const history = useHistory();

    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [customer, setCustomer] = useState({});
    const [deliveryDate, setDeliveryDate] = useState(new Date());
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
                setCustomer(response.data.customer);

                let newDeliveryDate = new Date();
                newDeliveryDate.setDate(newDeliveryDate.getDate() + 1);
                setDeliveryDate(newDeliveryDate);
            } catch (e) {
                setAlertJSX(<Alert variant="danger">You need to login/register to access the Shopping Cart.</Alert>)     
                console.log("Shopping Cart failed access >> ", e)
            }
        }
        fetch();
    }, [cartItems]);


    const addQuantity = async (cartItem, quantity) => {
        let baseURL = config.API_URL + "/shopping-cart/" + cartItem.product_id + "/quantity/add/" + quantity;
        try {
            let response = await axios.get(baseURL, {
                'headers': {
                    'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                }
            });
            let updatedCartItem = response.data.cartItem;
            if (updatedCartItem) {
                let wantedCartItem = cartItems.filter(item => item.id === updatedCartItem.id ? item : null)[0];
                let clonedCartItem = {...wantedCartItem};
                clonedCartItem.quantity = updatedCartItem.quantity;

                let indexToChange = cartItems.findIndex(item => item.id === clonedCartItem.id);
                let clonedArray = [
                    ...cartItems.slice(0, indexToChange),
                    clonedCartItem,
                    ...cartItems.slice(indexToChange + 1)
                ]
                setCartItems(clonedArray);
                setAlertJSX(<Alert variant="success">Successfully updated quantity for {cartItem.product.name}.</Alert>)   
            } else {
                console.log("Error: Quantity not added.");
                setAlertJSX(<Alert variant="danger">Failed to add/reduce quantity for {cartItem.product.name}.</Alert>)   
            }
        } catch (e) {
            console.log("error adding quantity from cart product: ", e)
            setAlertJSX(<Alert variant="danger">Failed to add/reduce quantity for {cartItem.product.name}.</Alert>)            
        }
    }

    const removeFromCart = async (cartItem) => {
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

            setAlertJSX(<Alert variant="success">{cartItem.product.name} successfullly removed from Shopping Cart.</Alert>)            
        } catch (e) {
            console.log("error remove from cart: ", e)
            setAlertJSX(<Alert variant="danger">ERROR: Failed to remove {cartItem.product.name} from Shopping Cart.</Alert>)
        }
    }

    const clearCart = async () => {
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
                        <Button variant="primary" onClick={() => history.push('/products')} >Continue Shopping</Button> {' '}
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
                        <td>  
                            <span className="me-3">{c.quantity}</span>
                            <Button variant="primary" onClick={() => addQuantity(c, 1)}>+</Button>{' '}
                            <Button variant="secondary" onClick={() => addQuantity(c, -1)}>-</Button>
                        </td>
                        <td>$ {c.amountStr}</td>
                        <td>
                            <Button variant="secondary" href={"/products/"+c.product_id} >View Product</Button>{' '}
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
                    <Col>
                        <h5>Delivery will be send to:</h5>
                        <ul>
                            <li>Address: {customer.address_blk} {customer.address_street_1} {customer.address_street_2}</li>
                            <li>Unit: {customer.address_unit}</li>
                            <li>Postal Code: Singapore {customer.address_postal_code}</li>
                        </ul>
                        <h6>Delivery date: <Moment format="DD/MM/YYYY">{deliveryDate}</Moment></h6>
                        <Button variant="secondary" href="/edit-profile" >Change Address</Button>{' '}
                    </Col>
                </Card.Footer>
            </Card>
        </React.Fragment>)
    }

    return (
        <React.Fragment>
            <Container>
                { alertJSX ? alertJSX : null }
                { totalQuantity > 0 ? renderCartJSX() : 
                    <React.Fragment>
                        <Card>
                            <Card.Header><h1>Empty Shopping Cart</h1> </Card.Header>
                            <Card.Body>
                                <Button variant="primary" onClick={() => history.push('/products')} >Continue Shopping</Button> 
                            </Card.Body>                            
                        </Card>
                    </React.Fragment>
                }
            </Container>
        </React.Fragment>
    )
}