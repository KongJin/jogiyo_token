import express from "express";
import morgan from "morgan";
import cors from "cors";

import oAuthRotuer from "./router/oAuthRouter";
import cookieParser from "cookie-parser";

const app = express();
const logger = morgan("dev");
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    cookie: {
      maxAge: 24 * 6 * 60 * 10000,
      httpOnly: false,
      secure: true,
      sameSite: "None",
    },
  })
);
app.use(logger);
app.use("/oauth", oAuthRotuer);

export default app;
