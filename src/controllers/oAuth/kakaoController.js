import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export const kakaoLogin = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.json({ message: "Not Authorized" });
  } else {
    try {
      const {
        data: { access_token },
      } = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000&code=${code}`
      );
      const {
        data: {
          kakao_account: { email },
        },
      } = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      if (!email) {
        return res.json({ message: "Not Authorized" });
      }
      const user = await User.findOne({
        email,
      });

      if (!user) {
        await User.create({
          email,
        });
      }

      console.log(user);
      const token = jwt.sign({ email }, process.env.JWT_ACCESS, { expiresIn: "6h" });

      return res.json({ token });
    } catch {
      return res.json({ message: "Not Authorized" });
    }
  }
};
