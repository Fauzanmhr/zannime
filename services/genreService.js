import { makeApiRequest } from "./sourceService.js";

export const fetchGenres = async () => {
  const response = await makeApiRequest("/genre");
  return response.data || { genreList: [] };
};

export const fetchAnimeByGenre = async (slug, page) => {
  const response = await makeApiRequest(`/genre/${slug}`, { page });
  return {
    data: { animeList: response.data?.animeList || [] },
    pagination: response.pagination || null,
    genreTitle: slug,
  };
};
