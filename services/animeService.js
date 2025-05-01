import { makeApiRequest } from "./sourceService.js";

export const fetchAllAnimeData = async (req) => {
  try {
    const response = await makeApiRequest(req, "/anime");
    const animeList =
      response.data?.list?.flatMap((item) => item.animeList) || [];
    return animeList;
  } catch (error) {
    console.error("Error fetching all anime data:", error);
    return [];
  }
};

export const fetchOngoingAnime = async (req, page) => {
  try {
    return await makeApiRequest(req, "/ongoing", { page });
  } catch (error) {
    console.error("Error fetching ongoing anime data:", error);
    return { data: [], pagination: {} };
  }
};

export const fetchAnimeDetails = async (req, slug) => {
  try {
    const response = await makeApiRequest(req, `/anime/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return null;
  }
};

export const fetchBatchDetails = async (req, slug) => {
  try {
    const response = await makeApiRequest(req, `/batch/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching batch details:", error);
    return null;
  }
};
