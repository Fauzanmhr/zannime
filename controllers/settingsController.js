import { SOURCES, DEFAULT_SOURCE } from "../services/sourceService.js";

export const renderSettingsPage = (req, res) => {
  const currentSource = req.cookies.animeSource || DEFAULT_SOURCE;
  res.render("settings", { sources: SOURCES, currentSource });
};

export const updateSettings = (req, res) => {
  const { source } = req.body;

  if (Object.values(SOURCES).includes(source)) {
    res.cookie("animeSource", source, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  res.redirect("/settings");
};
