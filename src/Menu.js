import React from 'react';
import Register from './Register'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MainProfilePage from './MainProfilePage';
import LandingPage from "./LandingPage";
import Search from 'antd/lib/input/Search';


  function Menu() {
      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/mainProfilePage">Profile Page</Link>
                </li>
                <li>
                  <Link to="/search">Search</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/register">
                <Register></Register>
              </Route>
              <Route path="/mainProfilePage">
                <MainProfilePage />
              </Route>
              <Route path="/">
                <LandingPage />
              </Route>
              <Route path="/search">
                <Search/>
              </Route>
            </Switch>
          </div>
        </Router>
      );
  }
  function Home() {
    return <h2>Home</h2>;
  }
  

  export default Menu;