import { fetchGenres, fetchAnimeByGenre } from "../services/genreService.js";
import { SOURCES } from "../services/sourceService.js";

export const getGenres = async (req, res) => {
  const genres = await fetchGenres(req);
  res.render("genres", { genres });
};

export const getAnimeByGenre = async (req, res) => {
  const { slug, source } = req.params;
  const page = req.query.page || 1;
  
  if (source && Object.values(SOURCES).includes(source)) {
    req.cookies.animeSource = source;
  }

  const result = await fetchAnimeByGenre(req, slug, page);
  
  res.render("genre-anime", {
    animes: result.data,
    pagination: result.pagination,
    genreTitle:
      result.data.length > 0
        ? result.data[0].genres.find((g) => g.slug === slug)?.name
        : slug,
  });
};
