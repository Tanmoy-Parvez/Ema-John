import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;  // source
    return (
        <div className="product-sec">
            <div>
                <img src={img} alt="" />
            </div>

            <div className="text-sec">
                <h4 className="product-name"> <Link to={'/product/'+key}>{name}</Link> </h4>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock --order soon.</small></p>
                {props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)} className="add-btn">
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;