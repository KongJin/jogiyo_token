import express from "express";
import { postToken } from "../controllers/kakaoController";

const kakaoRotuer = express.Router();

kakaoRotuer.post("/", postToken);

export default kakaoRotuer;
