import { makeApiRequest } from "./sourceService.js";

export const fetchEpisodeDetails = async (req, episodeId) => {
  try {
    const response = await makeApiRequest(req, `/episode/${episodeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching episode details:", error);
    return null;
  }
};

export const fetchServerUrl = async (req, serverId) => {
  try {
    const response = await makeApiRequest(req, `/server/${serverId}`);
    return response.data.url;
  } catch (error) {
    console.error("Error fetching server URL:", error);
    return null;
  }
};
