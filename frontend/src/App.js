import React from 'react';
// import logo from './logo.svg';
// import data from './data';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';


function App() {

  const userSignin = useSelector((state) => state.userSignin);
  //get initial state for userSignin from store.js
  const { userInfo } = userSignin;

  //see (end of file - script) index.html 
  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  return (

    <BrowserRouter>  
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
            </button>
            {/* <Link to="/">amazona</Link> */}
            {/* <a href="index.html">amazona</a> */}
            <a href="/">amazona</a>
          </div>
          <div className="header-links">
            {/* <a href="cart.html">Cart</a> */}
            <Link to="/cart">Cart</Link>
            {/* <a href="signin.html">Sign In</a> */}
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link>
              :
              <Link to="/signin">Sign In</Link>
              /*if userInfo exists show a link to profile of logged in user 
                else show Sign in button*/
            }  
            {userInfo && userInfo.isAdmin && ( //dropdown menu is enabled when userInfo exists and userInfo.isAdmin is true
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li style={{ marginBottom: 0.4 + 'rem' }} >
                    <Link to="/orders">Orders</Link>
                    {/* <Link to="/products">Products</Link> */}
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}         
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
            <li>
              {/* <a href="/category/Pants">Pants</a> */}
              <Link to="/category/Pants">Pants</Link>
            </li>

            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li>

          </ul>
        </aside>
        <main className="main">
          <div className="content">

            <Route path="/orders" component={OrdersScreen} />

            <Route path="/profile" component={ProfileScreen} />

            <Route path="/order/:id" component={OrderScreen} />

            <Route path="/products" component={ProductsScreen} />

            <Route path="/shipping" component={ShippingScreen} />

            <Route path="/payment" component={PaymentScreen} />

            <Route path="/placeorder" component={PlaceOrderScreen} />

            <Route path="/signin" component={SigninScreen} />

            <Route path="/register" component={RegisterScreen} />

            <Route path="/product/:id" component={ProductScreen} />

            <Route path="/cart/:id?" component={CartScreen} />
            {/*? indicates that id is optional, this allows /cart route to be accessible */}

            <Route path="/category/:id" component={HomeScreen} />

            <Route path="/" exact={true} component={HomeScreen} />
            {/* <ul className="products">
              {
                data.products.map(product => //see data.js
                  <li>
                    <div className="product">
                      <img className="product-image" src={product.image} alt="product" />
                      <div className="product-name">
                        <a href="product.html">{product.name}</a>
                      </div>
                      <div className="product-brand">{product.brand}</div>
                      <div className="product-price">{product.price}</div>
                      <div className="product-rating">{product.rating} Stars {product.numReviews}</div>
                    </div>
                  </li>
                )
              }
              
            </ul> */}
        </div>

      </main>
      <footer className="footer">
        All right reserved.
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
