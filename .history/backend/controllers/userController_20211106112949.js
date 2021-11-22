const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

// Register a User
exports.registerUser = catchAsyncErrors( async(req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: "this is a sample id",
            url:"profilepicUrl"
        }
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token,
    });
})

// Login User
exports.loginUser = catchAsyncErrors( async(req, res, next) => {


    const {email, password} = req.body;

    // checking if user has given password and user both
    if(!email || !password) {
        return next(new ErrorHandler("Hãy nhập tài khoản và mật khẩu",400));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next(new ErrorHandler("Không tồn tại tài khoản hoặc mật khẩu",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Không tồn tại tài khoản hoặc mật khẩu",401));
    }

    sendToken(user,200,res)

})