import jwt from "jsonwebtoken";

export const verify = async (req) => {
  const token = req.cookies.jwt;
  try {
    const email = jwt.verify(token, process.env.JWT_ACCESS); //토큰 분해

    return email;
  } catch {
    res.json({ message: false });
  }
};
