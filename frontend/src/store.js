// description of store.js - https://redux.js.org/api/store

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
/*see https://www.freecodecamp.org/news/redux-thunk-explained-with-examples/#:~:text=Redux%20Thunk%20is%20middleware%20that,actions%2C%20including%20working%20with%20promises.&text=Redux%20Thunk%20allows%20us%20to,each%20promise%20that%20gets%20returned.
  Redux Thunk is middleware that allows you to return functions, 
  rather than just actions, within Redux. This allows for delayed actions, 
  including working with promises. */

import Cookie from 'js-cookie';

import {
    productListReducer,
    productDetailsReducer,
    productSaveReducer,
    productDeleteReducer,
    productReviewSaveReducer,
  } from './reducers/productReducers';

import {cartReducer} from './reducers/cartReducers';

import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';

import { orderCreateReducer, 
         orderDetailsReducer, 
         orderPayReducer, 
         myOrderListReducer, 
         orderListReducer,
         orderDeleteReducer,
       } from './reducers/orderReducers';


const cartItems = Cookie.getJSON("cartItems") || [];
//enables access to the cookie

const userInfo = Cookie.getJSON('userInfo') || null;

//const initialState = {};
const initialState = { cart: { cartItems, shipping: {}, payment: {} }, userSignin: { userInfo }};
//creates initial state based on the item in the cookie
//userSignin used in App.js

const reducer = combineReducers({
    productList: productListReducer,

    productDetails: productDetailsReducer,

    cart: cartReducer,

    userSignin: userSigninReducer,

    userRegister: userRegisterReducer,

    productSave: productSaveReducer,

    productDelete: productDeleteReducer,

    orderCreate: orderCreateReducer,

    orderDetails: orderDetailsReducer,

    orderPay: orderPayReducer,

    userUpdate: userUpdateReducer,

    myOrderList: myOrderListReducer,

    orderList: orderListReducer,

    orderDelete: orderDeleteReducer,

    productReviewSave: productReviewSaveReducer,
    
  });
  /* see https://redux.js.org/api/combinereducers
  The combineReducers helper function turns an object whose values are different 
  reducing functions into a single reducing function you can pass to createStore.
  The resulting reducer calls every child reducer, and gathers their results into a 
  single state object. The state produced by combineReducers() namespaces the states of 
  each reducer under their keys as passed to combineReducers() */

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*https://redux.js.org/api/compose */

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

/* the reducer accepts an action and does something with it i.e changes a state */
/* initialState could be javascript object or an array*/
/*thunk is a middleware for redux that enables async operations in a redux action  */

export default store;