import express from "express";
import { postKakaoToken } from "../controllers/kakaoController";

const kakaoRotuer = express.Router();

kakaoRotuer.post("/", postKakaoToken);

export default kakaoRotuer;
