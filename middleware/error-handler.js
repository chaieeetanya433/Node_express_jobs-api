const {CustomAPIError} = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

    let CustomError = {
        //set defualt
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later',
    }

    // if(err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({msg: err.message})
    // }

    //checking validation error
    if(err.name === 'ValidatorError') {
        console.log(Object.values(err.errors))
        customError.msg = Object.values(err.errors).map((item)=>item.message).join(',')
        customError.StatusCodes = 400
    }

    if(err.code && err.code === 11000) {
        CustomError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400
    }

    //checking for CastError
    if(err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value}`
        customError.statusCode = 400
    }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return res.status(CustomError.StatusCodes).json({ msg: CustomError.msg })
}

module.exports = errorHandlerMiddleware
