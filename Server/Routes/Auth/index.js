const express = require('express');
const router = express.Router();
const {register, login} = require('../../Controllers/Auth/index.js');

router.route('/').get((req, res)=>{
    res.send('hello');
})
router.post('/register', register)
router.post('/login', login)


module.exports= router; 