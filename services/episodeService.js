import { makeApiRequest } from "./sourceService.js";

export const fetchEpisodeDetails = async (req, episodeId) => {
  const response = await makeApiRequest(req, `/episode/${episodeId}`);
  return response.data;
};

export const fetchServerUrl = async (req, serverId) => {
  const response = await makeApiRequest(req, `/server/${serverId}`);
  return response.data?.url || null;
};
