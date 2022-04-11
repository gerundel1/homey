import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { UserContext } from "../../../App";
import axios from "axios";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import "./PostDetail.css";

function PostDetail(props) {
    const { userName, type, userEmail } = useContext(UserContext);
    const [product, setProduct] = useState({});
    const productId = props.id;
    const [image, setImage] = useState("");

    // --------------
    // slider data
    const [productImages, setProductImages] = useState([]);

    // temperaory static data
    const prodImages = [
        {
            image: "https://images.unsplash.com/photo-1649331352505-8117d066f361?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
        },
        {
            image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        },
        {
            image: "https://images.unsplash.com/photo-1649274617106-d8df57b78aa3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
        },
    ];

    const [current, setCurrent] = useState(0);
    const length = prodImages.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
        console.log(current);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
        console.log(current);
    };

    // --------------

    useEffect(async () => {
        await axios
            .get(`http://localhost:8080/api/product/${productId}`)
            .then((result) => {
                setProduct(result.data);
                setImage(
                    `http://localhost:8080/api/product/image/${result.data.images[0]}`
                );

                // set the images into variable
                // Not working
                setProductImages(
                    `http://localhost:8080/api/product/image/${result.data.images}`
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSubmit = (event) => {
        const quantity = parseInt(event.target[0].value);
        event.preventDefault();
        const index = props.cart?.findIndex((item) => item.id === product._id);
        if (index >= 0) {
            if (quantity > props.cart[index].quantityInStock) {
                alert(
                    `Error: Max quantity available: ${props.cart[index].quantityInStock}`
                );
            } else {
                props.alterQuantity(
                    { id: product._id },
                    props.cart[index].quantityInCart + quantity,
                    props.cart[index].quantityInStock - quantity
                );
            }
        } else {
            if (quantity <= product.quantity) {
                props.addToCart({
                    id: product._id,
                    userId: product.userId,
                    name: product.name,
                    unitPrice: product.unitPrice,
                    category: product.category,
                    image: product.images[0],
                    quantityInStock: product.quantity - quantity,
                    quantityInCart: quantity,
                });
                alert(
                    `The product is successfully added to your cart! Quantity: ${quantity}`
                );
            } else {
                alert(`No such quantity available in stock: ${quantity}`);
            }
        }
    };
    return (
        <div className="postdetail-container">
            <h1>{product.name}</h1>
            {/* <img src={image} alt="food image" width="600" height="400" /> */}

            {/* Image slider */}

            <section className="slider">
                <FaArrowAltCircleLeft
                    className="left-arrow"
                    onClick={prevSlide}
                />
                <FaArrowAltCircleRight
                    className="right-arrow"
                    onClick={nextSlide}
                />
                {prodImages.map((slide, index) => {
                    return (
                        <div
                            className={
                                index === current ? "slide active" : "slide"
                            }
                            key={index}
                        >
                            {index === current && (
                                <img
                                    src={image}
                                    alt="product image"
                                    className="image"
                                />
                            )}
                        </div>
                    );
                })}
            </section>

            {/* slider end */}

            <p>
                <strong>Sold By :</strong> {userName}
            </p>
            <p>
                <strong>Price :</strong> ${product.unitPrice} /{" "}
                {product.pricePer}
            </p>
            <p>
                <strong>Description :</strong> {product.description}
            </p>
            <p>
                <strong>Allergy Notice :</strong>
                {product.allergies}
            </p>
            {type === "Customer" || (
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
            )}
        </div>
    );
}

export default PostDetail;
