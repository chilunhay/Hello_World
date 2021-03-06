const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Hãy điền tên của bạn"],
        maxLength: [40, "Tên không được vượt quá 40 kí tự"],
        minLength: [4, "Tên không được ít hơn 4 kí tự"],
    },
    email: {
        type: String,
        required: [true, "Hãy điền email của bạn"],
        unique: true,
        validate: [validator.isEmail, "Hãy điền email hợp lệ"],
    },
    password: {
        type: String,
        required: [true, "Hãy điền mật khẩu"],
        minLength: [8, "Độ dài mật khẩu lớn hơn 8 kí tự"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default:"user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save", async function (next) {

    if(!this.isModified("password")) {
        next();
    }
    
    this.password = await bcrypt.hash(this.password, 10)
});

// JWT Token
userSchema.methods.getJWTToken = function ()
{
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
}

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword)
{

    return await bcrypt.compare(enteredPassword,this.password);
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){

    // Generating 
}

module.exports = mongoose.model("User", userSchema);