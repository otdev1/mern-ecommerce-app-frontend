import { 
         PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, 
         PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
         PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, 
         PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
         PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_FAIL, PRODUCT_REVIEW_SAVE_SUCCESS,
       } from "../constants/productConstants";



import axios from "axios";

// const listProducts = () => async (dispatch) => {

//     try {

//         dispatch({ type: PRODUCT_LIST_REQUEST}); 
//         /*dispatch PRODUCT_LIST_REQUEST action to reducer each dispatch has an object and the object 
//           has a type and a payload, in this the object does not have a payload*/

//         const { data } = await axios.get("/api/products");
//         // object returned by axios has a property called data, this property contains the list of products

//         dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//         //each dispatch has an object and the object has a type and a payload
        
//     } 
//     catch (error) {

//         dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
        
//     }

// };
const listProducts = ( category = '', searchKeyword = '', sortOrder = '' ) => async (dispatch) => {

  try {

      dispatch({ type: PRODUCT_LIST_REQUEST}); 
      /*dispatch PRODUCT_LIST_REQUEST action to productReducer.js, each dispatch has an object and the object 
        has a type and a payload, in this case the object does not have a payload
        actions are dispatched to maintain orderly behavior of the UI when operations that
        can change the UI in unexpected ways are executed, in this case these operations are 
        network/http requests*/

      const { data } = await axios.get(
        '/api/products?category=' +
          category +
          '&searchKeyword=' +
          searchKeyword +
          '&sortOrder=' +
          sortOrder
      );//the result contained in the response to the request sent (using axios) to the server is stored in data

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      //each dispatch has an object and the object has a type and a payload
      
  } 
  catch (error) {

      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
      
  }

};
// const listProducts = ( category, searchKeyword, sortOrder ) => async (dispatch) => {

//   try {

//       dispatch({ type: PRODUCT_LIST_REQUEST}); 
//       /*dispatch PRODUCT_LIST_REQUEST action to reducer each dispatch has an object and the object 
//         has a type and a payload, in this the object does not have a payload*/

//       const { data } = await axios.get(
//         '/api/products?category=' +
//           category +
//           '&searchKeyword=' +
//           searchKeyword +
//           '&sortOrder=' +
//           sortOrder
//       );

//       dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//       //each dispatch has an object and the object has a type and a payload
      
//   } 
//   catch (error) {

//       dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
      
//   }

// };

const saveProduct = (product) => async (dispatch, getState) => {
  /* getState returns the current state tree of the application. 
     It is equal to the last value returned by the store's reducer.
  */
  try {

    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    //dispatch PRODUCT_SAVE_REQUEST action and payload to productReducers.js

    const { userSignin: { userInfo }, } = getState();

    // const { data } = await axios.post('/api/products', product, {
    //   headers: {
    //     Authorization: 'Bearer ' + userInfo.token, //token is provided by getState
    //   },
    // });

    // dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });

    if (!product._id) {
      /*product id does not exist, this means a new product is being created*/
      const { data } = await axios.post('/api/products', product, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token, //token is provided by getState
        },
      });

      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      //dispatch PRODUCT_SAVE_SUCCESS action and payload to productReducers.js

    } 
    else {
      /*product id exists, this means a product is being editted*/
      const { data } = await axios.put('/api/products/' + product._id,
        product,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token, //token is provided by getState
          },
        }
      );

      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });

    }

  } 
  catch (error) {

    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });

  }

};

const detailsProduct = (productId) => async (dispatch) => {

    try {

      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

      const { data } = await axios.get('/api/products/' + productId);
      /*object returned by axios has a property called data, this property contains the product details
      of the product with the id of productId*/

      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {

      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
      
    }

};

const deleteProduct = (productId) => async (dispatch, getState) => {
  
  try {
    
    const { userSignin: { userInfo }, } = getState();

    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });

    const { data } = await axios.delete('/api/products/' + productId, {

      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },

    });

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } 
  catch (error) {
    
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }

};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  
  try {
         const { userSignin: { userInfo: { token },
      },
    } = getState();

    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });

    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review, //the review is sent as the body
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });

  } 
  catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }

};

export {
    listProducts, 
    detailsProduct, 
    saveProduct, 
    deleteProduct,
    saveProductReview
};
