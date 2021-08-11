import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Card, Button, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import ProductContext from '../ProductContext';
import { useGlobalSpinnerActionsContext } from '../GlobalSpinnerContext';

export default function AllProducts() {

    // check if just login or logout
    const location = useLocation();
    const welcomeUser = location.state ? location.state.welcomeUser : null;

    const productContext = useContext(ProductContext);
    const setGlobalSpinner = useGlobalSpinnerActionsContext();

    const [products, setProducts] = useState([]);
    const [alertJSX, setAlertJSX] = useState();

    useEffect(()=> {
        const fetch = async() => {
            setGlobalSpinner(true);
            try {
                let baseURL = config.API_URL + "/products";
                let response = await axios.get(baseURL);
                setProducts(response.data)
            } catch (e) {
                setAlertJSX(<Alert variant="danger">ERROR: Failed to load Products from server.</Alert>)
            };
            setGlobalSpinner(false);
        }
        fetch();
    }, [setGlobalSpinner]);

    const handleAddToCart = async (productId, productName) => {
        let response = await productContext.addToCart(productId, productName);
        setAlertJSX(response);
    }

    return (<React.Fragment>
        <Container>
            <Row className="my-3">
                { alertJSX ? alertJSX : null } 
                <Card.Header className="text-center">
                    <h1>Great Asian Foods, ready to go.</h1>
                    <Card.Subtitle>{ welcomeUser === 'Y' ? <>Welcome back to our shop, {localStorage.getItem('userName')}</> : null }</Card.Subtitle>
                    <Card.Subtitle>{ localStorage.getItem('userName') ? <>Delivery will be made the next day.</> : <>To order, please login or register with us.</> }</Card.Subtitle>
                </Card.Header>
            </Row>
            <Row>
                { products.map(p => 
                <Card className="col col-6 col-md-4 col-lg-3 mx-auto mb-3 p-0" key={p.id}>
                    <Card.Header className="text-center" style={{"backgroundColor":"white"}}>
                        { p.tags.map( t => <span className="badge rounded-pill bg-success text-light mx-1" key={t.id}>{t.name}</span> ) }
                        <Card.Img className="card-img-top mt-3" src={p.image_url} alt={p.name}/>
                    </Card.Header>                    
                    <Card.Body>
                        <Card.Title>{p.category.name}: {p.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            Price: ${p.unit_base_price/100} | {p.unit_of_measure}
                            { p.quantity_in_stock <= 0 ? <span className="badge bg-warning">Low stock. Delivery within 1 week.</span> : null }
                        </Card.Subtitle>
                        <Card.Text>{p.description}</Card.Text>

                    </Card.Body>
                    <Card.Footer>
                        <Button variant="secondary" href={"/products/"+p.id} >View Product</Button>{' '}
                        { localStorage.getItem('userName') ? 
                            <Button variant="primary" onClick={() => handleAddToCart(p.id, p.name)} >Add To Cart</Button>
                        : null }                        
                    </Card.Footer>
                </Card>) }
            </Row>
        </Container>

    </React.Fragment>)
}