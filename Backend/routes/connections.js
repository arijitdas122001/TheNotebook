const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/userauth');
const { sanitizeFilter } = require('mongoose');
const mongoose=require('mongoose');
const user = require('../models/userauth');
const fetchuser=require('../middleware/getuser');
const router = express.Router();
const dotenv=require('dotenv').config({path:"./views/env/config.env"});
const secretkey=process.env.JWT_SECRET;
router.get('/', (req, res) => {
  console.log("hello");
})
// checking for unique values of log in in user
router.post('/api/auth/LogIn',
  [body('user').isLength({ min: 4 }),
  body('password').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // checking if a user is already exist or not
      let user = await User.findOne({ user: req.body.user });
      if (user) {
        res.status(400).send({ "error": "One User with the same  user already exist" });
      }
      const salt = bcrypt.genSaltSync(10);
     const secure = bcrypt.hashSync(req.body.password, salt);
      //creating the data base
      user= await User.create({
        user: req.body.user,
        password: secure,
        title: req.body.title,
        description: req.body.description
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
      // sending request body when the call is successfull
      res.send({securetoken})  
    } catch (err) {
      console.log("ooops error occured", +err);
      res.status(500).send("Some Error occured");
    }
  });

  // checking for the user is valid or not
  // we are using bcrypt here for checking authentication and signing it
  router.post('/api/auth/authei',
  // exists function is used for checking if in the form the password exists or not
  [body('user').exists(),
  body('password').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // desctrucring form user input means res.body
    const {user,password}=req.body;
    try {
      // finding if the user is present if not then return straigtly
      let dbuser=await User.findOne({user})
      if(!dbuser){
        res.status(400).send({"error":"User doesn't match"});
      }
      // Here I am comparing the user with the form fetched password
     const issame=await bcrypt. compare(password, dbuser.password);
      if(!issame){
        res.status(401).send({"error":"Please Log In with correct credentials"});
      }
      const tobesentdata={
        user:{
          id:dbuseer.id
        }
      }
      // res signing with my config file and giving me token for the user
      const securetoken=jwt.sign(tobesentdata, secretkey);
      res.json({securetoken});
    } catch (err) {
      console.log("ooops error occured", +err);
      res.status(500).send({"error":"Some Error occured"});
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