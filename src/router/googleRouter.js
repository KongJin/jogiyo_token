import express from "express";

const googleRotuer = express.Router();

googleRotuer.get("/", getGoogleToken);

export default googleRotuer;
