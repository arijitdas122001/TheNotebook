const mongoose = require('mongoose');
const dotenv=require('dotenv').config({path:"./views/env/config.env"});
// const mongoURI = "mongodb+srv://nitika:kVqNFc67KIBUD0TI@clusternotebook.qyotzmp.mongodb.net/?retryWrites=true&w=majority"
const url=process.env.MONGO_URL;
// console.log(url);
const connectdb=async()=>{
    try {
      const con = await mongoose.connect(url,{
        //must add in order to not get any error masseges:
        useunifiedtopology:true,
        usenewurlparser: true,
      });
      console.log(`Connected :${con.connection.host}`);
      } catch (error) {
       console.log(error);
      }
      
}
module.exports = connectdb;                                         