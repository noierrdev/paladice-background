const models=require('../models')
const jwt=require('jsonwebtoken')
exports.adminSignIn=async (req,res)=>{
    const gotUser=await models.User.findOne({email:req.body.email},{superuser:1,fullname:1,_id:1,email:1,allow:1,verified:1,password:1});
    if(!gotUser) return res.json({status:"error",error:"NO_USER"});
    if(!gotUser.allow) return res.json({status:"error",error:"BLOCKED_USER"});
    if(!gotUser.comparePassword(req.body.password)) return res.json({status:"error",error:"WRONG_PASSWORD"});
    if(!gotUser.verified) return res.json({status:"error",error:"NOT_VERIFIED_USER"});
    if(!gotUser.superuser) return res.json({status:"error",error:"NOT_SUPERUSER"})
    const gotToken=await models.Token.findOne({user:gotUser._id});
    //delete existing token
    if(gotToken) await models.Token.findByIdAndDelete(gotToken._id);
    //prepare for a new token
    const tokenDetail={
        email:gotUser.email
    };
    const tokenEncoded=jwt.sign(tokenDetail,process.env.AUTH_KEY,);
    const newToken=new models.Token({
        user:gotUser._id,
        token:tokenEncoded
    });
    newToken.save()
    .then(()=>res.json({status:"success",data:{
        fullname:gotUser.fullname,
        token:tokenEncoded,
        email:gotUser.email
    }}))
    .catch((e)=>res.json({status:"error",error:e}))
}