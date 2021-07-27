import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import SubmittedForm from './pages/SubmittedForm';
import PostPage from './pages/ProductView';
import AllProducts from './pages/AllProducts';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';

import UserProvider from './UserProvider';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/products" component={PostPage}/>
          <Route exact path="/all-products" component={AllProducts}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/form-submitted" component={SubmittedForm}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profile" component={UserProfile}/>
        </Switch>
      </UserProvider>
    </Router>
  );
}