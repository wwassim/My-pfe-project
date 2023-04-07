const User = require("../models/User")
const Cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")

//Register New User

// exports.registerUser = async (req,res,next)=>{
//     const {firstname,lastname,email,password} = req.body;
//     const existingUser = await User.findOne({ email});
//     if (existingUser)
//       return res.status(400).json({
//         errorMessage: "An account with this email already exists.",
//       });
    
//     const newUser = new User({
//         firstname,
//         lastname,
//         email,
//         password:Cryptojs.AES.encrypt(password,process.env.PASS_SECRET)
//     })
//     try {
//         const addUser= await newUser.save();
//         res.status(200).json(addUser)
//     } catch (err) {
//         res.status(500).json(err)
//     }  
// }
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
  

//Login 
// exports.loginUser =async(req,res,next)=>{
//     try {
//         const user = await User.findOne({email:req.body.email})

      
//         !user && res.status(401).json("wrong credentials")

//         const hashedPassword =Cryptojs.AES.decrypt(user.password,process.env.PASS_SECRET)

//         const OriginalPassword = hashedPassword.toString(Cryptojs.enc.Utf8)
//         OriginalPassword != req.body.password &&res.status(401).json("wrong credentials")

//         const accessToken = jwt.sign({
//             id:user._id,
//             isAdmin:user.isAdmin,
//         },process.env.JWT_SECRET,{expiresIn:"2 days"})

//         const {password, ...others}=user._doc 
//         res.status(200).json({...others,accessToken})
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

exports.loginUser = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
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
  