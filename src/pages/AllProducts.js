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
    const [alertJSX, setAlertJSX] = useState();

    useEffect(()=> {
        const fetch = async() => {
            try {
                let baseURL = config.API_URL + "/products";
                let response = await axios.get(baseURL);
                setProducts(response.data)
                console.log("AllProducts", response.data)
            } catch (e) {
                setAlertJSX(<Alert variant="danger">ERROR: Failed to load Products from server.</Alert>)
            }
        }
        fetch();
    }, []);

    const addToCart = async (productId, productName) => {
        let baseURL = config.API_URL + "/shopping-cart/" + productId + "/add";
        try {
            await axios.get(baseURL, {
                'headers': {
                    'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                }
            });
            setAlertJSX(<Alert variant="success">{productName} added to Shopping Cart successfully.</Alert>)
        } catch (e) {
            setAlertJSX(<Alert variant="danger">ERROR: Failed to add product to Shopping Cart.</Alert>)
            console.log(e);
        }
    }

    return (<React.Fragment>
        <Container>
            <Row>
                { alertJSX ? alertJSX : null }
                { welcomeUser === 'Y' ? <Alert variant="success">Welcome back to our shop, {localStorage.getItem('userName')}</Alert> : null } 
                <h1>All Products in the store</h1>
            </Row>
            <Row>
                { products.map(p => <Col key={p.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={p.image_url} />
                        <Card.Body>
                            <Card.Title>{p.category.name}: {p.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Price: ${p.unit_base_price/100}
                                { p.quantity_in_stock <= 0 ? <span className="badge bg-warning">Low stock. Delivery within 1 week.</span> : null }
                            </Card.Subtitle>
                            <Card.Text>{p.description}</Card.Text>
                            <Card.Footer>
                                { p.tags.map( t => <span className="badge rounded-pill bg-info text-dark mx-1" key={t.id}>{t.name}</span> ) }
                            </Card.Footer>

                            <Button variant="secondary" href={"/products/"+p.id} >View Product</Button>{' '}
                            { localStorage.getItem('userName') ? 
                                <Button variant="primary" onClick={() => addToCart(p.id, p.name)} >Add To Cart</Button>
                            : null }
                        </Card.Body>
                    </Card>
                </Col>) }
            </Row>
        </Container>

    </React.Fragment>)
}