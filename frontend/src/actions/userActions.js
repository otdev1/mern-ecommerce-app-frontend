import axios from "axios";
import Cookie from 'js-cookie';
import { 
        USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
        USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
        USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL 
       } from "../constants/userConstants";

import { API_URL } from "../constants/apiURL";

const signin = (email, password) => async (dispatch) => {

    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

    try {

      const { data } = await axios.post( API_URL + '/api/users/signin', { email, password });
      //see userRoute.js 

      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

      Cookie.set('userInfo', JSON.stringify(data));
      /*userInfo is the name of the cookie which stores the result of converting 
      data, which is an object-type, variable to a JSON string*/
    } 
    catch (error) {

      //dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });

      if(error.message === 'Request failed with status code 401') 
      {
        const msg = 'Invalid Email or Password.';

        dispatch({ type: USER_SIGNIN_FAIL, payload: msg });
      }
      else
      {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
      }

    }

}

const register = (name, email, password) => async (dispatch) => {
  
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  
  try {
    const { data } = await axios.post( API_URL + '/api/users/register', { name, email, password });
    //see userRoute.js 

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } 
  catch (error) {
    
    //const msg = 'email already exists';
    if(error.message === 'Request failed with status code 409') 
    {
      const msg = 'Email already exists';

      dispatch({ type: USER_REGISTER_FAIL, payload: msg });
    }
    else
    {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }

    //dispatch({ type: USER_REGISTER_FAIL, payload: error.message });

    //dispatch({ type: USER_REGISTER_FAIL, payload: msg });

  }
}

const logout = () => (dispatch) => {

  Cookie.remove("userInfo"); //delete the userinfo cookie
  dispatch({ type: USER_LOGOUT });

}

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {

  const { userSignin: { userInfo } } = getState();

  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });

  try {

        const { data } = await axios.put( API_URL + '/api/users/' + userId, { name, email, password }, 
                                          {
                                            headers: {
                                              Authorization: 'Bearer ' + userInfo.token
                                          }
                                        });

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));

  } 
  catch (error) {

    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });

  }
}

export { signin, register, logout, update};