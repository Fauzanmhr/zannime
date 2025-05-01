import {
  fetchOngoingAnime,
  fetchAnimeDetails,
  fetchBatchDetails,
} from "../services/animeService.js";
import { SOURCES } from "../services/sourceService.js";

export const getOngoingAnime = async (req, res) => {
  const page = req.query.page || 1;
  const result = await fetchOngoingAnime(req, page);
  res.render("index", { animes: result.data, pagination: result.pagination });
};

export const getAnimeDetails = async (req, res) => {
  const { slug, source } = req.params;

  // If source is provided in URL and is valid, override the cookie
  if (source && Object.values(SOURCES).includes(source)) {
    req.cookies.animeSource = source;
  }

  const anime = await fetchAnimeDetails(req, slug);
  if (anime) {
    res.render("detail", { anime });
  } else {
    res.status(404).send("Anime not found");
  }
};

export const getBatchDetails = async (req, res) => {
  const { slug, source } = req.params;
  if (!slug) return res.redirect("/");

  // If source is provided in URL and is valid, override the cookie
  if (source && Object.values(SOURCES).includes(source)) {
    req.cookies.animeSource = source;
  }

  const batch = await fetchBatchDetails(req, slug);
  if (batch) {
    res.json(batch);
  } else {
    res.status(404).send("Batch not found");
  }
};

export const searchAnime = (req, res) => {
  const { q: query, page = 1, limit = 20 } = req.query;
  if (!query) return res.json({ results: [] });

  const allAnimeData = req.app.locals.currentAnimeData;
  const filteredResults = allAnimeData.filter((anime) =>
    anime.title.toLowerCase().includes(query.toLowerCase()),
  );
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = filteredResults.slice(startIndex, endIndex);

  res.json({
    results,
    currentPage: parseInt(page, 10),
    totalPages: Math.ceil(filteredResults.length / limit),
  });
};

export const getAllAnimeAjax = (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const allAnimeData = req.app.locals.currentAnimeData;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = allAnimeData.slice(startIndex, endIndex);

  res.json({
    results,
    currentPage: parseInt(page, 10),
    totalPages: Math.ceil(allAnimeData.length / limit),
  });
};

export const renderAllAnimePage = (req, res) => {
  const { page = 1 } = req.query;
  const limit = 20;
  const allAnimeData = req.app.locals.currentAnimeData;

  const totalAnimes = allAnimeData.length;
  const totalPages = Math.ceil(totalAnimes / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAnimes = allAnimeData.slice(startIndex, endIndex);

  const pagination = {
    currentPage: page,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };

  res.render("all-anime", { animes: paginatedAnimes, pagination });
};
