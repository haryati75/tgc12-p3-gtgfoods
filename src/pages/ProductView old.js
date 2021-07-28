import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from 'axios';

import config from '../config';

export default function ProductView(props) {
    // useState's first argument must be the default value
    const [ activeProduct, setActiveProduct ] = useState({})
    const [ activeProductId, setActiveProductId ] = useState(0);

    // load in the current active post
    useEffect(() => {
        const fetchProduct = async (productId) => {
            if (productId > 0) {
                console.log("before axios.get Product", productId)
                const base_URL = config.API_URL + "/products/";
                const response = await axios.get(base_URL + productId);
                console.log("after axios >>>", productId, response.data);
                setActiveProduct(response.data);
            } else {
                setActiveProductId(0);
                console.log("Skip axios.get");
            }
        }
        fetchProduct(activeProductId)
    }, [activeProductId])

    return (
        <React.Fragment>
            <h1>Products</h1>
            <h2> Active Product By Id </h2>
            <input type="text" value={activeProductId} 
                name="activeProductId"
                onChange = {(e) => {
                    setActiveProductId(e.target.value)
                }}
            />
            { activeProductId !== 0 ?
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={activeProduct.image_url} />
                    <Card.Body>
                        <Card.Title>{activeProduct.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{activeProduct.brand['name']}</Card.Subtitle>
                        <Card.Text>
                            {activeProduct.description}
                        </Card.Text>
                        <Button variant="success">Add To Cart</Button>
                    </Card.Body>
                </Card> 
            : null}

        </React.Fragment>
    )
}