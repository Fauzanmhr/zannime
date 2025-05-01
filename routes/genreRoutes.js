import express from "express";
import { getGenres, getAnimeByGenre } from "../controllers/genreController.js";

const router = express.Router();

router.get("/genres", getGenres);
router.get("/:source/genres/:slug", getAnimeByGenre);

export default router;
