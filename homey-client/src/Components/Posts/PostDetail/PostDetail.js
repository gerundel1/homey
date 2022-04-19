import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { UserContext } from "../../../App";
import axios from "axios";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import "./PostDetail.css";

function PostDetail(props) {
    const { userName, userType } = useContext(UserContext);
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const productId = props.id;
    const [user, setUser] = useState("");

    // --------------
    // slider data

    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
        console.log(current);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
        console.log(current);
    };

    // --------------

    useEffect(() => {
        async function getProduct () {
            try{
            const data = await axios.get(`http://localhost:8080/api/product/${productId}`);
            const user_data = await axios.get(`http://localhost:8080/api/user/${data.data.userId}`);
            setProduct(data.data);
            setUser(user_data.data.email);
            setImages(data.data.images);
             }catch(err){
                    console.log(err);
             }
        }
        getProduct();
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

            <section className="slider">
                <FaArrowAltCircleLeft
                    className="left-arrow"
                    onClick={prevSlide}
                />
                <FaArrowAltCircleRight
                    className="right-arrow"
                    onClick={nextSlide}
                />
                {images.map((slide, index) => {
                    return (
                        <div
                            className={
                                index === current ? "slide active" : "slide"
                            }
                            key={index}
                        >
                            {index === current && (
                                <img
                                    src={`http://localhost:8080/api/product/image/${slide}`}
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
                <strong>Sold By :</strong> {user}
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
            {userType === "Customer" && (
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
            {userType === "Business" && (
                <Box
                component="form"
                noValidate
                sx={{ mt: 1, display: "flex" }}
                style={{
                    display: "block",
                }}
            >
                </Box>
            )}
        </div>
    );
}

export default PostDetail;
