import express from "express";
import {
  getOngoingAnime,
  getAnimeDetails,
  searchAnime,
  getAllAnimeAjax,
  renderAllAnimePage,
  getBatchDetails,
} from "../controllers/animeController.js";

const router = express.Router();

// Source-agnostic routes
router.get("/", getOngoingAnime);
router.get("/all-anime", renderAllAnimePage);
router.get("/search-ajax", searchAnime);
router.get("/all-anime-ajax", getAllAnimeAjax);

// Source-specific routes
router.get("/:source/anime/:slug", getAnimeDetails);
router.get("/:source/batch/:slug", getBatchDetails);

export default router;
