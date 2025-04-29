import { fetchGenres, fetchAnimeByGenre } from "../services/genreService.js";

export const getGenres = async (req, res) => {
  const genres = await fetchGenres(req);
  res.render("genres", { genres });
};

export const getAnimeByGenre = async (req, res) => {
  const { slug } = req.params;
  const page = req.query.page || 1;
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
