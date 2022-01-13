"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = void 0;

require("core-js/modules/es.promise.js");

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verify = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const email = _jsonwebtoken.default.verify(token, process.env.JWT_ACCESS); //토큰 분해


    const user = await _User.default.findOne(email);
    res.locals.user = user; // 다수의 유저가 로그인 했을때 ?

    next();
  } catch (_unused) {
    res.json({
      message: false
    });
  }
};

exports.verify = verify;