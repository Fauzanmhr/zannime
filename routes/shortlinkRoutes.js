import express from 'express';
import { decodeShortlink } from '../controllers/shortlinkController.js';

const router = express.Router();

router.get('/decode-shortlink', decodeShortlink);

export default router;