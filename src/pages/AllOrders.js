import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, ListGroup, Alert, Image, Button, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';
import config from '../config';

import OrderContext from '../OrderContext';

export default function AllOrders() {

    const history = useHistory();
    const orderContext = useContext(OrderContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // async function fetch() {
        //     const response = await axios.get(config.API_URL + "/shopping-cart/orders", {
        //         'headers': {
        //             'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
        //         }
        //     });
        //     setOrders(response.data.orders);
        // }
        // fetch();
        console.log("Setup Order Page")
        setOrders(orderContext.getOrders());

    }, []);


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
                                            {item.product.quantity_in_stock <= 0 && order.order_status !== "Complete" ? <span className="badge bg-warning">Low stock. Delivery within 1 week.</span> : null }
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
            <Button className="mb-3" variant="secondary" onClick={() => history.push('/products')} >Continue Shopping</Button>
            { orders ? renderOrdersJSX() : <h5>You have no previous orders.</h5> }
        </Container>
    </React.Fragment>)
}