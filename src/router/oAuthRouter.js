import express from "express";
import { githubLogin } from "../controllers/oAuth/githubController";
import { googleLogin } from "../controllers/oAuth/googleController";
import { kakaoLogin } from "../controllers/oAuth/kakaoController";
import { userInfo } from "../controllers/userInfoController";

const oAuthRotuer = express.Router();

oAuthRotuer.post("/kakao", kakaoLogin);

oAuthRotuer.post("/google", googleLogin);

oAuthRotuer.post("/github", githubLogin);

oAuthRotuer.post("/userInfo", userInfo);
export default oAuthRotuer;
