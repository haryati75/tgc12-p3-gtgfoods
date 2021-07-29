import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../config';


export default function AllProducts() {

    // check if just login or logout
    const location = useLocation();
    const welcomeUser = location.state ? location.state.welcomeUser : null;

    const [products, setProducts] = useState([]);

    useEffect(()=> {
        const fetch = async() => {
            let baseURL = config.API_URL + "/products";
            let response = await axios.get(baseURL);
            setProducts(response.data)
            console.log("AllProducts", response.data)
        }
        fetch();
    }, []);

    return (<React.Fragment>
        <Container>
            <Row>
                { welcomeUser === 'N' ? <Alert variant="warning">Goodbye! You will need to login to Add to Cart.</Alert> : null }
                { welcomeUser === 'Y' ? <Alert variant="success">Welcome back to our shop, {localStorage.getItem('userName')}</Alert> : null } 
                <h1>All Products in the store</h1>
            </Row>
            <Row>
                { products.map(p => <Col key={p.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={p.image_url} />
                        <Card.Body>
                            <Card.Title>{p.category.name}: {p.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">${p.unit_base_price/100}</Card.Subtitle>
                            <Card.Text>{p.description}</Card.Text>
                            <Card.Footer>Available: {p.quantity_in_stock}</Card.Footer>        
                                       
                            <Button variant="secondary" href={"/products/"+p.id} >View Product</Button>{' '}
                            <Button variant="success" href={"/cart/"+p.id} >Add To Cart</Button>
                        </Card.Body>
                        { p.tags.map( t => <span key={t.id}>{t.name}</span> ) }     
                    </Card>
                </Col>) }
            </Row>
        </Container>

    </React.Fragment>)
}