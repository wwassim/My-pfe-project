const multer = require('multer');


//MULTER CONFIGURATION
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        console.log(file)
        cb(null, './public');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname.replace(/\s+/g,'-')}_${Math.round(Math.random()* 1E9)}`);
    },
})
const upload = multer({storage})

module.exports={storage,upload}