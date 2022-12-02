import React, { useState, useEffect } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

import Select from 'react-select';

function HomeScreen(props) {
    //return <div>HomeScreen</div> 
    /*no need for unordered list to be wrapped in div since
     this component is being used within a div classname=content in App.js*/

    /*hook definition */
    // const [ products, setProduct ] = useState( [] );
    const [searchKeyword, setSearchKeyword] = useState('');
    /*definition of hook for capturing keyboard input by the user to search for a product, searchKeyword is variable 
    that can be changed by the setSearchKeyword function, the default value for searchKeyword is '' i.e empty*/

    const [sortOrder, setSortOrder] = useState('');
    // const [sortOrder, setSortOrder] = useState('newest');
    const category = props.match.params.id ? props.match.params.id : ''; 
    //extracts either Pants or Shirt from http://localhost:3000/category/Pants or http://localhost:3000/category/Shirt

    const productList = useSelector(state => state.productList); 
    //sets initial(blannk/empty) state for the productList see reducer declaration in store.js

    const { products, loading, error } = productList;
    //object deconstruction syntax, products, loading and error is extracted from productList

    const dispatch = useDispatch(); 

    // useEffect( () => {
    //     const fetchData = async () => {
    //         const {data} = await axios.get("/api/products");
    //         /* object returned by axios has a property called data, this property contains the list of products*/
            
    //         setProduct (data);
    //     } 
    //     fetchData();
    //     return () => {

    //     };
    // }, []) //effect is only run on componentdidmount

    useEffect( () => {
        
        
        dispatch(listProducts(category)); 
           /*dispatch/pass an action to store.js, in store the action is handled by the reducer
           see productActions.js for definition of listProducts*/
        //dispatch(listProducts(category, searchKeyword, sortOrder));

        return () => {

        };
    }, [category]); //effect is only run after componentdidmount i.e after elements from app.js are rendered on screen
    // useEffect( () => {
        
        
    //     //dispatch(listProducts(category)); 
    //        /*dispatch/pass an action to store.js, in store the action is handled by the reducer
    //        see productActions.js for definition of listProducts*/
    //     dispatch(listProducts(category, searchKeyword, sortOrder));

    //     console.log(category);

    //     console.log(sortOrder);

    //     return () => {

    //     };
    // }, [category], [searchKeyword], [sortOrder]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword, sortOrder));
    };

    // const sortHandler = (e) => {
    //     setSortOrder(e.target.value);
    //     dispatch(listProducts(category, searchKeyword, sortOrder));

    //     setSortOrder('');
        
    // };

    //const reset = '';


    const sortOrderSetter = (e) => {
        setSortOrder(e.target.value);
        //dispatch(listProducts(category, searchKeyword, sortOrder));
        // if(newSortOrder != sortOrder)
        // {
        //     newSortOrder = sortOrder;
        // }
        
    };

    const sortHandler = () => {
        
            if(sortOrder) 
            {
                dispatch(listProducts(category, searchKeyword, sortOrder));
                //listProducts action is dispatched if sortOrder is set and after select element/tag is clicked on
            }

            setSortOrder('');
            /*reset/clear sortOrder variable to prevent listProducts action from being dispatched i.e prevent request being
            from sent to URL specified in listProducts action every time select element/tag is clicked on*/
        
    };

    return  (
                <>
                    {category && <h2>{category}</h2>}

                    <ul className="filter">
                        <li>
                            <form onSubmit={submitHandler}>
                                <input
                                name="searchKeyword"
                                placeholder="Search for a product by name..."
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                <button type="submit">Search</button>
                            </form>
                        </li>
                        <li>
                            Sort By{' '} 
                            {/* 
                              {} is used to generate a string literal, in this case a space is 
                              generated after Sort By 
                            */}
                            {/* <select name="sortOrder" onChange={sortHandler} >
                                <option value="" >Newest</option>
                                <option value="lowest" >Lowest</option>
                                <option value="highest">Highest</option>
                            </select> */}
                            <select 
                                name="sortOrder"
                                // onChange={(e) => {
                                //     // Do not use onChange method, for your use case
                                //     //console.log('event value', e.target.value);
                                //     //console.log('event name', e.target.name);
                                // }}
                                
                                onChange={sortOrderSetter}

                                onClick={sortHandler} //fires as soon as select element/tag is clicked on
                                // onClick={(e) => {
                                //     // Use onClick method, for your use case
                                //     //console.log('XX event value', e.target.value);
                                //     //console.log('XX event name', e.target.name);
                                //     //
                                    
                                // }}
                                >
                                    <option value="newest" >Newest</option>
                                    <option value="lowest" >Lowest</option>
                                    <option value="highest">Highest</option>
                            </select>
                        </li>
                    </ul>

                    {
                     loading ? (<div>Loading...</div>) :
                     error ? (<div>{error}</div>) :
                        (   <ul className="products">
                            {
                                // data.products.map(product => //see data.js
                                products.map( product =>
                                    //gives each list item/child a unique key
                                    <li key={product._id}> 
                                    <div className="product">
                                        <Link to={'/product/' + product._id}>
                                            <img className="product-image" src={product.image} alt="product" />
                                        </Link>
                                        <div className="product-name">
                                        <Link to={'/product/' + product._id} >{product.name}</Link>
                                        {/* <a href="product.html">{product.name}</a> */}
                                        </div>
                                        <div className="product-brand">{product.brand}</div>
                                        <div className="product-price">${product.price}</div>
                                        {/* <div className="product-rating">{product.rating} Stars {product.numReviews}</div> */}
                                        <Rating
                                            value={product.rating}
                                            text={product.numReviews + ' reviews'}
                                        />
                                    </div>
                                    </li>
                                )
                            }
                            </ul>
                        )
                    }
                </>
            )
}

export default HomeScreen;
