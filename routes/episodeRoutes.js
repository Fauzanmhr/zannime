import express from "express";
import { getEpisode, getServerUrl } from "../controllers/episodeController.js";

const router = express.Router();

router.get("/episode/:slug", getEpisode);
router.get("/server-url", getServerUrl);

export default router;
