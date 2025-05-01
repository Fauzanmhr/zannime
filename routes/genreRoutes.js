import express from "express";
import { getGenres, getAnimeByGenre } from "../controllers/genreController.js";

const router = express.Router();

// Source-agnostic route - genres list
router.get("/genres", getGenres);

// Source-specific route - anime by genre
router.get("/:source/genres/:slug", getAnimeByGenre);

// Keep the old route for backward compatibility
router.get("/genres/:slug", getAnimeByGenre);

export default router;
