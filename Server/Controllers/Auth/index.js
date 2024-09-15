const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../../Models/User.js');

//REGISTER
const register = async (req, res)=>{
    const {userName, email, password} = req.body;

    try {
        const  checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists!"
            })
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        })
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "User registered successfully"
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }

}
//LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const  checkUser = await User.findOne({email});
        if(!checkUser)
            return res.json({
                success: false,
                message: "User not found! Please register first"
            })  
            const checkPassword = await bcrypt.compare(password, checkUser.password)
            if(!checkPassword)
                return res.json({
                    success: false,
                    message: "Incorrect password! Please try again"
                });

                
            const token = jwt.sign({
                    id: checkUser._id,
                    role : checkUser.role,
                    email : checkUser.email
            }, 'CLIENT_SECRET_KEY',{expiresIn:'60mins'})
            res.cookie('token', token, {httpOnly: true,secure: false}).json({
                success: true,
                message: "Log in successfull",
                user :{
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id 
                }
            })               
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


//LOGOUT


module.exports ={register, login}