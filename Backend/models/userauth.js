const mongoose=require('mongoose')
const { Schema } = mongoose;

const blogSchema = new Schema({
  name:{
    type:String,
    require:'Please enter your name'
  },
  password:{
    type:String,
    require:'Please enter  your password'

  },
  title:{
    type:String,
  },
  description:{
    type:String
  }
});
//  to save the schema I have to make a model
const user=mongoose.model('usersauth',blogSchema);
module.exports=user; 