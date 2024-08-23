import { fetchOngoingAnime, fetchAnimeDetails } from '../services/animeService.js';

export const getAllAnime = async (req, res) => {
  const page = req.query.page || 1;
  const result = await fetchOngoingAnime(page);
  res.render('index', { animes: result.data, pagination: result.pagination });
};

export const getAnimeDetails = async (req, res) => {
  const anime = await fetchAnimeDetails(req.params.slug);
  if (anime) {
    res.render('detail', { anime });
  } else {
    res.status(500).send('Error fetching anime details');
  }
};

export const searchAnime = (req, res) => {
  const { q: query, page = 1, limit = 20 } = req.query;
  if (!query) return res.json({ results: [] });

  const allAnimeData = req.app.locals.allAnimeData;
  const filteredResults = allAnimeData.filter(anime => anime.judul.toLowerCase().includes(query.toLowerCase()));
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = filteredResults.slice(startIndex, endIndex);

  res.json({
    results,
    currentPage: parseInt(page, 10),
    totalPages: Math.ceil(filteredResults.length / limit)
  });
};

export const getAllAnimeAjax = (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const allAnimeData = req.app.locals.allAnimeData;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = allAnimeData.slice(startIndex, endIndex);

  res.json({
    results,
    currentPage: parseInt(page, 10),
    totalPages: Math.ceil(allAnimeData.length / limit)
  });
};

export const renderAllAnimePage = (req, res) => {
  const { page = 1 } = req.query;
  const limit = 20;
  const allAnimeData = req.app.locals.allAnimeData;

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
};