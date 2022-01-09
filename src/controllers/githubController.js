import axios from "axios";
import jwt from "jsonwebtoken";

export const postGitToken = async (req, res) => {
  const { code } = req.body;

  const {
    data: { access_token },
  } = await axios.post(
    `https://github.com/login/oauth/access_token`,
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    },
    { headers: { accept: "application/json" } }
  );
  const {
    data: { id, login },
  } = await axios.get(`https://api.github.com/user`, {
    headers: { authorization: `token ${access_token}` },
  });

  const payload = {
    id,
    nickname: login,
    visitTime: Date.now(),
    auth: "github",
  };
  const token = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: "6h" });
  return res.json({ token });
};
