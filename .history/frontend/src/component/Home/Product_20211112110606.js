import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.inne
    value: 2.5,
};

const Product = ({product}) => {
    return (
        <Link className="product-cart" to={product._id}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span> (256 Reviews) </span>
            </div> 
            <span>{product.price}</span>
        </Link>
    );
};

export default Product;