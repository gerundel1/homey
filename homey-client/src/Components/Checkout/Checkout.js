import './Checkout.css';
import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Container, Button, Form } from 'react-bootstrap';

export default function Checkout(props) {

    let totalPrice = 0;
    let finalTax = 0;
  
    const tax = 0.13;
  
    const currencyOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }

    function getTotal(cart) {
        const subtotal = cart.reduce((totalCost, item) => {
          return totalCost + item.unitPrice * item.quantityInCart;
        }, 0);
        finalTax = tax * subtotal;
        finalTax = Math.round((finalTax + Number.EPSILON) * 100) / 100;
        const total = subtotal + finalTax;
        return total.toLocaleString(undefined, currencyOptions)
      }

    const items = props.cart.map(item => {
        return (
            <Row key={item.id} className='mb-2 mt-2 cart-item'>
                <Col md={4}>
                    <Image className='product-image-checkout' src={`http://localhost:8080/api/product/image/${item.image}`} />
                </Col>
                <Col md={7} className='product-description'>
                    <h4><strong>{item.name}</strong></h4>
                    <h4>Quantity: {item.quantityInCart}</h4>
                </Col>
                <Col style={{justifyContent: 'right'}}>
                    <button onClick={() => props.remove(item)} className='delete-icon'>X</button>
                </Col>
            </Row>
        );
    });

    return (
            <Row style={{
                height: '100%'
            }}>
                <Col className='payment-col' sm={7}>
                    <Row className='mb-2'>
                        <h1>OPTIONS:</h1>
                    </Row>
                    <Row className='mb-4'>
                        <Col md={2}>
                            <button className='btn-opt active'  size='lg'>VISA</button>
                        </Col>
                        <Col>
                            <button className='btn-opt'  size='lg'>PAYPAL</button>
                        </Col>
                        
                    </Row>
                    <Row>
                        <h2>Payment Details:</h2>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>CARDHOLDER</Form.Label>
                                <Form.Control
                                    size="lg"
                                    required
                                    type='text'
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>CARD NUMBER</Form.Label>
                                <Form.Control
                                    size="lg"
                                    required
                                    type='number'
                                />
                            </Form.Group>
                            <Row >
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>EXPIRY DATE</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            required
                                            type='month'
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            required
                                            type='number'
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>
                        </Form>
                    </Row>
                        <div className='total-price'>
                            Total: <span className="subPrice"> ${getTotal(props.cart)}</span>
                        </div>
                </Col>
                <Col style={{
                                position: 'fixed',
                                right: 0,
                                bottom: 0,
                                top: '3em'
                            }} className='orderSummary' sm={4}>
                    <h1 className='text-order'>ORDER SUMMARY</h1>
                    <hr size='7'/>
                    <div className='cart-items-container'>
                        {items}
                    </div>
                        <button className='btn-opt mt-4' type="submit" size='lg'>
                                        Place Order
                        </button>
                </Col>
        </Row>
    )
}