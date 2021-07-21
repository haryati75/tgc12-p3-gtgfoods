import React, { useState, useEffect } from 'react';
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
            <ul>
                <li>ID: {p.id}</li>
                <li>Name: {p.name}</li>
            </ul>
        </div>) }
    </React.Fragment>)
}