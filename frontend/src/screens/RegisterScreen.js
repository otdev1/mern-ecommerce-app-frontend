import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
/*it convention to use lowercase for action names */

function RegisterScreen(props) {

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [rePassword, setRePassword] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (userInfo) {
    //       props.history.push("/");
    //       //redirect to home page if userInfo exists
    //     }
    //     return () => {
    //       //
    //     };
    // }, [userInfo]); 
    //useEffect only runs if the state of userInfo changes

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    
    useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
      return () => {
        //
      };
    }, [userInfo]);
    //useEffect only runs if the state of userInfo changes
    
  
    const submitHandler = (e) => {
      e.preventDefault();
         //prevents screen from being refreshed when user clicks on submit button
      dispatch(register(name, email, password)); //see userActions.js for definition of Register
    }
    return  <div className="form">
                <form onSubmit={submitHandler} >
                {/* <form > */}
                    <ul className="form-container">
                        <li>
                            <h2>Create Account</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>} {/*shows loading if signin returns loading after being dispatched*/}
                            {error && <div>{error}</div>}
                            {/* {error && alert(error)} */}
                        </li>
                        <li>
                            <label htmlFor="name">
                            Name
                            </label>
                            <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="email">
                            Email
                            </label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="rePassword">Re-Enter Password</label>
                            <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <button type="submit" className="button primary">Register</button>
                        </li>
                        <li>
                            Already have an account?
                            <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Sign In</Link>
                            {/* <Link to="/signin">Sign-in</Link> */}
                        </li>
                    </ul>
                </form>
            </div>
  }
  
export default RegisterScreen;