"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleLogin = void 0;

require("core-js/modules/es.promise.js");

var _axios = _interopRequireDefault(require("axios"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const googleLogin = async (req, res) => {
  const {
    code
  } = req.body;
  const {
    data: {
      access_token
    }
  } = await _axios.default.post("https://oauth2.googleapis.com/token?code=".concat(code, "&client_id=").concat(process.env.GOOGLE_CLIENT_ID, "&client_secret=").concat(process.env.GOOGLE_SECRET, "&redirect_uri=http://localhost:3000&grant_type=authorization_code"), {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  });
  const {
    data: {
      email
    }
  } = await _axios.default.get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=".concat(access_token), {
    headers: {
      authorization: "token ".concat(access_token),
      accept: "application/json"
    }
  });
  const user = await _User.default.findOne({
    email
  });

  if (!user) {
    await _User.default.create({
      email
    });
  }

  const token = _jsonwebtoken.default.sign({
    email
  }, process.env.JWT_ACCESS, {
    expiresIn: "6h"
  });

  return res.cookie("jwt", token).json({
    message: "ok"
  });
};

exports.googleLogin = googleLogin;