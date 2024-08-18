const { RegisterUserService } = require("../services/UserService.js");


//! User Control
exports.RegisterUser = async (req, res) => {
  let result = await RegisterUserService(req);
  return res.status(200).json(result);
};
