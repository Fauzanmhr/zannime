import ky from 'ky';

export const fetchEpisodeDetails = async (slug) => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/episode/${slug}`).json();
    return response.data;
  } catch (error) {
    console.error('Error fetching episode details:', error);
    return null;
  }
};