import "dotenv/config";
import React, { createContext, useReducer, useEffect, useState } from "react";
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
import OrderListBuyer from "./Components/Orders/BuyerOrder/OrderListBuyer";

const CART_LOCAL_STORAGE_KEY = "homey.cart";

export const UserContext = createContext({});

function App() {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    let initialState = { login: false, userName: "", type: "", email: "" };

    if (loggedInUser) {
        initialState.login = true;
        initialState.userName = loggedInUser.name;
        initialState.type = loggedInUser.type;
        initialState.email = loggedInUser.email;
    }

    const [userName, setUserName] = useState(initialState.userName);
    const [userEmail, setUserEmail] = useState(initialState.email);
    const [loginStatus, setLoginStatus] = useState(initialState.login);
    const [userType, setUserType] = useState(initialState.type);
    const [cart, setCart] = useReducer(cartReducer, []);

    useEffect(() => {
        const storedCart = JSON.parse(
            localStorage.getItem(CART_LOCAL_STORAGE_KEY)
        );
        if (storedCart) {
            setCart({ storedCart, type: "addArray" });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    function cartReducer(state, action) {
        switch (action.type) {
            case "addArray": {
                return [...action.storedCart];
            }
            case "add":
                return [...state, action.product];
            case "remove": {
                const productIndex = state.findIndex(
                    (item) => item.id === action.product.id
                );
                if (productIndex < 0) {
                    return state;
                }
                const update = [...state];
                update.splice(productIndex, 1);
                return update;
            }
            case "chgQuantity": {
                const productIndex = state.findIndex(
                    (item) => item.id === action.product.id
                );
                if (productIndex < 0) {
                    return state;
                }
                const update = [...state];
                update[productIndex].quantity = action.quantity;
                return update;
            }
            case "clean": {
                const update = [];
                return update;
            }
            default:
                return state;
        }
    }

    function add(product) {
        setCart({ product, type: "add" });
    }

    function remove(product) {
        setCart({ product, type: "remove" });
    }

    function alterQuantity(product, quantity) {
        setCart({ product, type: "chgQuantity", quantity: quantity });
    }

    function cleanUp() {
        setCart({ type: "clean" });
    }

    return (
        <UserContext.Provider
            value={{
                userName,
                setUserName,
                loginStatus,
                setLoginStatus,
                userType,
                setUserType,
                userEmail,
                setUserEmail,
            }}
        >
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
                                <Route
                                    exact
                                    path="/postdetail/:id"
                                    component={PostDetail}
                                ></Route>
                                <Route exact path="/OrderListSeller">
                                    <OrderListSeller />
                                </Route>
                                <Route exact path="/OrderListBuyer">
                                    <OrderListBuyer />
                                </Route>
                                <Route exact path="/searchpost">
                                    <SearchPost />
                                </Route>
                            </Switch>
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}
export default App;
