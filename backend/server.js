import express from 'express';
import path from 'path';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
//import uploadRoute from './routes/uploadRoute';

dotenv.config();
/*Dotenv is a zero-dependency module that loads environment 
variables from a .env file into process.env. Storing configuration 
in the environment separate from code is based on The Twelve-Factor 
App methodology.*/

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
//app.use('/api/uploads', uploadRoute);
app.use("/api/users", userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
//allows a file stored in uploads folder to be displayed in the frontend

// app.use("/api/products/:id", (req, res) => {

//     const productId = req.params.id;

//     const product = data.products.find(x => x._id === productId);

//     if(product)
//         res.send(product);
//     else
//         res.status(404).send( {msg: "Product Not Found."})
// });

// app.use("/api/products", (req, res) => {
//     res.send(data.products)
// });

app.listen(5000, () => { console.log('Server started at http://localhost:5000'); })
