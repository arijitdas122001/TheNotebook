const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://nitika:kVqNFc67KIBUD0TI@clusternotebook.qyotzmp.mongodb.net/?retryWrites=true&w=majority"
const connectdb=async()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected");
      } catch (error) {
       console.log(error);
      }
      
}
module.exports = connectdb;