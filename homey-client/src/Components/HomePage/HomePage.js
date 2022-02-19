import React from "react";
import logo from "../../../src/Images/homey.jpg";
import "./HomePage.css";
import { Link } from "react-router-dom";

import Background from "../Background/Background";

function HomePage() {
    return (
        <div className="full-page-content">
            <div className="homePage-wrapper">
                <div className="center-child">
                    <p className="heading-text">
                        SHARING FOOD FROM THE KITCHEN
                    </p>
                    <p className="heading-text"> STRAIGHT TO THE COMMUNITY</p>
                </div>

                <div className="center-child">
                    <img className="homey_logo" src={logo} alt="Homey logo" />
                    <p className="heading-text">WELCOME TO HOMEY</p>
                </div>

                <p className="heading-text">Register Now</p>

                <div className="users-link">
                    <Link
                        className="nav-link"
                        to={{
                            pathname: "/register",
                            state: { userType: "Customer" },
                        }}
                    >
                        I WANT TO BUY FOOD
                    </Link>
                    <Link
                        className="nav-link"
                        to={{
                            pathname: "/register",
                            state: { userType: "Business" },
                        }}
                    >
                        I WANT TO SELL FOOD
                    </Link>
                </div>

                <div>
                    <span>HAVE AN ACCOUNT? </span>
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </div>
            </div>

            <Background />
        </div>
    );
}

export default HomePage;
