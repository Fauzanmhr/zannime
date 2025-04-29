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

router.get("/", getOngoingAnime);
router.get("/anime/:slug", getAnimeDetails);
router.get("/batch/:slug", getBatchDetails);
router.get("/search-ajax", searchAnime);
router.get("/all-anime-ajax", getAllAnimeAjax);
router.get("/all-anime", renderAllAnimePage);

export default router;
