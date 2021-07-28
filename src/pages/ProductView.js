import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from 'axios';

import config from '../config';

export default function ProductView(props) {
    const location = useLocation();
    const productId = location.state.productId;

    // useState's first argument must be the default value
    const [ product, setProduct ] = useState({})

    // load in the current active post
    useEffect(() => {
        const fetchProduct = async () => {
            if (parseInt(productId) > 0) {
                console.log("before axios.get Product", productId)
                const response = await axios.get(config.API_URL + "/products/"  + productId);
                console.log("after axios >>>", productId, response.data);
                setProduct(response.data);
            } else {
                console.log("Skip axios.get");
            }
        }
        fetchProduct()
    }, [productId])

    return (
        <React.Fragment>
            <h1>Product Details: </h1>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.image_url} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.category['name']}</Card.Subtitle>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Button variant="success">Add To Cart</Button>
                </Card.Body>
            </Card> 
        </React.Fragment>
    )
}