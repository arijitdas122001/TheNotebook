const connectdb=require('./db');
const express=require('express');
const path=require('path');
const bodyParser = require("body-parser")
const app = express()
const port = 5000
connectdb(); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',require(path.join(__dirname,'./routes/connections')));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
