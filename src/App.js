import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './pages/About';
import Contact from './pages/Contact';
// import Home from './pages/Home';
import SubmittedForm from './pages/SubmittedForm';
import ProductView from './pages/ProductView';
import AllProducts from './pages/AllProducts';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';

import UserProvider from './UserProvider';
import ShoppingCart from './pages/ShoppingCart';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Navigation />
        <Switch>
          <Route exact path="/" component={AllProducts}/>
          <Route exact path="/products/:product_id" component={ProductView}/>
          {/* <Route exact path="/all-products" component={AllProducts}/> */}
          <Route exact path="/about" component={About}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/form-submitted" component={SubmittedForm}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/profile" component={UserProfile}/>
          <Route exact path="/cart" component={ShoppingCart}/>
        </Switch>
      </UserProvider>
    </Router>
  );
}