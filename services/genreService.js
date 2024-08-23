import ky from 'ky';

export const fetchGenres = async () => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/genres`).json();
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export const fetchAnimeByGenre = async (slug, page) => {
  try {
    return await ky.get(`${process.env.API_URL}/otakudesu/genres/${slug}?page=${page}`).json();
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    return { data: [], pagination: {} };
  }
};