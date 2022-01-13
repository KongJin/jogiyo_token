import express from "express";
import { kok, LikeList } from "../controllers/likeConstroller";

const likeRouter = express.Router();

likeRouter.post("/kok", kok);

likeRouter.post("/list", LikeList);

export default likeRouter;
