const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
// const jwt = require('jsonwebtoken')

const register = async(req,res)=>{
    // const {name,email,password} = req.body
    // //if one of the info is missing then we'll throw an error
    // if(!name || !email || !password) {
        //     throw new BadRequestError('Please provide name, email and password!')
        // }
        
    // const {name,email,password} = req.body

    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    // const tempUser = {name,email,password:hashedPassword}

    const user = await User.create({...req.body })

    // const token = jwt.sign({userId:user._id, name:user.name},'jwtSecret',{expiresIn:'30d'})
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({user: {name: user.name }, token })  //201
}

const login = async(req,res)=>{
    //we're checking if proper login credentials are provided or not
    const {email,password} = req.body

    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    
    //if user provides invalid login credentials
    if(!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    //compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name: user.name}, token})
}

module.exports = {
    register,
    login
}

// In the context of the bcrypt library, the function bcrypt.genSalt(10) is used to generate a salt value that can be used for hashing passwords. The salt is a random string of characters that is combined with the password before hashing to add an extra layer of security.

// Here's a breakdown of the function's components:

// bcrypt: This refers to the bcrypt library, which is commonly used for password hashing.
// genSalt(10): This is a function call to genSalt with the parameter 10. The genSalt function is responsible for generating the salt value.