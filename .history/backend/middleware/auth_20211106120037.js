const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next) => {

    const { token } = req.cookies;
    
    if(!token){
        return next(new ErrorHandler("Cần đăng nhập để truy cập tài nguyên này",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user =  await User.findById(decodedData.id);

    next();
});

exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {

        if(!roles.includes(req.user.roles))
        {
            new ErrorHandler(`Roles: ${req.user.roles}` is  not allowed`);
        };
    }
};