import {
  fetchEpisodeDetails,
  fetchServerUrl,
} from "../services/episodeService.js";
import { getCurrentSource, SOURCES } from "../services/sourceService.js";

export const getEpisode = async (req, res) => {
  const { slug: episodeSlug, source } = req.params;
  if (!episodeSlug) return res.redirect("/");

  if (source && Object.values(SOURCES).includes(source)) {
    req.cookies.animeSource = source;
  }

  const episode = await fetchEpisodeDetails(req, episodeSlug);

  if (episode) {
    const currentSource = getCurrentSource(req);
    const normalizedEpisode = { ...episode };

    if (currentSource === SOURCES.SAMEHADAKU && episode.downloadUrl?.formats) {
      normalizedEpisode.standardizedDownloads = {
        isSamehadakuFormat: true,
        formats: episode.downloadUrl.formats,
      };
    } else if (currentSource === SOURCES.OTAKUDESU && episode.downloadUrl?.qualities) {
      normalizedEpisode.standardizedDownloads = {
        isSamehadakuFormat: false,
        qualities: episode.downloadUrl.qualities,
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

  const url = await fetchServerUrl(req, serverId);
  if (url) {
    res.json({ url });
  } else {
    res.status(500).send("Error fetching server URL");
  }
};
