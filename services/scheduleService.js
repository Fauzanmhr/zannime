import { makeApiRequest } from "./sourceService.js";

export const fetchSchedule = async () => {
  const response = await makeApiRequest("/schedule");
  return {
    days:
      response.data?.scheduleList?.map((day) => ({
        day: day.title,
        animeList: day.animeList || [],
      })) || [],
  };
};
