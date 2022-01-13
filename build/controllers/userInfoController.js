"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userInfo = void 0;

require("core-js/modules/es.promise.js");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import axios from "axios";
const userInfo = async (req, res) => {
  const {
    nickname,
    birth,
    gender,
    mbti,
    location,
    contents
  } = req.body;
  const {
    user: {
      email
    }
  } = res.locals;

  if (!nickname || !birth || !gender || !mbti || !location || !contents) {
    res.status(400).json({
      message: "정보를 모두 입력해주세요."
    });
  } else {
    const updateUerInfo = await _User.default.findOneAndUpdate({
      email
    }, {
      nickname,
      birth,
      gender,
      mbti,
      location,
      contents
    }, {
      multi: true,
      new: true
    });
    console.log(updateUerInfo);

    if (!updateUerInfo) {
      res.status(400).json({
        message: "회원 정보 수정 오류"
      });
    } else {
      res.status(200).json({
        message: "정보 업데이트 성공",
        updateUerInfo
      });
    }
  }
};

exports.userInfo = userInfo;