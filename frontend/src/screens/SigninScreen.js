import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninScreen(props) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(() => {
        if (userInfo) {
        //   props.history.push("/");
          //redirect to home page if userInfo exists
          props.history.push(redirect);
        }
        return () => {
          //
        };
    }, [userInfo]); 
    //useEffect only runs if the state of userInfo changes

    //const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    // useEffect(() => {
    //   if (userInfo) {
    //     props.history.push(redirect);
    //   }
    //   return () => {
    //     //
    //   };
    // }, [userInfo]);
    
  
    const submitHandler = (e) => {
      e.preventDefault();
         //prevents screen from being refreshed when user clicks on submit button
      dispatch(signin(email, password)); //see userActions.js for definition of signin
    }
    
    return  <div className="form">
                <form onSubmit={submitHandler} >
                {/* <form > */}
                    <ul className="form-container">
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>} {/*shows loading if signin returns loading after being dispatched*/}
                        {error && <div>{error}</div>}
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
                        <button type="submit" className="button primary">Signin</button>
                    </li>
                    <li>
                        New to amazona?
                    </li>
                    <li>
                        <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your amazona account</Link>
                        {/* <Link to="/register" className="button secondary text-center" >Create your amazona account</Link> */}
                    </li>
                    </ul>
                </form>
            </div>
  }
  export default SigninScreen;