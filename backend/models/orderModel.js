import mongoose from 'mongoose';

//import User from '../models/userModel';

var User = require('mongoose').model('User');

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
});

const shippingSchema = {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
};

// const shippingSchema = new mongoose.Schema ({
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     country: { type: String, required: true },
// });

const paymentSchema = {
    paymentMethod: { type: String, required: true }
}
// const paymentSchema = new mongoose.Schema({
//     paymentMethod: { type: String, required: true }
// });

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        // user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
        orderItems: [orderItemSchema],
        shipping: shippingSchema,
        payment: paymentSchema,
        itemsPrice: { type: Number },
        taxPrice: { type: Number },
        shippingPrice: { type: Number },
        totalPrice: { type: Number },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    }, 
    {
        timestamps: true //time at which a new recorded is created is saved in timestamps
    }
);

// orderSchema.statics.findByName = function (username, callback) {
//     var query = this.findOne();
  
//     User.findOne({'name': username}, function (error, user) {
//       query.where(
//         {user: user._id}
//       ).exec(callback);
//     })
//     return query;
// }

//const orderModel = mongoose.model("Order", orderSchema);

const orderModel = mongoose.model('Order', orderSchema, 'order');

// By default, Mongoose pluralizes the model name to come up with the name of the collection, 
// so Mongoose is looking in the orders collection instead of order

// You can explicitly set the collection name by passing that as the third parameter to model
// see https://stackoverflow.com/questions/26526779/mongoose-populate-not-working

export default orderModel;