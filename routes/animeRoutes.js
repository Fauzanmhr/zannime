import express from 'express';
import { getAllAnime, getAnimeDetails, searchAnime, getAllAnimeAjax, renderAllAnimePage } from '../controllers/animeController.js';

const router = express.Router();

router.get('/', getAllAnime);
router.get('/anime/:slug', getAnimeDetails);
router.get('/search-ajax', searchAnime);
router.get('/all-anime-ajax', getAllAnimeAjax);
router.get('/all-anime', renderAllAnimePage);

export default router;