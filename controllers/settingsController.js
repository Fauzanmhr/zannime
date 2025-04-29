import { SOURCES, DEFAULT_SOURCE } from "../services/sourceService.js";

export const renderSettingsPage = (req, res) => {
  const currentSource = req.cookies.animeSource || DEFAULT_SOURCE;
  res.render("settings", { sources: SOURCES, currentSource });
};

export const updateSettings = (req, res) => {
  const { source } = req.body;

  // Validate source
  if (Object.values(SOURCES).includes(source)) {
    // Set cookie with 1 year expiration
    res.cookie("animeSource", source, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  // Redirect back to settings page
  res.redirect("/settings");
};
