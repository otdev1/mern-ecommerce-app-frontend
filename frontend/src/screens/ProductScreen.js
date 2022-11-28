import React, { useEffect, useState } from 'react';
import data from '../data';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
// import styles from './index.module.css'; 

function ProductScreen(props) {
    //console.log(props.match.params.id); 
    /*gets the id of the product, this id is a part of the URL see /product/:id in app.js 
    and '/product/' + product._id in homescreen.js*/
    
    //const product = data.products.find(x=> x._id === props.match.params.id);
    //finds the product whose id matches the id passed in the URL     
    // return <div>ProductScreen</div>

    const [qty, setQty] = useState(1);
    /*definition of hook for capturing the quantity input by the user, the default value is 1,
    qty is variable that can be changed by the setQty function*/

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    
    const { userInfo } = userSignin;

    const productDetails = useSelector(state => state.productDetails);
    //enables access to redux store.js

    const {product, loading, error } = productDetails;
    //object deconstruction syntax, products, loading and error is extracted from productList

    const productReviewSave = useSelector((state) => state.productReviewSave);
    
    const { success: productSaveSuccess } = productReviewSave;

    const dispatch = useDispatch();

    // useEffect( () => {
    //     dispatch(detailsProduct(props.match.params.id));
    //     /*extracts id from URL e.g /product/1 and passes it to detailsProduct
    //       see productActions.js for definition of detailsProduct*/
    //     return () => {
    //     };
    // }, [] ) //effect is only run after componentdidmount i.e after elements are rendered on screen
    useEffect( () => {
        if (productSaveSuccess) {
            alert('Review submitted successfully.');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
          }
          dispatch(detailsProduct(props.match.params.id));
          return () => {
            //
          };  
    }, [productSaveSuccess] )

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(
          saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating: rating,
            comment: comment,
          })
        );
    };
    

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty )
        //redirects to a different URL
    }

    return  <div>
                <div className="back-to-result">
                        <Link to="/">Back</Link> {/*back to results link */}
                </div>
                {
                    loading ? <div>Loading...</div> :
                    error ? <div>{error}</div> :
                    (
                    <>
                        <div className="details">
                            {/* <h1>{product.name}</h1> */}
                            <div className="details-image">
                                <img src={product.image} alt="product"/>
                            </div>
                            <div className="details-info">
                                <ul>
                                    <li>
                                        <h4>{product.name}</h4>
                                    </li>
                                    <li>
                                        {/* {product.rating} Stars ({product.numReviews} Reviews) */}
                                        <a href="#reviews">
                                            <Rating
                                                value={product.rating}
                                                text={product.numReviews + ' reviews'}
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        Price: <b>${product.price}</b>
                                    </li>
                                    <li>
                                        Description:
                                        <div>{product.description}</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="details-action">
                                <ul>
                                    <li>
                                        Price: {product.price}
                                    </li>
                                    <li>
                                        {/* Status: {product.status} */}
                                        Status: { product.countInStock > 0 ? "In Stock" : <div>Unavailable</div> }
                                    </li>

                                    {/* <li>
                                        Qty: <select>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            </select>
                                    </li> */}

                                    <li>
                                        Qty: <select value={qty} onChange={ (e) => { setQty(e.target.value) }}>
                                             {/*the option value the user selects triggers the onChange 
                                               event and places it in the qty variable*/}

                                             {[...Array(product.countInStock).keys()].map( x =>
                                             <option key={x + 1} value={ x + 1 }>{ x + 1 }</option>)}
                                             {/* split each key in the array and map each element to an option, 
                                              1 is added to array indexes so that the first value is not 0 i.e
                                              qty: 0,1,2,3 etc. but qty: 1,2,3 etc instead */}

                                             </select>
                                    </li>
                                    <li>
                                        { product.countInStock > 0 &&
                                            <button onClick={handleAddToCart} className="button primary"> Add To Cart </button>
                                        }
                                        {/*only show the add to cart button when the product is in stock otherwise dont show it */}
                                        {/* <button onClick={handleAddToCart} className="button primary"> Add To Cart </button> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="content-margined">
                            <h2>Reviews</h2>
                            {!product.reviews.length && <div>There is no review</div>}
                            <ul className="review" id="reviews">
                                {product.reviews.map((review) => (
                                    <li key={review._id}>
                                        <div>{review.name}</div>
                                            <div>
                                                <Rating value={review.rating}></Rating>
                                            </div>
                                        <div>{review.createdAt.substring(0, 10)}</div> 
                                        {/* date of review was submitted - using index 0 to 10 excludes the time */}
                                        <div>{review.comment}</div>
                                    </li>
                                ))}
                                <li>
                                    <h3>Write a customer review</h3>
                                    {userInfo ? (
                                        <form onSubmit={submitHandler}>
                                            <ul className="form-container">
                                                <li>
                                                    <label htmlFor="rating">Rating</label>
                                                    <select
                                                        name="rating"
                                                        id="rating"
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                        >
                                                        <option value="1">1- Poor</option>
                                                        <option value="2">2- Fair</option>
                                                        <option value="3">3- Good</option>
                                                        <option value="4">4- Very Good</option>
                                                        <option value="5">5- Excellent</option>
                                                    </select>
                                                </li>
                                                <li>
                                                    <label htmlFor="comment">Comment</label>
                                                    <textarea
                                                        name="comment"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></textarea>
                                                </li>
                                                <li>
                                                    <button type="submit" className="button primary">
                                                     Submit
                                                    </button>
                                                </li>
                                            </ul>
                                        </form>
                                    ) : 
                                    (
                                        <div>
                                            Please <Link to="/signin">Sign-in</Link> to write a review.
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </> 
                    )
                }
            </div>
}

export default ProductScreen;