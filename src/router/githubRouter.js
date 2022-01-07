import express from "express";
import { postGitToken } from "../controllers/githubController";

const githubRotuer = express.Router();

githubRotuer.post("/", postGitToken);

export default githubRotuer;
