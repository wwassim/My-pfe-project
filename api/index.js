const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const path= require('path')
const auth = require('./Routes/auth')
const userRoute = require('./Routes/user')
const categoryRoute = require('./Routes/category')
const artistRoute = require('./Routes/artist')
const eventRoute = require('./Routes/event')
const helmet = require("helmet")
const morgan = require("morgan")


//connect to DB
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('db connection est ablished')}).catch((err)=>{console.log(err)})

app.use(express.json())
app.use(express.urlencoded({extended:true}))//l data eli jeya men form
app.use(cors());

// --------------Static Folder For Images----------------
app.use("/assets",express.static(path.join(__dirname, "public/assets")));

app.use('/auth',auth)
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/artist", artistRoute);
app.use("/event", eventRoute);




app.listen(process.env.PORT || 5000,()=>{console.log(`servier On ${process.env.PORT}`);})