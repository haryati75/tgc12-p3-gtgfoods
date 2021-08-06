import React, { useState, useEffect } from "react";
import axios from 'axios';
import OrderContext from "./OrderContext";
import config from './config';

export default function OrderProvider(props) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetch() {
            const response = await axios.get(config.API_URL + "/shopping-cart/orders", {
                'headers': {
                    'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                }
            });
            setOrders(response.data);
            console.log("setOrders 1st: ", response.data);
        }
        fetch();
    }, []);
  
    const orderContext = {
        getOrders: () => { return orders },
        refreshOrders: async () => { 
            const response = await axios.get(config.API_URL + "/shopping-cart/orders", {
                'headers': {
                    'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
                }
            });
            setOrders(response.data.orders); 
            console.log("setOrders refresh: ", response.data.orders);
        }
    }

    return (
        <OrderContext.Provider value={orderContext}>
            {props.children}
        </OrderContext.Provider>
    )
}