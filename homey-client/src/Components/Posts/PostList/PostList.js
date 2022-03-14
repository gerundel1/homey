import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./PostList.css";
import axios from "axios";

export default function PostList() {
    const [products, setProducts] = useState([]);

    useEffect(async () => {
            await axios.get('http://localhost:8080/api/products/get_all')
            .then(result => {
                setProducts(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

        let mappedProducts = products.map(product => {
            return (
            <Grid item key={product._id} xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea component={Link} to={`/PostDetail/${product._id}`}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:8080/api/product/image/${product.images[0]}`}
                                alt="product picture"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {product.unitPrice} / {product.pricePer}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Quantity: {product.quantity}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )
        });

    return (
        <div className="postlist-container">
            <div className="btnadd">
                
                <Link className="nav-link-newpost" to="/newpost">
                    +
                </Link>
            </div>

            {/* <SearchBar
                value={this.state.value}
                onChange={(newValue) => this.setState({ value: newValue })}
                onRequestSearch={() => console.log("Hello")}
            /> */}
            <Grid container spacing={5}>
                {mappedProducts}
            </Grid>
        </div>
    );
}
