"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseAutoIncrement = _interopRequireDefault(require("mongoose-auto-increment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  _id: {
    type: Number
  },
  email: {
    type: String
  },
  nickname: {
    type: String
  },
  birth: {
    type: Number
  },
  gender: {
    type: String
  },
  mbti: {
    type: String
  },
  location: {
    type: String
  },
  contents: {
    type: String
  },
  like: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  _id: false,
  versionKey: false
});
userSchema.plugin(_mongooseAutoIncrement.default.plugin, {
  model: "User",
  field: "_id",
  startAt: 1,
  //시작
  increment: 1 // 증가

});

const User = _mongoose.default.model("User", userSchema);

var _default = User;
exports.default = _default;