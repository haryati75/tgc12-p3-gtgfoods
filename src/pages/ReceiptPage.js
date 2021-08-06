import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, ListGroup, Alert, Image, Button, Row, Col } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Moment from 'react-moment';
import axios from 'axios';
import config from '../config';
import OrderContext from '../OrderContext';

export default function ReceiptPage() {
    const sessionId = (new URLSearchParams(useLocation().search)).get('sessionId');
    const history = useHistory();

    const orderContext = useContext(OrderContext);

    const [order, setOrder] = useState({});
    const [alertJSX, setAlertJSX] = useState();

    useEffect(()=> {
        const timer = setTimeout(() => {
            console.log("Delaying call to API after Stripe success payment....")
            fetch();
        }, 2000);

        return () => clearTimeout(timer);
       
    }, []);

    const fetch = async() => {

        let baseURL = config.API_URL + "/shopping-cart/order/" + sessionId;
        try {
            let response = await axios.get(baseURL, {
                'headers': {
                    'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                }
            });
            console.log("API get order called", response.data.order.orderItems);
            setOrder(response.data.order)
            orderContext.refreshOrders();

        } catch (e) {
            setAlertJSX(<Alert variant="danger">Unable to retrieve order information. Please refresh again.</Alert>)     
            console.log("Stripe failed access >> ", e)
        }

    }

    const renderReceipt = () =>  {
        return (<React.Fragment>

            
            <Card.Body>
                <Card.Subtitle><h3>Your Order is currently being processed</h3></Card.Subtitle>
                <ul>
                    <li>Order Id: {order.id} </li>
                    <li>Order Date: <Moment format="DD/MM/YYYY">{order.order_date}</Moment></li>
                    <li>Order Status: {order.order_status}</li>
                    <li>Order Delivery Date: <Moment format="DD/MM/YYYY">{order.delivery_date}</Moment></li>
                    <li>Order Delivery Address: {order.delivery_address}</li>
                </ul>
            </Card.Body>
                     
            <Card>
                <Card.Header>Ordered Items: </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        {order.orderItems ? order.orderItems.map(item => <ListGroup.Item key={item.id}>
                            <Row>
                                <Col xs={2}>
                                    <Image style={{ width: "12rem"}}src={item.product.image_url} roundedCircle /> 
                                </Col>
                                <Col xs={6}>
                                    {item.product.category.name}: {item.product.name} | Quantity: {item.quantity} | Price: {item.unitPriceStr} | Amount: {item.amountStr}
                                </Col>
                            </Row>
                        </ListGroup.Item>) : null}
                    </ListGroup>                        
                </Card.Body>
                <Card.Footer>
                    <h5>Total Amount: $ {(order.order_amount_total / 100).toFixed(2)}</h5>
                    <Button variant="secondary" onClick={() => history.push('/profile')} >My Profile</Button>{' '}
                    <Button variant="secondary" onClick={() => history.push('/')} >Continue Shopping</Button>
                </Card.Footer>
            </Card>
        </React.Fragment>)
    }

    return (
        <React.Fragment>
            <Container>
                { alertJSX ? alertJSX : null }
                <Card>
                    <Card.Header><h1>Stripe Payment Successful - Thank You!</h1></Card.Header>
                    { order ? renderReceipt() : null }                    
                </Card>

            </Container>
        </React.Fragment>
    )
    
}