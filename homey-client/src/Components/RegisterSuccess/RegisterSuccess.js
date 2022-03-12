import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Background from "../Background/Background";
import "./RegisterSuccess.css";

function RegisterSuccess() {
    return (
        <div className="full-page-content">
            <div className="center-child">
                <p className="heading-text">CONGRATULATIONS!</p>
                <p className="heading-text"> YOU ARE ALL SET</p>
            </div>

            <div className="center-child">
                <p className="heading-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </p>
                <Link
                    className="explore"
                    to={{
                        pathname: "/postlist",
                        state: { userType: "Customer" },
                    }}
                >
                    Explore Now
                </Link>
            </div>

            <Background />
        </div>
    );
}

export default RegisterSuccess;
