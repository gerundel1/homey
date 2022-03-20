import React from "react";
import "./Nav.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Nav = () => {
    return (
        <div className="navbar-container">
            <nav id="navbar" className="">
                <div className="nav-wrapper">
                    <div className="logo">
                        <a href="#home">HOMEY</a>
                    </div>
                    <div>
                        <ShoppingCartIcon />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
