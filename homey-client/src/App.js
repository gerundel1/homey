import "dotenv/config";
import React, { createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav/Nav.js";
import HomePage from "./Components/HomePage/HomePage";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import RegisterSuccess from "./Components/RegisterSuccess/RegisterSuccess";
import PostList from "./Components/Posts/PostList/PostList";
import NewPost from "./Components/Posts/NewPost/NewPost";
import Layout from "./Components/Layout/Layout";
import PostDetail from "./Components/Posts/PostDetail/PostDetail";
import OrderListSeller from "./Components/Orders/SellerOrder/OrderListSeller";
import SearchPost from "./Components/Posts/SearchPost/SearchPost";

export const UserContext = createContext({});

function App() {
    return (
        <>
            <Router>
                <Nav />
                <Switch>
                    <Route exact path="/">
                        <HomePage />
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
                    <Route>
                        <Layout>
                            <Switch>
                                <Route exact path="/newpost">
                                    <NewPost />
                                </Route>
                                <Route exact path="/postlist">
                                    <PostList />
                                </Route>
                                <Route exact path="/postdetail">
                                    <PostDetail />
                                </Route>
                                <Route exact path="/OrderListSeller">
                                    <OrderListSeller />
                                </Route>
                                <Route exact path="/searchpost">
                                    <SearchPost />
                                </Route>
                            </Switch>
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}
export default App;
