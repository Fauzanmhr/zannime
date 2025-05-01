import { makeApiRequest } from "./sourceService.js";

export const fetchGenres = async (req) => {
  try {
    const response = await makeApiRequest(req, "/genres");
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const fetchAnimeByGenre = async (req, slug, page) => {
  try {
    return await makeApiRequest(req, `/genres/${slug}`, { page });
  } catch (error) {
    console.error("Error fetching anime by genre:", error);
    return { data: [], pagination: {} };
  }
};
