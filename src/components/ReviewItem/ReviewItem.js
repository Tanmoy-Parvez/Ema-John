import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key, price} = props.product;
    const style = {
        padding: '50px',
        borderBottom: '1px solid lightgrey',
    }
    return (
            <div style={style} >
                <h3 className="product-name">Product name: {name}</h3>
                <p>Quantity: {quantity}</p>
                <p><small>${price}</small></p>
                <br />
                <button className="add-btn" onClick={() => props.removeProduct(key)}>Remove</button>
            </div>
    );
};

export default ReviewItem;