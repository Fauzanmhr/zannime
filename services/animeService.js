import ky from 'ky';

export const fetchAllAnimeData = async () => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/anime`).json();
    return response.data.flatMap(item => item.anime);
  } catch (error) {
    console.error('Error fetching all anime data:', error);
    return [];
  }
};

export const fetchOngoingAnime = async (page) => {
  try {
    return await ky.get(`${process.env.API_URL}/otakudesu/ongoing?page=${page}`).json();
  } catch (error) {
    console.error('Error fetching ongoing anime data:', error);
    return { data: [], pagination: {} };
  }
};

export const fetchAnimeDetails = async (slug) => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/anime/${slug}`).json();
    return response.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

// Add other service methods as needed