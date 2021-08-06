import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import axios from 'axios';
import config from '../config';
import ProductContext from '../ProductContext';

export default function ProductView() {
   
    const { product_id } = useParams();
    const history = useHistory();
    const productContext = useContext(ProductContext);
    
    // useState's first argument must be the default value
    const [ product, setProduct ] = useState({});
    const [alertJSX, setAlertJSX] = useState();

    // load in the current active post
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(config.API_URL + "/products/"  + product_id);
                setProduct(response.data);
            } catch (e) {
                console.log("ProductView err axios", e);
            }
        }
        fetchProduct()
    }, [product_id])

    const handleAddToCart = async (productId, productName) => {
        let response = await productContext.addToCart(productId, productName);
        setAlertJSX(response);
    }

    return (
        <React.Fragment>
            <Container fluid>
               { alertJSX ? alertJSX : null }
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
                        { localStorage.getItem('userName') ? 
                            <Button variant="primary" onClick={() => handleAddToCart(product.id, product.name)} >Add To Cart</Button>
                        : null }{' '}
                        <Button variant="secondary" href="/">Continue Shopping</Button>{' '}
                        <Button variant="dark" onClick={() => history.goBack()}>Go Back</Button>
                    </Card.Footer>
                </Card> 
            </Container>

        </React.Fragment>
    )
}