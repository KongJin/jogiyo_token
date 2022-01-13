import express from "express";
import morgan from "morgan";
import cors from "cors";

import oAuthRotuer from "./router/oAuthRouter";
const app = express();
const logger = morgan("dev");

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/oauth", oAuthRotuer);
app.use("/like");

export default app;
