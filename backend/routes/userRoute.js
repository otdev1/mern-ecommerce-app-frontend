import express from 'express';
import User from '../models/userModel'; //custom code
import { getToken, isAuth } from '../util';
import mongoose from 'mongoose'; //enables automated generation of objectid see create admin user function
//const bcrypt = require("bcrypt");
import bcrypt from 'bcrypt';

const router = express.Router();

/*User Sign In/Log In*/ 
// router.post('/signin', async (req, res) => {
//       const signinUser = await User.findOne({
//         email: req.body.email,
//         password: req.body.password,
//       });
//     if (signinUser) {
//       res.send({
//         _id: signinUser.id,
//         name: signinUser.name,
//         email: signinUser.email,
//         isAdmin: signinUser.isAdmin,
//         token: getToken(signinUser),
//         //token is used to identify if next request is authenticated or not
//       });
//     } 
//     else {
//       res.status(401).send({ message: 'Invalid Email or Password.' });
//     }
// });
router.post('/signin', async (req, res) => {

  const signinUser = await User.findOne({
    email: req.body.email,
    //password: req.body.password,
  });

  bcrypt.compare(req.body.password, signinUser.password, async (err, result) => {

    if (err) {
      return res.status(401)({ message: "Authorization failed" });
    }

    if (result) { /*bcrypt.compare returns either true or false see https://www.npmjs.com/package/bcrypt*/
      
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
        //token is used to identify if next request is authenticated or not
      });
    } 
    else 
    {
      res.status(401).send({ message: 'Invalid Email or Password.' });
    }
  });

});

/*Create New User*/
// router.post('/register', async (req, res) => {

//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   const newUser = await user.save();
  
//   if (newUser) {
//     res.send({
//       _id: newUser.id,
//       name: newUser.name,
//       email: newUser.email,
//       isAdmin: newUser.isAdmin,
//       token: getToken(newUser),
//     });
//   } 
//   else 
//   {
//     res.status(401).send({ message: 'Invalid User Data.' });
//   }

// });
router.post('/register', async (req, res) => {

  const usercheck = await User.findOne({ email: req.body.email });

  if (usercheck) {

    // res.status(409).json({ //status code 409 means conflict
    //   message: "Mail exists"
    // });

    //res.status(409).send({ message: 'Mail exists' });
    res.status(409).send( 'Mail exists' );

    //res.status(409).send( alert('Email address already exists') );

    //alert('Email address already exists');
  } 
  else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          /*10 specifies the number of salt rounds
            see https://stackoverflow.com/questions/46693430/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt
            With "salt round" they actually mean the cost factor. The cost factor controls 
            how much time is needed to calculate a single BCrypt hash. The higher the cost 
            factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles
            the necessary time. The more time is necessary, the more difficult is brute-forcing.
          */

            if (err) {
                return res.status(500)({ error: err });
            } 
            else {

              const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
              });
            
              const newUser = await user.save();
              
              if (newUser) {
                res.send({
                  _id: newUser.id,
                  name: newUser.name,
                  email: newUser.email,
                  isAdmin: newUser.isAdmin,
                  token: getToken(newUser),
                });
              } 
              else 
              {
                res.status(401).send({ message: 'Invalid User Data.' });
              }
               
            }
        });
    }

});

/*Create New Admin User */
// router.get("/createadmin", async (req, res) =>{
//     try {
//         const user = new User({
//             //_id: new mongoose.Types.ObjectId(), //custom code
//             name: 'Admin_OT',
//             email: 'admin@admin.com',
//             password: 'password',
//             isAdmin: true
//         });
//         const newUser = await user.save();
//         res.send(newUser);

//     } 
//     catch (error) {
//       res.send({ msg: error.message });   
//     }
    
// });
// router.get("/createadmin", async (req, res) =>{
//   try {
//       const user = new User({
//           //_id: new mongoose.Types.ObjectId(), //custom code
//           name: 'Admin_OT',
//           email: 'admin@admin.com',
//           password: 'password',
//           isAdmin: true
//       });
//       const newUser = await user.save();
//       res.send(newUser);

//   } 
//   catch (error) {
//     res.send({ msg: error.message });   
//   }
  
// });
router.get("/createadmin", async (req, res) =>{ //http://localhost:5000/api/users/createadmin
  // try
  // {
    //const password = 'password';

    bcrypt.hash('password', 10, async (err, hash) => {

      if (err) 
      {
        return res.status(500).send({ error: err });
      } 
      else
      {

        const user = new User({
            //_id: new mongoose.Types.ObjectId(), //custom code
            name: 'Admin_OT',
            email: 'admin@admin.com',
            password: hash,
            isAdmin: true
        });

        const newUser = await user.save();
        res.send(newUser);
        // res.send({
        //   _id: newUser.id,
        //   name: newUser.name,
        //   email: newUser.email,
        //   isAdmin: newUser.isAdmin
        //   //token: getToken(newUser),
        // });

      }

    });
  //}
  // catch (error) 
  // {
  //     res.send({ msg: error.message });   
  // }
  
  
});

/*Update User Info */
router.put('/:id', isAuth, async (req, res) => {

  const userId = req.params.id;

  const user = await User.findById(userId);

  if (user) {

    user.name = req.body.name || user.name; 
    /*change user.name to value of req.body.name or keep current value of user.name if req.body.body is empty */
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();

    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });

  } 
  else {

    res.status(404).send({ message: 'User Not Found' });

  }

});

export default router;