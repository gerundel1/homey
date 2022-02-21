import 'dotenv/config';
import logo from "./logo.svg";
import React, { createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./Components/Nav/Nav.js";
import HomePage from "./Components/HomePage/HomePage";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import RegisterSuccess from "./Components/RegisterSuccess/RegisterSuccess"; 
import React, { createContext } from 'react';

export const UserContext = createContext({});

function App() {
    return (
        <>
            <Router>
                <Nav />

                <Switch>
                    <Route exact path="/">
                        <HomePage />
                        {/* <RegisterSuccess /> */}
                    </Route>

                    <Route exact path="/register">
                        <Register />
                    </Route>

                    <Route exact path="/login">
                        <Login />
                    </Route>

                    <Route exact path="/registersuccess">
                        <RegisterSuccess />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
