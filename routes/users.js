const express = require("express");
const router = express.Router();
const { user } = require("../controllers");
const { userValidationRules, validate, phoneNumberExist, userExist }  = require("../middlewares/validator");

router.get("/", (req, res) => {
  res.send("home user page");
});

router.post("/", userValidationRules('createUser'), validate, user.create);
router.put("/generateOTP", userValidationRules('generateOtp'), validate, phoneNumberExist, user.gotp);
router.get("/:userId/verifyOTP",userValidationRules('verifyOTP'), validate, userExist, user.verifyOTP);

module.exports = router;
