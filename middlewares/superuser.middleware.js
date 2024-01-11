const models=require('../models')

module.exports=(req,res)=>{
    if(!req.userId) return res.json({status:"error",error:"AUTH_ERROR"})
    models.User.findById(req.userId)
    .then(gotUser=>{
        if(!gotUser) return res.json({status:"error",error:"NO_USER"})
        if(!gotUser.superuser) return res.json({status:"error",error:"NOT_SUPERUSER"})
        return next();
    })
    .catch(e=>res.json({status:"error",error:e}))
}