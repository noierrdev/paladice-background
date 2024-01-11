const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const schema=mongoose.Schema;

const UserSchema=new schema({
    fullname:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    gender:{
        type:String
    },
    birthday:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    avatar:{
        type:Object,
        default:null
    },
    password:{
        type:String
    },
    otp:{
        type:Number,
        default:null
    },
    verified:{
        type:Boolean,
        default:true
    },
    allow:{
        type:Boolean,
        default:true
    },
    phonenumber:{
        type:String,
        default:""
    },
    neonid:{
        type:String
    },
    superuser:{
        type:Boolean
    }
},
{
    timestamps: true,
});

UserSchema.pre('save', function(next){
    const user = this;
    // Hash the password only if it's modified or new
    // if (!user.isModified('password')) return next();
    try {
    // Generate a salt and hash the password
        const salt =bcrypt.genSaltSync(10);
        
        const hashedPassword =bcrypt.hashSync(user.password, salt);
        
        // Set the hashed password back to the user object
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

UserSchema.methods.comparePassword =  function(candidatePassword) {
    try {
      // Use bcrypt to compare the candidate password with the hashed password
      return bcrypt.compareSync(candidatePassword, this.password);
    } catch (error) {
      throw error;
    }
};

const User=mongoose.model('User',UserSchema)
module.exports=User;