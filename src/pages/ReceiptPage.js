import React, { useEffect, useState } from 'react';
import { Card, Container, ListGroup, Alert } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Moment from 'react-moment';
import axios from 'axios';
import config from '../config';

export default function ReceiptPage() {
    const sessionId = (new URLSearchParams(useLocation().search)).get('sessionId');

    const [order, setOrder] = useState({});
    const [alertJSX, setAlertJSX] = useState();

    // create use effect to call API checkout/show-order

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
            console.log("API get order called", response);
            setOrder(response.data.order)

        } catch (e) {
            setAlertJSX(<Alert variant="danger">Unable to retrieve order information. Please refresh again.</Alert>)     
            console.log("Stripe failed access >> ", e)
        }

    }

    return (
        <React.Fragment>
            <Container>
                <Card>
                    <Card.Header><h1>Receipt Page - Payment Successful</h1></Card.Header>
                    {/* Render Order here */}
                    <Card.Text className="text-muted">Stripe Id: {sessionId} </Card.Text>
                    <Card.Text className="text-muted">Order Id: {order.id} </Card.Text>

                    <Card.Body>
                        <ul>
                            <li>Order Date: <Moment format="DD/MM/YYYY">{order.order_date}</Moment></li>
                            <li>Order Status: {order.order_status}</li>
                            <li>Order Delivery Date: <Moment format="DD/MM/YYYY">{order.delivery_date}</Moment></li>
                            <li>Order Delivery Address: {order.delivery_address}</li>
                        </ul>
                    </Card.Body>
                </Card>                
                <Card>
                    <Card.Header>Ordered Items: </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {order.orderItems.map(item => <ListGroup.Item key={item.id}>
                                {item.product.category.name}: {item.product.name} | Quantity: {item.quantity} | Price: {item.unitPriceStr} | Amount: {item.amountStr}
                            </ListGroup.Item>)}
                        </ListGroup>                        
                    </Card.Body>
                    <Card.Footer>
                        <h5>Total Amount: $ {(order.order_amount_total / 100).toFixed(2)}</h5>
                    </Card.Footer>
                </Card>

            </Container>
        </React.Fragment>
    )
}