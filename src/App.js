import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import SubmittedForm from './pages/SubmittedForm';
import PostPage from './pages/ProductView';
import AllProducts from './pages/AllProducts';

function App() {

  return (
    <Router>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/all-products">Show All Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <PostPage />
        </Route>
        <Route exact path="/all-products">
          <AllProducts />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/form-submitted">
          <SubmittedForm />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
