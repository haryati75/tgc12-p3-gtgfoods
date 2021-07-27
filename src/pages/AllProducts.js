import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
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
        { products.map(p => <div key={p.id}>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={p.image_url} />
                <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>
                        {p.description}
                        {p.unit_base_price}
                        {p.quantity_in_stock}
                    </Card.Text>
                    <Button variant="primary">Add To Cart</Button>
                </Card.Body>
            </Card>

        </div>) }
    </React.Fragment>)
}