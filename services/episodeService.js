import ky from 'ky';

export const fetchEpisodeDetails = async (episodeId) => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/episode/${episodeId}`).json();
    return response.data;
  } catch (error) {
    console.error('Error fetching episode details:', error);
    return null;
  }
};

export const fetchServerUrl = async (serverId) => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/server/${serverId}`).json();
    return response.data.url;
  } catch (error) {
    console.error('Error fetching server URL:', error);
    return null;
  }
};