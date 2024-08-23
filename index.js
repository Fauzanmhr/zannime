import express from 'express';
import 'dotenv/config';
import path from 'path';
import {fileURLToPath} from 'url';
import animeRoutes from './routes/animeRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import episodeRoutes from './routes/episodeRoutes.js';
import shortlinkRoutes from './routes/shortlinkRoutes.js';
import {fetchAllAnimeData} from './services/animeService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve Bootstrap files from node_modules
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));

// Fetch all anime data from API and store in memory
const fetchAndStoreAnimeData = async () => {
  app.locals.allAnimeData = await fetchAllAnimeData();
};

// Fetch data on server start
(async () => {
  await fetchAndStoreAnimeData();
})();

// Periodically update all anime data (every 60 minutes)
setInterval(fetchAndStoreAnimeData, 60 * 60 * 1000);

// Use routes
app.use('/', animeRoutes);
app.use('/', genreRoutes);
app.use('/', episodeRoutes);
app.use('/', shortlinkRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});