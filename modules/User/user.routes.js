const express = require('express');
const validate = require('express-validation');
import userManager from './userManager';
// import config from '../../../config/config'
import expressJwt from 'express-jwt';
const router = express.Router(); // eslint-disable-line new-cap

router.get('/test',(req,res)=>{
    res.json({message: "OK"})
})
router.post('/test2',userManager.getInstagramData)
module.exports = router;