import { 
        PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, 
        PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
        PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, 
        PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
        PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_FAIL, PRODUCT_REVIEW_SAVE_SUCCESS,
        PRODUCT_REVIEW_SAVE_RESET
       } from "../constants/productConstants";

function productListReducer(state = { products: [] }, action) { 
    //initial state is an empty array

    switch (action.type) {
      case PRODUCT_LIST_REQUEST: //a request is sent to server for list of products
        // return { loading: true}; indicates that a loading box should be displayed
        return { loading: true, products: [] };
      case PRODUCT_LIST_SUCCESS: //succesful response received after request is sent
        return { loading: false, products: action.payload };
      case PRODUCT_LIST_FAIL: //unsuccesful response received after request is sent
        return { loading: false, error: action.payload };
      default:
        return state; //state is not changed i.e return products: []
        /*reducer must return a state because the createStore a state/new state see store.js */
    }
}

// function productDetailsReducer(state = { product: {} }, action) { //initial state is an empty object

//   switch (action.type) {
//     case PRODUCT_DETAILS_REQUEST: //a request is sent to server for list of products
//       return { loading: true}; //indicates that a loading box should be displayed
//     case PRODUCT_DETAILS_SUCCESS: //succesful response received after request is sent
//       return { loading: false, product: action.payload };
//     case PRODUCT_DETAILS_FAIL: //unsuccesful response received after request is sent
//       return { loading: false, error: action.payload };
//     default:
//       return state; //state is not changed i.e return products: []
//       /*reducer must return a state because the createStore a state/new state see store.js */
//   }
// }
function productDetailsReducer(state = { product: { reviews: [] } }, action) { //initial state is an empty object

  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST: //a request is sent to server for list of products
      return { loading: true}; //indicates that a loading box should be displayed
    case PRODUCT_DETAILS_SUCCESS: //succesful response received after request is sent
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL: //unsuccesful response received after request is sent
      return { loading: false, error: action.payload };
    default:
      return state; //state is not changed i.e return products: []
      /*reducer must return a state because the createStore a state/new state see store.js */
  }
}

function productSaveReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productReviewSaveReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case PRODUCT_REVIEW_SAVE_FAIL:
      return { loading: false, errror: action.payload };
    case PRODUCT_REVIEW_SAVE_RESET:
      return {};
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer
};