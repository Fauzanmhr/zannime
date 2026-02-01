import { makeApiRequest } from "./sourceService.js";

const normalizeSynopsis = (synopsis) => ({
  paragraphs: synopsis?.paragraphList || synopsis?.paragraphs || [],
});

const normalizeOtakudesuDetails = (details) => ({
  ...details,
  synopsis: normalizeSynopsis(details?.synopsis),
  episodeList: details?.episodeList || [],
});

export const fetchAllAnimeData = async () => {
  const response = await makeApiRequest("/anime");
  return response.data?.list?.flatMap((item) => item.animeList) || [];
};

export const fetchOngoingAnime = async (page) => {
  return await makeApiRequest("/ongoing", { page });
};

export const fetchAnimeDetails = async (animeId) => {
  if (!animeId) return null;
  const response = await makeApiRequest(`/anime/${animeId}`);
  const details = response.data?.details;
  return details ? normalizeOtakudesuDetails(details) : null;
};

export const fetchBatchDetails = async (batchId) => {
  if (!batchId) return null;
  const response = await makeApiRequest(`/batch/${batchId}`);
  return response.data?.details || null;
};
