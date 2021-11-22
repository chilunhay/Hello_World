import React, { Fragment } from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard';

const Cart = () => {

    const item = {
        product: "productId",
        price: "200",
        name: "chilunhay",
        quantity
    }

    return (
        <Fragment>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quality</p>
                    <p>Subtotal</p>
                </div>
            </div>

            <div className="cartContainer">
                <CartItemCard item={item} />
                <div className="cartInput">
                    <button>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button>+</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Cart;