const router=require('express').Router();
const authController=require('../controllers/auth.controller')

router.get('/',authController.verify);

router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.get('/signout',authController.signout);
router.use('/verify',authController.verify)
router.post('/forgot-password',authController.forgotPassword)
router.post('/reset-password',authController.resetPassword)
router.post('/verify-otp',authController.verifyOTP);
router.use('/avatars/:email',authController.avatarFromEmail)

module.exports=router;