import ky from 'ky';

export const fetchSchedule = async () => {
  try {
    const response = await ky.get(`${process.env.API_URL}/otakudesu/jadwal`).json();
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    return [];
  }
};