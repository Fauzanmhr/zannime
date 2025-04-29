import ky from "ky";

export const SOURCES = {
  OTAKUDESU: "otakudesu",
  SAMEHADAKU: "samehadaku",
};

export const DEFAULT_SOURCE = SOURCES.OTAKUDESU;

export const getCurrentSource = (req) =>
  (req.cookies && req.cookies.animeSource) || DEFAULT_SOURCE;

export const makeApiRequest = async (req, endpoint, params = {}) => {
  const source = getCurrentSource(req);
  const url = `${process.env.API_URL}/${source}${endpoint}`;

  try {
    return await ky.get(url, { searchParams: params }).json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return { data: null, pagination: {} };
  }
};
