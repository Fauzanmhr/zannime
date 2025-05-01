import express from "express";
import { getEpisode, getServerUrl } from "../controllers/episodeController.js";

const router = express.Router();

// Source-specific route only
router.get("/:source/episode/:slug", getEpisode);
router.get("/server-url", getServerUrl);

export default router;
