import express from 'express';
import Product from '../models/productModel';
import { getToken, isAuth, isAdmin } from '../util';

const router = express.Router();

/*List All Products*/
//router.get('/', async (req, res) => {
  // const category = req.query.category ? { category: req.query.category } : {};
  // const searchKeyword = req.query.searchKeyword
  //   ? {
  //       name: {
  //         $regex: req.query.searchKeyword,
  //         $options: 'i',
  //       },
  //     }
  //   : {};
  // const sortOrder = req.query.sortOrder
  //   ? req.query.sortOrder === 'lowest'
  //     ? { price: 1 }
  //     : { price: -1 }
  //   : { _id: -1 };
  // const products = await Product.find({ ...category, ...searchKeyword }).sort(
  //   sortOrder
  // );
//   const products = await Product.find({});
//   res.send(products);

// });
router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  /*if the category parameter is not empty assign { category: req.query.category } to const category
  else assign an empty object to it*/
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword, 
          //$regex provides regular expression capabilities for pattern matching strings in queries
          $options: 'i',
          // 'i' option indicates case insensitivity to match upper and lower cases.
        },
      }
    : {};

  //const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 } : { _id: -1 } ;
  var sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 } : { createdAt: -1 } ;
  //const sortOrder = req.query.sortOrder === 'newest' ?  { createdAt: -1 } /*{ _id: -1 }*/ : req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 } ;
  // const sortOrder = "newest" ;
  // switch(req.query.sortOrder) {
  //   // case "newest":
  //   //   sortOrder = /*{ _id: -1 };*/ { createdAt: -1 };
  //   //   break;
  //   case "lowest":
  //     sortOrder = { price: 1 };
  //     break;
  //   case "highest":
  //     sortOrder = { price: -1 };
  //     break;
  //   default:
  //     sortOrder = /*{ _id: -1 };*/ { createdAt: -1 };
  // }
  //let sortOrder = '';
  //req.query.sortOrder === 'lowest' ? sortOrder = (a,b) => { return b - a } : sortOrder = (a,b) => {return a - b };

  const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
  /*...category - destructuring of category object, ...searchKeyword - destructuring of searchKeyword object
    this destructuring is equivalent to { category: 'someval', searchKeyword: 'someval' }
    https://mongoosejs.com/docs/api.html#model_Model.find
    https://oprearocks.medium.com/what-do-the-three-dots-mean-in-javascript-bc5749439c9a
    https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do
  */
  // const products = await Product.find({ 
  //                                     ...category, 
  //                                       ...searchKeyword 
  //                                     },
  //                                     "sort": {
  //                                       [sortOrder]: -1
  //                                     });
  res.send(products);

  sortOrder = '';
});

router.get('/:id', async (req, res) => {
  
  const product = await Product.findOne({ _id: req.params.id });

  if (product) {
    
    res.send(product);

  } 
  else {

    res.status(404).send({ message: 'Product Not Found.' });
    
  }

});

router.post('/:id/reviews', isAuth, async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating), // cast/convert the rating property of the request to a Number
      comment: req.body.comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;

    const updatedProduct = await product.save();

    res.status(201).send({
      
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } 
  else {

    res.status(404).send({ message: 'Product Not Found' });

  }

});

/*Create A Product */
router.post('/', isAuth, isAdmin, async (req, res) => {

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });

  const newProduct = await product.save();

  if (newProduct) {
    return res
      .status(201)
      .send({ message: 'New Product Created', data: newProduct });
  }

  return res.status(500).send({ message: ' Error in Creating Product.' });

});

/*Update A Product */
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {

    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }

  }

  return res.status(500).send({ message: ' Error in Updating Product.' });

});

/*Delete A Product */
router.delete('/:id', isAuth, isAdmin, async (req, res) => {

  const deletedProduct = await Product.findById(req.params.id);

  if (deletedProduct) {

    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });

  } 
  else {
    
    res.send('Error in Deletion.');
  }

});

export default router;