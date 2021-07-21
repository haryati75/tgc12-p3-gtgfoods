import React, { useState, useEffect } from "react";
import axios from 'axios';

import config from '../config';

export default function ProductView(props) {
    // useState's first argument must be the default value
    const [ activeProduct, setActiveProduct ] = useState({})
    const [ activeProductId, setActiveProductId ] = useState(0);

    // load in the current active post
    useEffect(() => {
        const fetchPost = async (productId) => {
            if (productId > 0) {
                console.log("axios.get Product", productId)
                const base_URL = config.API_URL + "/products/";
                const response = await axios.get(base_URL + productId);
                console.log(">>>", response.data);
                setActiveProduct(response.data);
            }
        }
        fetchPost(activeProductId)
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
            <div className="card">
                <div className="card-title">
                    {activeProduct.name + "-" + activeProduct.brand['name']}
                    <p className="card-subtitle">{activeProduct.category['name']}</p>
                </div>
                <p>{activeProduct.description}</p>
                {/* <p>{activeProduct.tags}</p> */}
                <img src={activeProduct.image_url} className="img-fluid img-thumbnail" alt={activeProduct.name}/>
            </div>
            <hr/>
        </React.Fragment>
    )
}