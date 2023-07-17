const Job = require('../models/jobs')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors') 


const getAllJobs = async(req,res)=>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length})
    // res.send('get all jobs')
}
const getJob = async(req,res)=>{
    const {user: {userId}, params: {id: jobId}} = req

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId 
    })
    if(!job) {
        throw new NotFoundError(`No job with is ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
    // res.send('get job')
}
const createJob = async(req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
    // res.json(req.body)
}
const updateJob = async(req,res)=>{
    const { 
        body: {company,position},
        user: {userId},
        params: {id: jobId}
    } = req

    if(company === '' || position === '') {
        throw new BadRequestError('company or position feilds cannot be empty')
    }

    const job = await Job.findByIdAndUpdate({ _id:jobId, createdBy:userId}, req.body, {new:true, runValidators:true})

    // res.send('update job')
}
const deleteJob = async(req,res)=>{
    const {
        user: {userId},
        params: {id: jobId}
    } = req

    const job = await Job.findByIdAndDelete({
        _id:jobId,
        createdBy:userId
    })
    if(!job) {
        throw new NotFoundError(`No job with is ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })

    // res.send('delete job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}