const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../middlewares/ErrorResponse");
const User = require("../models/UserModel");

exports.getAllUsers = asyncHandler(async(req,res,next) => {
    res.status(200).json(res.advancedResults);
})