import express from 'express';
import { getEpisodeDetails } from '../controllers/episodeController.js';

const router = express.Router();

router.get('/episode', getEpisodeDetails);

export default router;