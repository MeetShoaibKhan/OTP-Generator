const { body, validationResult, query, param } = require("express-validator");
const models = require("../models");

const User = models.User;
const userValidationRules = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("name", "Kindly provide a name").exists(),
        body("phoneNumber", "Kindly provide a phone number").exists(),
        body("phoneNumber", "Invalid phone number").isInt(),
      ];
    }
    case "generateOtp": {
      return [
        body("phoneNumber", "Kindly provide a phone number").exists(),
        body("phoneNumber", "Invalid phone number").isInt(),
      ];
    }
    case "verifyOTP": {
      return [
        param("userId", "Invalid user id").isInt(),
        query("otp", "Invalid OTP").isInt(),
        query("otp", "OTP must be four digit").isLength({ min: 4, max: 4 }),
      ];
    }
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));
  return res.status(400).json({
    success: false,
    msg: extractedErrors,
  });
};

const phoneNumberExist = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ where: { phone_number: phoneNumber } });
    if (user === null) {
      return res.status(400).json({
        success: false,
        msg: [
          `The phone number ${phoneNumber} does not exist in the database`,
        ],
      });
    } else {
      req.user = user;
      next();
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      msg: ["Could not verify phone number"],
    });
  }
};

const userExist = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });
    if (user === null) {
      return res.status(400).json({
        success: false,
        msg: [`The user id ${userId} does not exist in the database`],
      });
    } else {
      req.user = user;
      next();
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      msg: ["Could not verify otp"],
    });
  }
};

module.exports = { userValidationRules, validate, phoneNumberExist, userExist };
