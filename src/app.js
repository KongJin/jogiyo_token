import express from "express";
import morgan from "morgan";
import cors from "cors";
import kakaoRotuer from "./router/kakaoRouter";
import googleRotuer from "./router/googleRouter";
import githubRotuer from "./router/githubRouter";
const app = express();
const logger = morgan("dev");

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/kakao", kakaoRotuer);
app.use("/google", googleRotuer);
app.use("/github", githubRotuer);
export default app;
