import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './pages/About';
import Contact from './pages/Contact';
import SubmittedForm from './pages/SubmittedForm';
import ProductView from './pages/ProductView';
import AllProducts from './pages/AllProducts';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import RegisterPage from './pages/RegisterPage';
import ChangePassword from './pages/ChangePassword';

import UserProvider from './UserProvider';
import ShoppingCart from './pages/ShoppingCart';
import ReceiptPage from './pages/ReceiptPage';
import PaymentFailPage from './pages/PaymentFailPage';

export default function App() {
  return (
    <Router>
      <UserProvider>

        {/* NavBar Component here */}
        <Navigation />

        <Switch>
          <Route exact path="/"> 
            <AllProducts /> 
          </Route>
          <Route exact path="/products/:product_id"> 
            <ProductView />
          </Route>
          {/* <Route exact path="/all-products" component={AllProducts}/> */}
          <Route exact path="/about"> 
            <About /> 
          </Route>
          <Route exact path="/contact"> 
            <Contact/> 
          </Route> 
          <Route exact path="/form-submitted"> 
            <SubmittedForm /> 
          </Route> 
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/profile">
            <UserProfile />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/change-password">
            <ChangePassword />
          </Route>
          <Route exact path="/cart">
            <ShoppingCart />
          </Route> 
          <Route exact path="/checkout/success">
            <ReceiptPage />
          </Route>
          <Route exact path="/checkout/cancelled">
            <PaymentFailPage />
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  );
}