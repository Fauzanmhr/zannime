import { makeApiRequest } from "./sourceService.js";

export const fetchSchedule = async (req) => {
  const response = await makeApiRequest(req, "/schedule");
  return response.data || [];
};
