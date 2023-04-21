const axios = require("axios");
exports.add = async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment"; // Add the correct protocol
    const payload = {
        app_token: "21534e2a-50c9-4b94-bc6b-9711baee8af4",
        app_secret: process.env.PAYMENT_SECRET,
        amount: req.body.ticketsPrice,
        accept_card: "true",
        session_timeout_secs: 1200,
        success_link: "http://localhost:3000/success",
        fail_link: "http://localhost:3000/fail",
        developer_tracking_id: "1fcc4675-ad4c-4f32-a69d-65559ad0e5c4"
    }
    try {
        const result = await axios.post(url, payload, {headers:{
            "content-type": "application/json;charset=utf-8",
           }});
        res.status(200).json(result.data)
    } catch (err) {
        console.error(err);
        // Handle the error and send an appropriate response to the client
        res.status(500).send("Internal Server Error");
    }
}



exports.verify=async (req,res)=>{
    const payment_id=req.params.id;
    try {
        const result= await axios.get(`https://developers.flouci.com/api/verify_payment/${payment_id}`,{headers:{
            'Content-Type':"application/json",
            'apppublic':"21534e2a-50c9-4b94-bc6b-9711baee8af4",
            'appsecret':process.env.PAYMENT_SECRET,
        }})
        res.status(200).json(result.data)

    } catch (error) {
        res.status(500).json(error);
    } 
}
