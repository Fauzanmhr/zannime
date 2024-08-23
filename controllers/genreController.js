import { fetchGenres, fetchAnimeByGenre } from '../services/genreService.js';

export const getGenres = async (req, res) => {
  const genres = await fetchGenres();
  res.render('genres', { genres });
};

export const getAnimeByGenre = async (req, res) => {
  const { slug } = req.params;
  const { page = 1 } = req.query;
  const result = await fetchAnimeByGenre(slug, page);
  res.render('genre-anime', { animes: result.data, pagination: result.pagination, genre: slug });
};