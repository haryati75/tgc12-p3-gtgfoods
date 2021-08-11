import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, ListGroup, Alert, Image, Button, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';
import config from '../config';
import { useGlobalSpinnerActionsContext } from '../GlobalSpinnerContext';

export default function AllOrders() {

    const history = useHistory();
    const setGlobalSpinner = useGlobalSpinnerActionsContext();

    const [orders, setOrders] = useState([]);
    const [alertJSX, setAlertJSX] = useState();

    useEffect(() => {
        const fetch = async () => {
            setGlobalSpinner(true);
            try {
                const fetchedOrders = await fetchOrders();
                if (fetchedOrders.length === 0) {
                    setAlertJSX(<Alert variant="warning">You have no previous orders.</Alert>);
                } else {
                    setOrders(fetchedOrders);
                }                     
            } catch (e) {
                setAlertJSX(<Alert variant="danger">Unable to load orders from the server.</Alert>);
            }
            setGlobalSpinner(false);
        }
        fetch();
     }, [setGlobalSpinner]);

    const fetchOrders = async () => {
        const response = await axios.get(config.API_URL + "/shopping-cart/orders", {
            'headers': {
                'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
            }
        });
        if (response.data.orders) {
            setOrders(response.data.orders);   
            return response.data.orders;    
        } else {
            setOrders([]);
            return [];
        }
    }

    const renderOrdersJSX = () => {
        return (<React.Fragment>
            { orders.map( order => {return (<Card key={order.id}>
                <Card.Body>
                    <Card.Subtitle><h3>Order Reference: {order.id}</h3></Card.Subtitle>
                    <ul>
                        <li>Order Date: <Moment format="DD/MM/YYYY">{order.order_date}</Moment></li>
                        <li>Order Status: {order.order_status}</li>
                        <li>Order Delivery Date: <Moment format="DD/MM/YYYY">{order.delivery_date}</Moment></li>
                        <li>Order Delivery Address: {order.delivery_address}</li>
                    </ul>

                    <Card>
                        <Card.Header>Ordered Items: </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {order.orderItems ? order.orderItems.map(item => <ListGroup.Item key={item.id}>
                                    <Row>
                                        <Col xs={2}>
                                            <Image style={{ maxWidth: "5rem"}}src={item.product.image_url} roundedCircle /> 
                                        </Col>
                                        <Col>
                                            {item.product.category.name}: {item.product.name} | Quantity: {item.quantity} | Price: {item.unitSalesPriceStr} | Amount: {item.amountStr} {' '}
                                            {item.product.quantity_in_stock <= 0 && !(order.order_status === "Complete" || order.order_status === "Delivering") ? <span className="badge bg-warning">Low stock. Delivery may be delayed.</span> : null }
                                        </Col>
                                    </Row>
                                </ListGroup.Item>) : null}
                            </ListGroup>                        
                        </Card.Body>
                    </Card>

                </Card.Body>                
                <Card.Footer>
                    <h5>Total Amount: $ {(order.order_amount_total / 100).toFixed(2)}</h5>
                </Card.Footer>            
            </Card>)})}      
        </React.Fragment>)
    }

    return (<React.Fragment>
        <Container>
            <Row className="my-3">
                <h1>{localStorage.getItem('userName')}'s Order History</h1>
            </Row>
            <Button className="mb-3" variant="secondary" onClick={() => history.push('/products')} >Continue Shopping</Button>{' '}
            <Button className="mb-3" variant="secondary" onClick={fetchOrders} >Refresh Order Listing</Button>
            { alertJSX ? alertJSX : null }
            { orders.length !== 0 ? renderOrdersJSX() : <Alert variant="warning">You have no previous orders.</Alert> }
        </Container>
    </React.Fragment>)
}