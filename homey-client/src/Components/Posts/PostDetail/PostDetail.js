import React, {useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../../../App";
import axios from "axios";

import "./PostDetail.css";

function PostDetail(props) {
    const { userName } = useContext(UserContext);
    const [product, setProduct] = useState({});
    const productId = props.match.params.id;
    const [image, setImage] = useState("");
    
    useEffect(async () => {
        await axios.get(`http://localhost:8080/api/product/${productId}`)
        .then(result => {
            setProduct(result.data);
            setImage(`http://localhost:8080/api/product/image/${result.data.images[0]}`);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            quantity: data.get("quantity"),
        });
    };
    return (
        <div className="postdetail-container">
            <h1>{product.name}</h1>
            <img
                src={image}
                alt="food image"
                width="600"
                height="400"
            />
            <p>
                <strong>Sold By :</strong> {userName}
            </p>
            <p>
                <strong>Price :</strong> ${product.unitPrice} / {product.pricePer}
            </p>
            <p>
                <strong>Description :</strong> {product.description}
            </p>
            <p>
                <strong>Allergy Notice :</strong>
                {product.allergies}
            </p>

            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, display: "flex" }}
                style={{
                    display: "block",
                }}
            >
                <TextField
                    margin="normal"
                    required
                    id="quantity"
                    label="Select Quantity"
                    name="quantity"
                    type="number"
                    autoFocus
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{
                        borderRadius: 5,
                        backgroundColor: "#A3BAB4",
                        padding: "13px 36px",
                        fontSize: "1em",
                        display: "block",
                    }}
                >
                    Add to Cart
                </Button>
            </Box>
        </div>
    );
}

export default PostDetail;
