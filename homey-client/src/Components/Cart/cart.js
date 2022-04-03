import React from 'react';
import { Link } from 'react-router-dom';
import './cart.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Image, Row, Col, Button, Container } from 'react-bootstrap';



const createOrderURL = "http://localhost:8080/api/orders/create";

export default function Cart(props) {
    console.log(props);

  let totalPrice = 0;
  let finalTax = 0;

  const tax = 0.13;

  const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  const products = props.cart;
  function getSubTotal(cart) {
    const total = cart.reduce((totalCost, item) => {
      return totalCost + item.unitPrice * item.quantityInCart;
    }, 0);
    return total.toLocaleString(undefined, currencyOptions)
  }

  function calculateTax (cart) {
    const subtotal = cart.reduce((totalCost, item) => {
      return totalCost + item.unitPrice * item.quantityInCart;
    }, 0);
    finalTax = tax * subtotal;
    finalTax = Math.round((finalTax + Number.EPSILON) * 100) / 100;
    return finalTax.toLocaleString(undefined, currencyOptions);
  }

  function getTotal(cart) {
    const subtotal = cart.reduce((totalCost, item) => {
      return totalCost + item.unitPrice * item.quantityInCart;
    }, 0);
    finalTax = tax * subtotal;
    finalTax = Math.round((finalTax + Number.EPSILON) * 100) / 100;
    const total = subtotal + finalTax;
    totalPrice = total;
    return total.toLocaleString(undefined, currencyOptions)
  }

  const checkout = async () => {
    props.cleanUp();
    await axios.post(createOrderURL, {
      products: products,
      tax: finalTax,
      total: totalPrice
    },{
      headers: {
          'auth-token': localStorage.getItem("token"),
      }
      }).then((res) => {}
    ).catch(err => console.log(err))
  }

    // if (props.cart?.length === 0 || !props.cart?.length) {
    //     return (
    //         <>

    //         </>
    //       );
    // }
    // else {
        const items = props.cart.map(item => {
            return (<Row key={uuidv4()} className="items">
                        <Col xs="auto" className="column">
                            <Image className="cart-image" src={`http://localhost:8080/api/product/image/${item.image}`} />
                        </Col>
                        <Col className="title column">
                            {item.name}
                        </Col>
                        <Col xs={3} className="quantity column">
                          <Row className="desc">
                            <p style={{textAlign: 'center'}}>Quantity</p>
                          </Row>
                          <Row className="desc">
                            <Col xs="auto" style={{padding: '0px'}}>
                              <button className="btn_quantity" onClick={() => item.quantityInCart > 1 ? props.alterQuantity(item, item.quantityInCart - 1, item.quantityInStock + 1) : props.remove(item)}><span>-</span></button>
                            </Col>
                            <Col xs="auto" style={{padding: '0px'}}>
                              <span>{item.quantityInCart}</span>
                            </Col>
                            <Col xs="auto" style={{padding: '0px'}}>
                              <button className="btn_quantity" onClick={() => props.alterQuantity(item, item.quantityInCart + 1, item.quantityInStock + 1)}><span>+</span></button>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={2} className="price column">
                            $ {item.unitPrice}
                        </Col>
                    </Row>)});
        return (
            <>
                <Container className='modal-header'>
                    <h1>Your Cart</h1>
                </Container>
                <Container className='modal-body'>
                    {items}
                </Container>
                <Container className="footer modal-footer" fluid> 
                  <Row>
                    <div>
                    Total Items: <span className="totalNum">{props.cart.length}</span>
                    </div>
                    <div>
                      Subtotal: <span className="subPrice"> ${getSubTotal(props.cart)}</span>
                    </div>
                    <div>
                      Tax: <span className="subPrice"> ${calculateTax(props.cart)}</span>
                    </div>
                    <div >
                      Total After Tax: <span className="subPrice"> ${getTotal(props.cart)}</span>
                    </div>
                    <div className="checkout">
                      <Link to={`/checkout`}><Button onClick={() => checkout()} className='checkout-btn' variant="dark">Checkout</Button></Link>
                    </div>
                  </Row>
                </Container> 
            </>
          );
    // }
}

