"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kakaoLogin = void 0;

require("core-js/modules/es.promise.js");

var _axios = _interopRequireDefault(require("axios"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const kakaoLogin = async (req, res) => {
  const {
    code
  } = req.body;

  if (!code) {
    return res.json({
      message: "Not Authorized"
    });
  } else {
    try {
      const {
        data: {
          access_token
        }
      } = await _axios.default.post("https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=".concat(process.env.KAKAO_CLIENT_ID, "&redirect_uri=http://localhost:3000&code=").concat(code));
      const {
        data: {
          kakao_account: {
            email
          }
        }
      } = await _axios.default.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: "Bearer ".concat(access_token),
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      });

      if (!email) {
        return res.json({
          message: "Not Authorized"
        });
      }

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

      res.cookie("jwt", token, {
        httpOnly: true
      });
      res.json({
        message: "ok"
      });
    } catch (_unused) {
      return res.json({
        message: "Not Authorized"
      });
    }
  }
};

exports.kakaoLogin = kakaoLogin;