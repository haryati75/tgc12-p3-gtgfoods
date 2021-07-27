import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import config from './config'

import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import SubmittedForm from './pages/SubmittedForm';
import PostPage from './pages/ProductView';
import AllProducts from './pages/AllProducts';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';

import UserContext from './UserContext';

function App() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    setInterval(async () => {
      let refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const response = await axios.post(config.API_URL + '/users/refresh', {
          refreshToken
        })
        localStorage.setItem('accessToken', response.data.accessToken);
      }
    }, config.REFRESH_INTERVAL)
  }, []);

  const userContext = {
    getUser: () => { return user },
    setUser: (user) => { setUser(user) }
  }

  return (
    <Router>

      <Navigation />

      <UserContext.Provider value={userContext}>
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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile">
            <UserProfile />
          </Route>
        </Switch>
      </UserContext.Provider>

    </Router>
  );
}

export default App;
