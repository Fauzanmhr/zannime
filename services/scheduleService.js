import { makeApiRequest } from "./sourceService.js";

export const fetchSchedule = async (req) => {
  try {
    const response = await makeApiRequest(req, "/schedule");
    return response.data;
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return [];
  }
};
