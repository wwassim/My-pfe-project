const User = require("../models/User")
const Cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")
const sendEmail=require('./sendEmail')

exports.registerUser = async (req, res, next) => {
    try {
      const { firstname, lastname, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          errorMessage: "An account with this email already exists.",
        });
      }
  
      const newUser = new User({
        firstname,
        lastname,
        email,
        password: Cryptojs.AES.encrypt(password, process.env.PASS_SECRET),
      });
  
      const addUser = await newUser.save();
      res.status(200).json(addUser);
    } catch (err) {
      // Handle the error
      console.error(err);
      res.status(500).json({
        errorMessage: "An error occurred while registering the user.",
      });
    }
  };
  

exports.loginUser = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email }).populate("followings");
      if (!user) {
        return res.status(401).json("Wrong credentials.");
      }
      const hashedPassword = Cryptojs.AES.decrypt(
        user.password,
        process.env.PASS_SECRET
      );
      const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8);
      if (originalPassword !== req.body.password) {
        return res.status(401).json("Wrong credentials.");
      }
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2 days" }
      );
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      // Handle the error
      console.error(err);
      res.status(500).json({
        errorMessage: "An error occurred while logging in.",
      });
    }
  };
//


exports.sendResetPasswordLinkCtrl = async (req, res) => {
  console.log(req.body)
  try {
    const { email } = req.body;

    // Check if user with the given email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json('User with given email does not exist!' );
    }
    // Generate reset password link
    const link = `http://localhost:3000/auth/reset/${user._id}`;
    // Generate email HTML template
    const htmlTemplate = `<p>Hi ${user.firstname},</p><p>Please click <a href="${link}">here</a> to reset your password.</p>`;
    // Send email
    await sendEmail(user.email, 'Reset your password', htmlTemplate);
    // Send response to client
    return res.status(200).json('email sent,check your email!' );
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error' );
  }
};

 ////

exports.getResetPasswordLinkCtrl = async (req,res) => {
  const user = await User.findById(req.params.id);
  if(!user) {
      return res.status(400).json({ message: "invalid link" });
  }
  res.status(200).json({ message: "Valid url" });
};
////

exports.resetPasswordCtrl = async (req,res) => {
  console.log(req.params)
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
     return res.status(400).json( "invalid link" );
    }
    console.log(user.password);
    user.password =  Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SECRET);
    await user.save();
    console.log(user.password);
    res.status(200).json( "Password reset successfully, please log in" );
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error' );
  }
};