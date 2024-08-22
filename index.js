import ky from 'ky';
import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import * as https from "node:https";
import http from "http";

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

let allAnimeData = [];

// Fetch all anime data from API and store in memory
const fetchAllAnimeData = async () => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/anime`).json();
    allAnimeData = response.data.flatMap(item => item.anime);
  } catch (error) {
    console.error('Error fetching all anime data:', error);
  }
};

// Fetch data on server start
fetchAllAnimeData();

// Home route to list content with pagination
app.get('/', async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/ongoing?page=${page}`).json();
    res.render('index', { animes: response.data, pagination: response.pagination });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Search route with pagination
app.get('/search', (req, res) => {
  const { q: query, page = 1 } = req.query;
  if (!query) return res.redirect('/');

  const limit = 20;
  const filteredResults = allAnimeData.filter(anime => anime.judul.toLowerCase().includes(query.toLowerCase()));
  const totalResults = filteredResults.length;
  const totalPages = Math.ceil(totalResults / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  const pagination = {
    currentPage: page,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
  };

  res.render('search', { results: paginatedResults, query, pagination });
});

// Anime detail route
app.get('/anime/:slug', async (req, res) => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/anime/${req.params.slug}`).json();
    res.render('detail', { anime: response.data });
  } catch (error) {
    console.error('Error fetching anime details:', error);
    res.status(500).send('Error fetching anime details');
  }
});

// Episode detail route
app.get('/episode', async (req, res) => {
  if (!req.query.slug) return res.redirect('/');

  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/episode/${req.query.slug}`).json();
    res.render('episode', { episode: response.data });
  } catch (error) {
    console.error('Error fetching episode details:', error);
    res.status(500).send('Error fetching episode details');
  }
});

// All anime route
app.get('/all-anime', (req, res) => {
  const { page = 1 } = req.query;
  const limit = 20;

  const totalAnimes = allAnimeData.length;
  const totalPages = Math.ceil(totalAnimes / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAnimes = allAnimeData.slice(startIndex, endIndex);

  const pagination = {
    currentPage: page,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
  };

  res.render('all-anime', { animes: paginatedAnimes, pagination });
});

// Genres route
app.get('/genres', async (req, res) => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/genres`).json();
    res.render('genres', { genres: response.data });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).send('Error fetching genres');
  }
});

// Anime by genre route
app.get('/genres/:slug', async (req, res) => {
  const { slug } = req.params;
  const { page = 1 } = req.query;

  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/genres/${slug}?page=${page}`).json();
    res.render('genre-anime', { animes: response.data, pagination: response.pagination, genre: slug });
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    res.status(500).send('Error fetching anime by genre');
  }
});

// Function to fetch the shortlink and capture the initial redirection URL
const fetchShortlink = (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400) {
        return resolve(response.headers.location);
      }
      resolve(null);
    });

    request.on('error', reject);
    request.end();
  });
};

// Route to decode shortlink
app.get('/decode-shortlink', async (req, res) => {
  const { url: shortlink } = req.query;
  if (!shortlink) return res.status(400).send('URL parameter is required');

  try {
    const redirectionUrl = await fetchShortlink(shortlink);
    if (redirectionUrl) return res.send(redirectionUrl);
    res.status(404).send('No redirection found');
  } catch (error) {
    console.error('Error decoding shortlink:', error);
    res.status(500).send('Error decoding shortlink');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});