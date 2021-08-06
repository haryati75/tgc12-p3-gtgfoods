import React from "react";
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import ProductContext from "./ProductContext";
import config from './config';

export default function ProductProvider(props) {

    const productContext = {
        addToCart: async (productId, productName) => {
            let baseURL = config.API_URL + "/shopping-cart/" + productId + "/add";
            try {
                await axios.get(baseURL, {
                    'headers': {
                        'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                    }
                });
                return (<Alert variant="success">{productName} added to Shopping Cart successfully.</Alert>)
            } catch (e) {                
                console.log("Error add to cart:", e);
                return (<Alert variant="danger">ERROR: Failed to add product: {productName} to Shopping Cart.</Alert>)
            }
        }
    }

    return (
        <ProductContext.Provider value={productContext}>
            {props.children}
        </ProductContext.Provider>
    )
}