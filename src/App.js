import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './pages/About';
import Contact from './pages/Contact';
import SubmittedForm from './pages/SubmittedForm';
import ProductView from './pages/ProductView';
import AllProducts from './pages/AllProducts';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import RegisterPage from './pages/RegisterPage';
import ProfileEdit from './pages/ProfileEdit';
import ChangePassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import AllOrders from './pages/AllOrders';
import ShoppingCart from './pages/ShoppingCart';
import ReceiptPage from './pages/ReceiptPage';
import PaymentFailPage from './pages/PaymentFailPage';
import ProductProvider from './ProductProvider';
import UserProvider from './UserProvider';
import GlobalSpinner from './components/GlobalSpinner';
import GlobalSpinnerContextProvider from './GlobalSpinnerContext';

export default function App() {
  return (
    <Router>
      <UserProvider>
      <ProductProvider>
      <GlobalSpinnerContextProvider>

        {/* NavBar Component here */}
        <Navigation />
        <GlobalSpinner />

        <Switch>
          <Route exact path="/"> 
            <AllProducts /> 
          </Route>
          <Route exact path="/products"> 
            <AllProducts /> 
          </Route>
          <Route exact path="/products/:product_id"> 
            <ProductView />
          </Route>
          <Route exact path="/orders">
            <AllOrders />
          </Route>
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
          <Route exact path="/edit-profile">
            <ProfileEdit />
          </Route>
          <Route exact path="/change-password">
            <ChangePassword />
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route exact path="/reset-password/:accessToken">
            <ResetPassword />
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

        <Footer />

      </GlobalSpinnerContextProvider>
      </ProductProvider>
      </UserProvider>
    </Router>

  );
}