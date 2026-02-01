import {
  fetchEpisodeDetails,
  fetchServerUrl,
} from "../services/episodeService.js";

export const getEpisode = async (req, res) => {
  const { slug: episodeSlug } = req.params;
  if (!episodeSlug) return res.redirect("/");

  const episode = await fetchEpisodeDetails(episodeSlug);

  if (episode) {
    const normalizedEpisode = { ...episode };

    const downloadUrl = episode.downloadUrl || {};
    if (Array.isArray(downloadUrl.formats) && downloadUrl.formats.length > 0) {
      normalizedEpisode.standardizedDownloads = {
        mode: "formats",
        formats: downloadUrl.formats,
      };
    } else if (
      Array.isArray(downloadUrl.qualities) &&
      downloadUrl.qualities.length > 0
    ) {
      normalizedEpisode.standardizedDownloads = {
        mode: "qualities",
        qualities: downloadUrl.qualities,
      };
    } else {
      normalizedEpisode.standardizedDownloads = null;
    }

    res.render("episode", { episode: normalizedEpisode });
  } else {
    res.status(404).send("Episode not found");
  }
};

export const getServerUrl = async (req, res) => {
  const serverId = req.query.serverId;
  if (!serverId) return res.status(400).send("Server ID is required");

  const url = await fetchServerUrl(serverId);
  if (url) {
    res.json({ url });
  } else {
    res.status(500).send("Error fetching server URL");
  }
};
