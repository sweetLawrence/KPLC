const express = require('express');
const router = express.Router();


router.post('/submit-permit', (req, res) => submitPermit(req,res));

function submitPermit(req,res){
    console.log(req.body)
    res.json("Permit received successfully")
}


module.exports = router;