import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';


export default function AllProducts() {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
        const fetch = async() => {
            let baseURL = config.API_URL + "/products";
            let response = await axios.get(baseURL);
            setProducts(response.data)
        }
        fetch();
    }, []);

    return (<React.Fragment>
        <h1>Show All: </h1>
        <Container>
            <Row>
            { products.map(p => <Col key={p.id}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={p.image_url} />
                    <Card.Body>
                        <Card.Title>{p.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">${p.unit_base_price/100}</Card.Subtitle>
                        <Card.Text>
                            {p.description}
                            <p>Available: {p.quantity_in_stock}</p>
                        </Card.Text>
                        <Button variant="primary">View Product</Button>
                    </Card.Body>
                </Card>
            </Col>) }
            </Row>
        </Container>

    </React.Fragment>)
}