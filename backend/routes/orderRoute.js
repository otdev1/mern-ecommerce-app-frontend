import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

/*Create An Order*/
router.post("/", isAuth, async (req, res) => {

  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });

  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: "New Order Created", data: newOrderCreated });

});

/*Show Details For One Order*/
router.get("/:id", isAuth, async (req, res) => {

  const order = await Order.findOne({ _id: req.params.id });

  if (order) {
    res.send(order);
  } 
  else {
    res.status(404).send("Order Not Found.")
  }
});

/*Process response after user pays for item using paypal
 see payorder in orderactions*/
router.put("/:id/pay", isAuth, async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }

    const updatedOrder = await order.save();

    res.send({ message: 'Order Paid.', order: updatedOrder });

  } 
  else {
    res.status(404).send({ message: 'Order not found.' })
  }
  
});

/*Show All of Current User's Orders */
// router.get("/mine", isAuth, async (req, res) => {

//   // const orders = await Order.find({ user: req.user._id });

//   // res.send(orders);
//   res.send(req.user._id);

// });
router.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user'); 
  //list all orders and populate the user property so that user info can be accessed
  //const order = await Order.find({}); 

  //const orders = await Order.find({}).populate('user').execpopulate();

  res.send(orders);
});
// router.get("/mine", isAuth, async (req, res) => {

//   const orders = await Order.find( { user: req.user} );
//   // const orders = await Order.find( { user: `${req.user._id}` } );
//   // const orders = await Order.find( { user: req.params._id } );
  

//   res.send(orders);
//   //res.send(req.user._id);

//   // res.send(`${req.user._id}`);
//   //console.log(req.user._id);

//   // Order.findByName(req.user.name, function (err, user) {
//   //   if(err)
//   //       res.send(err);
//   //   res.json(user);
//   // });

// });
router.get("/mine/:id", isAuth, async (req, res) => {

  const orders = await Order.find( { user: req.params.id} );
  // const orders = await Order.find( { user: `${req.user._id}` } );
  // const orders = await Order.find( { user: req.params._id } );
  

  res.send(orders);
  //res.send(req.user._id);

  // res.send(`${req.user._id}`);
  //console.log(req.user._id);

  // Order.findByName(req.user.name, function (err, user) {
  //   if(err)
  //       res.send(err);
  //   res.json(user);
  // });

});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {

  const order = await Order.findOne({ _id: req.params.id });

  if (order) {

    const deletedOrder = await order.remove();
    res.send(deletedOrder);

  } 
  else {

    res.status(404).send("Order Not Found.");
    
  }
});

export default router;