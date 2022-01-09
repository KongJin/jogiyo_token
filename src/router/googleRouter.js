import express from "express";
import { getGoogleToken } from "../controllers/googleController";

const googleRotuer = express.Router();

googleRotuer.post("/", getGoogleToken);

export default googleRotuer;
