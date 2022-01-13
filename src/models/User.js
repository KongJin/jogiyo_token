import mongoose from "mongoose";

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
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { _id: false, versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
