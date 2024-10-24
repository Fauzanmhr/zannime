import express from 'express';
import { getOngoingAnime, getAnimeDetails, searchAnime, getAllAnimeAjax, renderAllAnimePage, GetBatchDetails} from '../controllers/animeController.js';

const router = express.Router();

router.get('/', getOngoingAnime);
router.get('/anime/:slug', getAnimeDetails);
router.get('/batch/:slug', GetBatchDetails);
router.get('/search-ajax', searchAnime);
router.get('/all-anime-ajax', getAllAnimeAjax);
router.get('/all-anime', renderAllAnimePage);

export default router;