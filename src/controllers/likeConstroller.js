import User from "../../models/User";
import jwt from "jsonwebtoken";

export const kok = async (req, res) => {
  const token = req.cookies.jwt;
  const { like } = req.body;
  try {
    const email = jwt.verify(token, process.env.JWT_ACCESS);

    const user = await User.findOne(email);
    user.like.push(like);
    user.save();
  } catch {
    res.json({ message: false });
  }
};

export const whoILike = async (req, res) => {
  return;
};

export const whoLikeMe = async (req, res) => {
  return;
};
