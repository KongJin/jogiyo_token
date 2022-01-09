import axios from "axios";
import jwt from "jsonwebtoken";

export const postKakaoToken = async (req, res) => {
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
          id,
          kakao_account: {
            profile: { nickname },
            email,
          },
        },
      } = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      const payload = {
        id,
        nickname,
        visitTime: Date.now(),
        auth: "kakao",
      };

      const token = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: "6h" });

      return res.json({ token });
    } catch {
      return res.json({ message: "Not Authorized" });
    }
  }
};
