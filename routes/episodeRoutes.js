import express from "express";
import { getEpisode, getServerUrl } from "../controllers/episodeController.js";

const router = express.Router();

// Source-specific route
router.get("/:source/episode/:slug", getEpisode);

// Keep the old route for backward compatibility
router.get("/episode/:slug", getEpisode);

router.get("/server-url", getServerUrl);

export default router;
