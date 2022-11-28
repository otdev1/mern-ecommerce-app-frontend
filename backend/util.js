import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
  return jwt.sign( //see usage on https://github.com/auth0/node-jsonwebtoken
    //payload
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    // user,
    //secretorprivatekey
    config.JWT_SECRET, //see config.js
    {
      expiresIn: '48h', ////jwt key expires in 48 hours - 2 days
    }
  );
  /*the sign function accepts a payload and secretorprivatekey as arguments and generates 
    a token i.e string of characters which can be used for authentication of routes*/
};

const isAuth = (req, res, next) => {

  const token = req.headers.authorization;
  /*as per convention the token sent in authorization part of the header which holds any data
  needed to authorize a request in this case a token see node-rest-shop/check-auth.js*/

  if (token) {
    const onlyToken = token.slice(7, token.length);
    /*token.slice removes the minimum of 7 'Bearer' characters The value Bearer in the HTTP 
    Authorization header indicates the authentication scheme */

    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;

      next();
      /*The next() method returns an object with two properties done and value. 
        Since isAuth is a middleware the next() function must be used to indicate to other
        middleware in the chain when they can begin execution
        see productRoute.js, userRoute.js, orderRoute.js*/

      return;
    });/*the verify function returns a decoded token when a valid request-provided encoded token(onlyToken)
         and secret key(config.JWT_SECRET) is provided to it*/
  } 
  else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }

};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {

    return next();
    /*The next() method returns an object with two properties done and value. 
      Since isAdmin is a middleware the next() function must be used to indicate to other
      middleware in the chain when they can begin execution
      see productRoute.js, userRoute.js, orderRoute.js*/

  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};



export { getToken, isAuth, isAdmin };