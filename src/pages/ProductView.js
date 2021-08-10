import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
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
        const fetch = async () => {
            try {
                const response = await axios.get(config.API_URL + "/products/"  + product_id);
                setProduct(response.data);
            } catch (e) {
                console.log("ProductView err axios", e);
            }
        }
        fetch();
    }, [product_id])

    const handleAddToCart = async (productId, productName) => {
        let response = await productContext.addToCart(productId, productName);
        setAlertJSX(response);
    }

    return (
        <React.Fragment>
            <Container>
               { alertJSX ? alertJSX : null }
                <Card style={{ maxWidth:"80rem"}}>
                    <Card.Header className="text-center">
                        <Card.Title><h1>{product.name}</h1></Card.Title>
                        <Card.Subtitle className="mb-2 ">Price (SGD): ${product.unit_base_price/100}</Card.Subtitle>
                        <Card.Img variant="top thumbnail" src={product.image_url} style={{ width: '30rem' }}/>
                    </Card.Header>
                    <Card.Body>
                        <Row className="text-center">
                            <Card.Text>{product.description}</Card.Text>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col>
                                <Card.Subtitle>Ingredients: </Card.Subtitle><Card.Text>{product.ingredients}</Card.Text>
                            </Col>
                            <Col>
                                { product.brand ? 
                                    <Card.Subtitle className="mb-2 text-muted">
                                        <p>By {product.brand['name']} : <img src={product.brand['logo_image_url']} style={{maxWidth:"8rem", maxHeight:"8rem"}} alt={product.brand['name']}/></p>
                                        <p>{product.brand['description']}</p>
                                    </Card.Subtitle>                        
                                : null}                            
                            </Col>
                        </Row>
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