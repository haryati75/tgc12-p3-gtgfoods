import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import axios from 'axios';

import config from '../config';

export default function ProductView() {
   
    const { product_id } = useParams();
    
    // useState's first argument must be the default value
    const [ product, setProduct ] = useState({})

    // load in the current active post
    useEffect(() => {
        const fetchProduct = async () => {
            
            try {
                console.log("before axios.get Product >>", product_id)
                const response = await axios.get(config.API_URL + "/products/"  + product_id);
                console.log("after axios >>>", response.data);
                setProduct(response.data);
            } catch (e) {
                console.log("ProductView err axios", e);
            }
        }
        fetchProduct()
    }, [product_id])

    return (
        <React.Fragment>
            <Container fluid>
                <Card justify-content-center >
                    <Card.Header>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Subtitle className="mb-2 ">Price (SGD): ${product.unit_base_price/100}</Card.Subtitle>
                    </Card.Header>
                    <Card.Img variant="top thumbnail" src={product.image_url} style={{ width: '30rem' }}/>
                    <Card.Body>
                        
                        <Card.Subtitle className="mb-2 text-muted">{product.brand ? product.brand['name'] : null}</Card.Subtitle>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>Ingredients: {product.ingredients}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success">Add To Cart</Button>
                    </Card.Footer>
                </Card> 
            </Container>

        </React.Fragment>
    )
}