import React, {useContext} from "react";
import "./Nav.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Nav = () => {
    const { userType } = useContext(UserContext);
    return (
        <div className="navbar-container">
            <nav id="navbar" className="">
                <div className="nav-wrapper">
                    <div className="logo">
                        <a href="/">HOMEY</a>
                    </div>
                    <div>
                        { userType === "Customer" &&
                        <Link to="/cart">
                            <ShoppingCartIcon />
                        </Link>
                        } 
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
