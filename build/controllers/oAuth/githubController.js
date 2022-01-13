"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.githubLogin = void 0;

require("core-js/modules/es.promise.js");

var _axios = _interopRequireDefault(require("axios"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const githubLogin = async (req, res) => {
  const {
    code
  } = req.body;
  const {
    data: {
      access_token
    }
  } = await _axios.default.post("https://github.com/login/oauth/access_token", {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code
  }, {
    headers: {
      accept: "application/json"
    }
  }); // const {
  //   data: { id, login },
  // } = await axios.get(`https://api.github.com/user`, {
  //   headers: { authorization: `token ${access_token}` },
  // });

  const {
    data
  } = await _axios.default.get("https://api.github.com/user/emails", {
    headers: {
      Authorization: "token ".concat(access_token)
    }
  });
  const {
    email
  } = data.find(email => email.primary === true && email.verified === true);
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

exports.githubLogin = githubLogin;