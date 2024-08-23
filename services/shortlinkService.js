import * as https from 'node:https';
import http from 'http';

export const fetchShortlink = (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400) {
        return resolve(response.headers.location);
      }
      resolve(null);
    });

    request.on('error', reject);
    request.end();
  });
};