const router=require('express').Router()

router.get('/',(req,res)=> res.json({status:"success"}));
router.use('/auth',require('./auth.router'));

module.exports=router;