import "dotenv/config";
import "regenerator-runtime";
import "./db";
import app from "./app";
import "regenerator-runtime";
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

module.exports = app;
