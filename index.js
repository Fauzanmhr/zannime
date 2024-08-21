import ky from 'ky';
import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

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
    const animeData = response.data;
    allAnimeData = animeData.flatMap(item => item.anime);
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
    const { data, pagination } = response;
    res.render('index', { animes: data, pagination });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Search route with pagination
app.get('/search', (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) || 1;
  const limit = 20; // Number of results per page

  if (!query) {
    return res.redirect('/');
  }

  const filteredResults = allAnimeData.filter(anime =>
    anime.judul.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = filteredResults.length;
  const totalPages = Math.ceil(totalResults / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  const pagination = {
    currentPage: page,
    totalPages: totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
  };

  res.render('search', { results: paginatedResults, query, pagination });
});

// Anime detail route
app.get('/anime/:slug', async (req, res) => {
  const slug = req.params.slug;
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/anime/${slug}`).json();
    const anime = response.data;
    res.render('detail', { anime });
  } catch (error) {
    console.error('Error fetching anime details:', error);
    res.status(500).send('Error fetching anime details');
  }
});

// Episode detail route
app.get('/episode', async (req, res) => {
  const slug = req.query.slug;
  if (!slug) {
    return res.redirect('/');
  }
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/episode/${slug}`).json();
    const episode = response.data;
    res.render('episode', { episode });
  } catch (error) {
    console.error('Error fetching episode details:', error);
    res.status(500).send('Error fetching episode details');
  }
});

// All anime route
app.get('/all-anime', async (req, res) => {
  const page = req.query.page || 1;
  const limit = 20; // Number of anime per page

  const totalAnimes = allAnimeData.length;
  const totalPages = Math.ceil(totalAnimes / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAnimes = allAnimeData.slice(startIndex, endIndex);

  const pagination = {
    currentPage: page,
    totalPages: totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
  };

  res.render('all-anime', { animes: paginatedAnimes, pagination });
});

// Genres route
app.get('/genres', async (req, res) => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/genres`).json();
    const genres = response.data;
    res.render('genres', { genres });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).send('Error fetching genres');
  }
});

// Anime by genre route
app.get('/genres/:slug', async (req, res) => {
  const slug = req.params.slug;
  const page = req.query.page || 1;

  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/genres/${slug}?page=${page}`).json();
    const { data, pagination } = response;
    res.render('genre-anime', { animes: data, pagination, genre: slug });
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    res.status(500).send('Error fetching anime by genre');
  }
});

// Route to decode shortlink
app.get('/decode-shortlink', async (req, res) => {
  const shortlink = req.query.url;
  try {
    const response = await ky.get(shortlink, { redirect: 'follow' });
    res.send(response.url);
  } catch (error) {
    res.status(500).send('Error decoding shortlink');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});