import express from 'express';
import { getEpisodeDetails, getServerUrl } from '../controllers/episodeController.js';

const router = express.Router();

router.get('/episode', getEpisodeDetails);
router.get('/server-url', getServerUrl);

export default router;