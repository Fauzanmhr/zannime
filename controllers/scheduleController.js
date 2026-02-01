import { fetchSchedule } from "../services/scheduleService.js";

export const getSchedule = async (req, res) => {
  const schedule = await fetchSchedule();
  res.render("schedule", { schedule });
};
