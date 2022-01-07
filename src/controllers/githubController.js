import axios from "axios";

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

  return res.json({ id, login });
};
