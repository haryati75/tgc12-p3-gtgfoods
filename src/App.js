import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import SubmittedForm from './pages/SubmittedForm';
import PostPage from './pages/ProductView';
import AllProducts from './pages/AllProducts';
import Navigation from './components/Navigation';

function App() {

  return (
    <Router>

      <Navigation />

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
