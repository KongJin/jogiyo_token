import User from "../models/User";
import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const email = jwt.verify(token, process.env.JWT_ACCESS); //토큰 분해
    const user = await User.findOne(email);
    res.locals.user = user; // 다수의 유저가 로그인 했을때 ?
    next();
  } catch {
    res.json({ message: false });
  }
};
