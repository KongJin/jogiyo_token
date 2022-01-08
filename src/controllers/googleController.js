export const getToken = async (req, res) => {
  const { code } = req.body;
  //grant_type=authorization_code
  const access_token = await axios.post(
    `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_SECRET}&redirect_uri=http://localhost:3000&`,
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }
  );
  console.log(access_token);
};
