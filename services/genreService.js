import { makeApiRequest } from "./sourceService.js";

export const fetchGenres = async (req) => {
  const response = await makeApiRequest(req, "/genres");
  return response.data || [];
};

export const fetchAnimeByGenre = async (req, slug, page) => {
  return await makeApiRequest(req, `/genres/${slug}`, { page });
};
