const models=require('../models')
const jwt=require('jsonwebtoken')
module.exports=async (req,res,next)=>{
    const token=req.headers.token;
    if(!token) return  next();
    const gotToken=await models.Token.findOne({ token:token});
    if(!gotToken) return next();
    try {
        //decode token
        const tokenDetail=jwt.verify(token,process.env.AUTH_KEY);
        //fetch user data
        const gotUser=await models.User.findById(gotToken.user);
        if(!gotUser.verified) return next();
        if(!gotUser.allow) return next();
        //if lastactive is older than JWT_PERIOD, block!
        if((Date.now()-gotToken.lastactive)>process.env.JWT_PERIOD*1000*60) return next();
        req.userId=gotUser._id;
        req.email=gotUser.email;
        req.fullname=gotUser.fullname;
        //update lastactive as current time
        await models.Token.findByIdAndUpdate(gotToken._id,{
            lastactive:Date.now()
        });
        return next();
    } catch (error) {
        return next()
    }
}