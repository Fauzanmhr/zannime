import ky from 'ky';

// Function to fetch all anime data
export const fetchAllAnimeData = async () => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/anime`).json();
    return response.data.list.flatMap(item => item.animeList);
  } catch (error) {
    console.error('Error fetching all anime data:', error);
    return [];
  }
};

// Function to fetch ongoing anime
export const fetchOngoingAnime = async (page) => {
  try {
    return await ky.get(`${process.env.API_URL}/otakudesu/ongoing?page=${page}`).json();
  } catch (error) {
    console.error('Error fetching ongoing anime data:', error);
    return { data: [], pagination: {} };
  }
};

// Function to fetch details of a specific anime by slug
export const fetchAnimeDetails = async (slug) => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/anime/${slug}`).json();
    const anime = response.data;

    // Ensure that batchId (or batch data) is included if batch data exists
    if (anime.batch) {
      anime.batchId = anime.batch.batchId;
    }

    return anime;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

// Function to fetch batch details by slug
export const fetchBatchDetails = async (slug) => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/batch/${slug}`).json();
    return response.data;
  } catch (error) {
    console.error('Error fetching batch details:', error);
    return null;
  }
};
