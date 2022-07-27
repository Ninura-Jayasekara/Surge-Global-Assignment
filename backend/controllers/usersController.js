const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

//import mongoose model
const User = require('../models/userModel')


// Create new user (by admin)

const createUser = asyncHandler(async (req, res) => {
  const { id, firstName, lastName, dateOfBirth, mobile, accountType, email, password } = req.body

  if (!id || !firstName || !accountType || !email || !password) {
    res.status(400)
    throw new Error('please fill all required fields')
  }

  // Check if user alredy exists with provided email
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('This email address is already being used')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    id,
    firstName,
    lastName,
    dateOfBirth,
    mobile,
    accountType,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.firstName,
      email: user.email,
      role: user.accountType,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user ! please check again')
  }
})



// user login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check details to fetch user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.firstName,
      email: user.email,
      role: user.accountType,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})



// Get user data

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})



// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
}



//fetch all students
const fetchStudents = asyncHandler(async (req,res) => {
  User.find({accountType : 'student'}).then((students) => {
      res.json(students)
      //console.log(students)
  }).catch((err) => {
      console.log(err);
  })
})



//fetch by id

const fetchId = asyncHandler(async(req, res)=>{
  let q = req.query.q;
  let Id = null ;
  let filter = [];


  if (!isNaN(q)){
    filter.push({id : Number(q)})
  }
  else
  {
    filter.push(...[{firstName:q},{email:q}])
  }

  console.log(filter)

  User.findOne({$or: filter} )
  .then((students)=>{
      console.log(students)
      res.status(200).send({status: "Student fetched",students});
  
  }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "Error with get student", error: err.message});
  })
})



//update student
const updateStudent = asyncHandler(async (req, res) => {
  try{

    let current_user=req.user;

  await User.updateOne({
    _id:current_user._id
  },{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    mobile:req.body.mobile,
    email:req.body.email,
    
  });

    let userData=await User.findOne({_id:current_user._id})
    let jwt_secret=process.env.JWT_SECRET;
    let token=jwt.sign({
      data: userData
    }, jwt_secret, { expiresIn: '12h' });

    return res.status(200).send({
      message:'Profile successfully updated',
      data:userData,
      token:token
    });


}catch(err){
  return res.status(400).send({
    message:err.message,
    data:err
  });
}
})



module.exports = {
  createUser,
  loginUser,
  getUser,
  fetchStudents,
  fetchId,
  updateStudent
}
