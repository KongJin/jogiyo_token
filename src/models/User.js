import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
