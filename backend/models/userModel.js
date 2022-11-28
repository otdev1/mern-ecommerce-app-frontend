import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    //_id: { type: mongoose.Schema.Types.ObjectId }, //custom code
    name: { type: String, required: true },
    email: {
      type: String, required: true, unique: true, dropDups: true},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
});
  
const userModel = mongoose.model('User', userSchema);
                  //User is the name of the collection that will be stored in the mongo database

export default userModel;