import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import axios from 'axios';
import config from '../config';
import ProductContext from '../ProductContext';
import { useGlobalSpinnerActionsContext } from '../GlobalSpinnerContext';

export default function ProductView() {
   
    const { product_id } = useParams();
    const history = useHistory();
    const productContext = useContext(ProductContext);
    const setGlobalSpinner = useGlobalSpinnerActionsContext();

    
    // useState's first argument must be the default value
    const [ product, setProduct ] = useState({});
    const [alertJSX, setAlertJSX] = useState();

    // load in the current active post
    useEffect(() => {
        const fetch = async () => {
            setGlobalSpinner(true);
            try {
                const response = await axios.get(config.API_URL + "/products/"  + product_id);
                setProduct(response.data);
            } catch (e) {
                console.log("ProductView err axios", e);
            }
            setGlobalSpinner(false);
        }
        fetch();
    }, [product_id, setGlobalSpinner])

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
                        <Card.Subtitle className="mb-2 ">Price (SGD): ${(product.unit_base_price/100).toFixed(2)} | {product.unit_of_measure}</Card.Subtitle>
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
                                <hr></hr>
                                <Card.Subtitle>Nutritional Facts:</Card.Subtitle>
                                <ul>
                                    <li>Calories (kcal): {product.kcal}</li>
                                    <li>Protein (gm): {product.protein_gm}</li>
                                    <li>Carbohydrates (gm): {product.carbs_gm}</li>
                                    <li>Fats (gm): {product.fats_gm}</li>
                                    <li>Sugars (gm): {product.sugars_gm}</li>
                                    <li>Fibres (gm): {product.fibres_gm}</li>
                                </ul>
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