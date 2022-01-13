"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _githubController = require("../controllers/oAuth/githubController");

var _googleController = require("../controllers/oAuth/googleController");

var _kakaoController = require("../controllers/oAuth/kakaoController");

var _userInfoController = require("../controllers/userInfoController");

var _verify = require("../JWT/verify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const oAuthRotuer = _express.default.Router();

oAuthRotuer.post("/kakao", _kakaoController.kakaoLogin);
oAuthRotuer.post("/google", _googleController.googleLogin);
oAuthRotuer.post("/github", _githubController.githubLogin);
oAuthRotuer.post("/userInfo", _verify.verify, _userInfoController.userInfo);
var _default = oAuthRotuer;
exports.default = _default;