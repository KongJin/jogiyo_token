import User from "../../models/User";
import jwt from "jsonwebtoken";

export const verify = async (req, res) => {
  const token = req.cookies.jwt;
  try {
    const email = jwt.verify(token, process.env.JWT_ACCESS); //토큰 분해

    const user = await User.findOne(email);
    return user;
  } catch {
    res.json({ message: false });
  }
};
