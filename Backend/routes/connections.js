const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/userauth');
const Notes=require('../models/NoteModel');
const { sanitizeFilter } = require('mongoose');
const mongoose=require('mongoose');
const fetchuser=require('../middleware/fetchuser');
const router = express.Router();
const dotenv=require('dotenv').config({path:"./views/env/config.env"});
const secretkey=process.env.JWT_SECRET;
// checking for unique values of log in in user
router.post('/api/auth/signup',
  [body('user').isLength({ min: 4 }),
  body('password').isLength({ min: 5 })],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // checking if a user is already exist or not
      let user = await User.findOne({ user: req.body.user });
      if (user) {
        return res.status(400).json({success, "error": "One User with the same  user already exist" });
      }
      const salt = await bcrypt.genSaltSync(10);
     const secure = await bcrypt.hashSync(req.body.password, salt);
      //creating the data base
      user= await User.create({
        user: req.body.user,
        password: secure
      });
      console.log(user);
      // here I am seding the user through the auth token so I have to create a object
      const tobesentdata={
        user:{
          id:user.id
        }
      }
      // res signing with my config file and giving me token for the user
      const securetoken=jwt.sign(tobesentdata,secretkey);
      success=true;
      // sending request body when the call is successfull
      res.send({success,securetoken})  
    } catch (err) {
      console.log("ooops error occured", +err);
      res.status(500).send("Some Error occured");
    }
  });
  // checking for the user is valid or not
  // we are using bcrypt here for checking authentication and signing it
  router.post('/api/auth/authei', [
    body('user', 'Enter a valid user').exists(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { user, password } = req.body;
    try {
      let ispresent = await User.findOne({ user });
      if (!ispresent) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
  
      const passwordCompare = await bcrypt.compare(password, ispresent.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
  
      const data = {
        user: {
          id: ispresent.id
        }
      }
      const authtoken = jwt.sign(data, secretkey);
      success = true;
      res.json({ success, authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  });
    // route3:fetching the user details with correct userToken
    router.post('/api/auth/getdetails', fetchuser,  async (req, res) => {

      try {
        userId = req.user.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password")
        res.send(user)
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    })
module.exports = router;