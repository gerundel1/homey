import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardDeck } from "react-bootstrap";
import axios from 'axios';

const getProductById = "LINK1";
const getSellerInfo = "LINK2";
const productUrl = "url";
const sellerUrl = "url";


function Product() {
    let { id } = useParams();
    const [product, setProduct] = useState(null);
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        async function getProductById() {
            await axios.get(productUrl + id, {
                headers: {
                    'auth-token': localStorage.getItem("token")
                }
            }).then(res => res.json())
                .then(data => {

                    if (data.hasOwnProperty("id")) {
                        setProduct(data);
                        
                        async function getSellerInfo() {
                            await axios.get(sellerUrl + product.userId, {
                                headers: {
                                    'auth-token': localStorage.getItem("token")
                                }
                            }).then(res => res.json())
                                .then(data => {
                                    setLoading(state => false);
                                    setSeller(data);
                                })
                        }
                    }

                })
        }

    }, []);

    if (!loading) {
        if (product != null) {
            return (
                <div>
                    <Card border="dark" bg="light">
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                {seller.name}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    <CardDeck>
                        <Card border="dark" bg="light" >
                            <Card.Body>
                                <Card.Text>
                                    Price: {product.unitPrice} / {product.pricePer}
                                    <br />
                                    Description: {product.description}
                                    <br />
                                    Allergy Warnings: {product.allergies}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Card border="dark" bg="light">
                        <Card.Body>
                            <Card.Text>
                                Unable to find Product with id: {product.userId}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
    }
    else {
        return (
            <div>
                <Card border="dark" bg="light">
                    <Card.Body>
                        <Card.Text>
                            Loading Product Data...
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}
