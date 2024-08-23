import { fetchShortlink } from '../services/shortlinkService.js';

export const decodeShortlink = async (req, res) => {
  const { url: shortlink } = req.query;
  if (!shortlink) return res.status(400).send('URL parameter is required');

  try {
    const redirectionUrl = await fetchShortlink(shortlink);
    if (redirectionUrl) return res.send(redirectionUrl);
    res.status(404).send('No redirection found');
  } catch (error) {
    console.error('Error decoding shortlink:', error);
    res.status(500).send('Error decoding shortlink');
  }
};