const mongoose=require('mongoose')

const schema=mongoose.Schema;

const TokenSchema=new schema({
    user:{
        type:schema.ObjectId,
        ref:"User"
    },
    token:{
        type:String
    },
    otp:{
        type:String
    },
    lastactive:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps: true,
});
const Token=mongoose.model('Token',TokenSchema)
module.exports=Token;