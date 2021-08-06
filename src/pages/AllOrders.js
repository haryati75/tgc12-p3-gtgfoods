import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, ListGroup, Alert, Image, Button, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import OrderContext from '../OrderContext';

export default function AllOrders() {

    const history = useHistory();
    const orderContext = useContext(OrderContext);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // let response = await orderContext.refreshOrders();
        let result = orderContext.getOrders();
        setOrders(result);
        console.log("All Orders 1st", orders);
    }, []);

    useEffect( async () => {
        await orderContext.refreshOrders();
        setOrders(orderContext.getOrders());
        console.log("All Orders refresh", orders);
    }, [orders]);

    const renderOrdersJSX = () => {
        return (<React.Fragment>
            { orders.map( order => {<Card>
                <Card.Body>
                    <Card.Subtitle><h3>Your Order is currently being processed</h3></Card.Subtitle>
                    <ul>
                        <li>Order Id: {order.id} </li>
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
                                            <Image style={{ width: "12rem"}}src={item.product.image_url} roundedCircle /> 
                                        </Col>
                                        <Col xs={6}>
                                            {item.product.category.name}: {item.product.name} | Quantity: {item.quantity} | Price: {item.unitPriceStr} | Amount: {item.amountStr}
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
            </Card>})}      
        </React.Fragment>)
    }

    return (<React.Fragment>
        <Container>
            <Row className="my-3">
                <h1>{localStorage.getItem('userName')}'s Order History</h1>
                <Button variant="secondary" onClick={() => history.push('/products')} >Continue Shopping</Button>
            </Row>
            { orders ? renderOrdersJSX() : <h5>You have no previous orders.</h5> }
        </Container>
    </React.Fragment>)
}