import { makeApiRequest } from "./sourceService.js";

export const fetchAllAnimeData = async (req) => {
  const response = await makeApiRequest(req, "/anime");
  const animeList =
    response.data?.list?.flatMap((item) => item.animeList) || [];
  return animeList;
};

export const fetchOngoingAnime = async (req, page) => {
  return await makeApiRequest(req, "/ongoing", { page });
};

export const fetchAnimeDetails = async (req, slug) => {
  const response = await makeApiRequest(req, `/anime/${slug}`);
  return response.data;
};

export const fetchBatchDetails = async (req, slug) => {
  const response = await makeApiRequest(req, `/batch/${slug}`);
  return response.data;
};
