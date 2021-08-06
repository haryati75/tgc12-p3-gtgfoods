import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Card, Button, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import ProductContext from '../ProductContext';


export default function AllProducts() {

    // check if just login or logout
    const location = useLocation();
    const welcomeUser = location.state ? location.state.welcomeUser : null;

    const productContext = useContext(ProductContext);

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

    const handleAddToCart = async (productId, productName) => {
        let response = await productContext.addToCart(productId, productName);
        setAlertJSX(response);
    }

    return (<React.Fragment>
        <Container>
            <Row className="my-3">
                { alertJSX ? alertJSX : null }
                { welcomeUser === 'Y' ? <Alert variant="success">Welcome back to our shop, {localStorage.getItem('userName')}</Alert> : null } 
                <h1>All our meals are cooked to order and next-day delivery.</h1>
            </Row>
            <Row>
                { products.map(p => 
                <Card className="col col-6 col-md-4 col-lg-3 mx-auto" key={p.id}>
                    <Card.Body>
                    <Card.Img className="card-img-top" src={p.image_url} alt={p.name}/>
                        <Card.Title>{p.category.name}: {p.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            Price: ${p.unit_base_price/100}
                            { p.quantity_in_stock <= 0 ? <span className="badge bg-warning">Low stock. Delivery within 1 week.</span> : null }
                        </Card.Subtitle>
                        <Card.Text>{p.description}</Card.Text>


                        <Button variant="secondary" href={"/products/"+p.id} >View Product</Button>{' '}
                        { localStorage.getItem('userName') ? 
                            <Button variant="primary" onClick={() => handleAddToCart(p.id, p.name)} >Add To Cart</Button>
                        : null }
                    </Card.Body>
                    <Card.Footer>
                        { p.tags.map( t => <span className="badge rounded-pill bg-info text-dark mx-1" key={t.id}>{t.name}</span> ) }
                    </Card.Footer>
                </Card>) }
            </Row>
        </Container>

    </React.Fragment>)
}