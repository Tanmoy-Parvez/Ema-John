import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price; 
    };

    let shipping = 0;

    if(total > 35){
        shipping = 0;
    }

    else if(total > 15){
        shipping = 4.99;
    }

    else if(total > 10){
        shipping = 5.99;
    }

    const tax = (total / 4).toFixed(2);

    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    return (
        <div className="cart-style">
            <h1>Order Summary</h1>
            <h2>Items Ordered: {cart.length}</h2>
            <p>Product: {total}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Tax + VAT: {tax}</p>
            <h3>Total Price: {grandTotal}</h3>

        </div>
    );
};

export default Cart;