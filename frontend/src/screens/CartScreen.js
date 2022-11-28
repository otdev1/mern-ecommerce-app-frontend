import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    //enables access to redux store.js

    const { cartItems } = cart;

    const productId = props.match.params.id;

    const qty = props.location.search? Number(props.location.search.split("=")[1]): 1
    /* props.location.search is a query string selector i.e selects the URL
       Number function converts string to a number
       the format of the query string/URL that this component can render for is /cart/1?qty=1,
       props.location.search.split("=")[1] extracts the string character that immediately
       follows the = sign where = is at index 0 so that the following character is at index 1
    */

    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
        /*see cartActions.js for definition of removeFromCart*/
    }

    useEffect( () => {
        if(productId) {
            dispatch( addToCart(productId, qty)); //see cartActions.js
        }
    }, []);

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
        //redirects user to signin page
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3 style={{margin: 'unset'}}>
                        Shopping Cart
                    </h3>
                    <div>
                        Price
                    </div>
                </li>
                {
                    cartItems.length === 0 ?
                    <div>
                    Cart is empty
                    </div>
                    :
                    cartItems.map(item =>
                    <li>
                        <div className="cart-image">
                        <img src={item.image} alt="product" />
                        </div>
                        <div className="cart-name">
                            <div>
                                <Link to={"/product/" + item.product}>
                                {item.name}
                                </Link>
                            </div>
                            <div>
                                Qty:
                                <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                {[...Array(item.countInStock).keys()].map(x =>
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                )}
                                </select>
                                <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                                Delete
                                </button>
                            </div>
                        </div>
                        <div className="cart-price">
                        ${item.price}
                        </div>
                    </li>
                    )
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                {/*a - acumulator, c - current item*/ }
                :
                $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                Proceed to Checkout
            </button>
        </div>
    </div>

}

export default CartScreen;