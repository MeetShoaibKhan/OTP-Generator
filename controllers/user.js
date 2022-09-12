const models = require("../models");

const User = models.User;
const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, phoneNumber } = req.body;

      await User.create({
        name: name,
        phone_number: phoneNumber,
      });
      res.status(201).json({
        success: true,
        msg: [{ name: name, phoneNumber: phoneNumber }],
      });
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        const extractedErrors = [];
        e.errors.map((err) => extractedErrors.push(err.message));
        return res.status(403).json({
          success: false,
          msg: extractedErrors,
        });
      } else {
        return res.status(400).json({
          success: false,
          msg: [`Could not save ${req.body.name}`],
        });
      }
    }
  },

  gotp: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      const otpExp = moment(new Date()).add(5, "m").toDate();
      const otp = getRandomInt();

      await User.update(
        {
          otp: otp,
          otp_exp: otpExp,
        },
        {
          where: {
            phone_number: phoneNumber,
          },
        }
      );

      const { user } = req;

      res.status(201).json({
        success: true,
        msg: [{ id: user.id, otp: otp }],
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        msg: [`Could not generate otp for ${req.body.phoneNumber}`],
      });
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { userId } = req.params;
      const { otp } = req.query;
      const user = await User.findOne({
        where: {
          id: userId,
          otp: otp,
        },
      });
      if (user === null) {
        return res.status(400).json({
          success: false,
          msg: ["Invalid token"],
        });
      } else {
        const exp = checkExpDate(user.otp_exp);
        if (exp) {
          const { user } = req;
          return res.status(200).json({
            success: true,
            msg: [user],
          });
        } else {
          return res.status(401).json({
            success: false,
            msg: ["Your token has expired"],
          });
        }
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        msg: ["Could not verify token"],
      });
    }
  },
};

const checkExpDate = (expDate) => {
  var expiredDate = moment(expDate).utc();
  const currentTime = moment().utc();

  var diff = expiredDate.diff(currentTime, "minutes");

  if (diff > 0) {
    return true;
  } else if (diff < 0) {
    return false;
  }
};

const getRandomInt = () => {
  min = Math.ceil(1000);
  max = Math.floor(9999);
  return Math.floor(Math.random() * (max - min) + min);
};
