import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    email: { type: String },
    nickname: { type: String },
    birth: { type: Number },
    gender: { type: String },
    mbti: { type: String },
    location: { type: String },
    contents: { type: String },
    iLike: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likeMe: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { _id: false, versionKey: false }
);

userSchema.plugin(autoIncrement.plugin, {
  model: "User",
  field: "_id",
  startAt: 1, //시작
  increment: 1, // 증가
});

const User = mongoose.model("User", userSchema);

export default User;
