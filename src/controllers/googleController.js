import axios from "axios";
import jwt from "jsonwebtoken";

export const getGoogleToken = async (req, res) => {
  const { code } = req.body;

  const {
    data: { access_token },
  } = await axios.post(
    `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_SECRET}&redirect_uri=http://localhost:3000&grant_type=authorization_code`,
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }
  );

  const {
    data: { id, email },
  } = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`, {
    headers: {
      authorization: `token ${access_token}`,
      accept: "application/json",
    },
  });

  const payload = {
    id,
    nickname: email.slice(0, email.indexOf("@")),
    visitTime: Date.now(),
    auth: "google",
  };

  const token = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: "6h" });
  return res.json({ token });
};
