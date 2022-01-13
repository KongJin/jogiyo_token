"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whoLikeMe = exports.whoILike = exports.kok = void 0;

require("core-js/modules/es.promise.js");

var _User = _interopRequireDefault(require("../../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const kok = async (req, res) => {
  const token = req.cookies.jwt;
  const {
    like
  } = req.body;

  try {
    const email = _jsonwebtoken.default.verify(token, process.env.JWT_ACCESS);

    const user = await _User.default.findOne(email);
    user.like.push(like);
    user.save();
  } catch (_unused) {
    res.json({
      message: false
    });
  }
};

exports.kok = kok;

const whoILike = async (req, res) => {
  return;
};

exports.whoILike = whoILike;

const whoLikeMe = async (req, res) => {
  return;
};

exports.whoLikeMe = whoLikeMe;