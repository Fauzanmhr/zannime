import { fetchEpisodeDetails } from '../services/episodeService.js';

export const getEpisodeDetails = async (req, res) => {
  if (!req.query.slug) return res.redirect('/');

  const episode = await fetchEpisodeDetails(req.query.slug);
  if (episode) {
    res.render('episode', { episode });
  } else {
    res.status(500).send('Error fetching episode details');
  }
};