import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import "./OrderListBuyer.css";

function OrderListBuyer() {
    return (
        <div className="order-container">
            <h1 className="order-title">Your Orders</h1>
            <Grid container spacing={5}>
                {/* Single Card */}
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea component={Link} to="/PostDetail">
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://source.unsplash.com/random"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    Rainbow Bread
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    $6.00 / loaf
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Quantity: 15
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                {/*  End */}
            </Grid>
        </div>
    );
}

export default OrderListBuyer;
