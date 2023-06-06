const mongoose=require('mongoose')
const { Schema } = mongoose;

const UsersNotes = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'usersauth'
  },
  author:{
    type:String
  },
  title:{
    type:String,
  },
  description:{
    type:String
  },
  date:{
     type:String,
  },
  tag:{
    type:String,
    default:'General'
  }
});
//  to save the schema I have to make a model
const notesuser=mongoose.model('Notesuser',UsersNotes);
module.exports=notesuser; 