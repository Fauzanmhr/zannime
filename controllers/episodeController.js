import { fetchEpisodeDetails, fetchServerUrl } from '../services/episodeService.js';

export const getEpisodeDetails = async (req, res) => {
  if (!req.query.slug) return res.redirect('/');

  const episode = await fetchEpisodeDetails(req.query.slug);
  if (episode) {
    res.render('episode', { episode });
  } else {
    res.status(500).send('Error fetching episode details');
  }
};

export const getServerUrl = async (req, res) => {
  if (!req.query.serverId) return res.status(400).send('Server ID is required');

  const serverUrl = await fetchServerUrl(req.query.serverId);
  if (serverUrl) {
    res.json({ url: serverUrl });
  } else {
    res.status(500).send('Error fetching server URL');
  }
};