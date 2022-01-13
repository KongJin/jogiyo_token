import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export const githubLogin = async (req, res) => {
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
  // const {
  //   data: { id, login },
  // } = await axios.get(`https://api.github.com/user`, {
  //   headers: { authorization: `token ${access_token}` },
  // });

  const { data } = await axios.get(`https://api.github.com/user/emails`, {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const { email } = data.find((email) => email.primary === true && email.verified === true);

  const user = await User.findOne({
    email,
  });

  if (!user) {
    await User.create({
      email,
    });
  }

  const token = jwt.sign({ email }, process.env.JWT_ACCESS, { expiresIn: "6h" });

  return res.cookie("jwt", token).json({ message: "ok" });
};
