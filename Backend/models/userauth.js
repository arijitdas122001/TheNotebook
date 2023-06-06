const mongoose=require('mongoose')
const { Schema } = mongoose;

const blogSchema = new Schema({
  user:{
    type:String,
    require:'Please enter your name'
  },
  password:{
    type:String,
    require:'Please enter  your password'

  }
});
//  to save the schema I have to make a model
const user=mongoose.model('usersauth',blogSchema);
module.exports=user; 