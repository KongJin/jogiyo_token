import axios from "axios";

export const postKakaoToken = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.json({ message: "not have code" });
  } else {
    const {
      data: { access_token },
    } = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000&code=${code}`
    );
    const {
      data: {
        id,
        properties: { nickname },
      },
    } = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    return res.json({ id, nickname });
  }
};
