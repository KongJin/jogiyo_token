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
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use(logger);
app.use("/oauth", oAuthRotuer);

export default app;
