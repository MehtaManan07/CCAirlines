const asyncHandler = require("../middlewares/async");
const factory = require("../utils/factoryFunctions");
const User = require("../models/UserModel");

exports.getAllUsers = factory.getAll(User)