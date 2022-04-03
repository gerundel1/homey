import React from "react";
import "./Nav.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="navbar-container">
            <nav id="navbar" className="">
                <div className="nav-wrapper">
                    <div className="logo">
                        <a href="/">HOMEY</a>
                    </div>
                    <div>
                        <Link to="/cart">
                            <ShoppingCartIcon />
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
