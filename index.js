import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import {
  animeRoutes,
  genreRoutes,
  episodeRoutes,
  scheduleRoutes,
  settingsRoutes,
} from "./routes/Routes.js";
import { fetchAllAnimeData } from "./services/animeService.js";
import { getCurrentSource, SOURCES } from "./services/sourceService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")),
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")),
);

app.locals.sourceData = {
  [SOURCES.OTAKUDESU]: [],
  [SOURCES.SAMEHADAKU]: [],
};

app.use((req, res, next) => {
  const source = getCurrentSource(req);
  res.locals.currentSource = source;
  req.app.locals.currentAnimeData = app.locals.sourceData[source] || [];
  next();
});

const fetchAllSourcesData = async () => {
  const otakudesuReq = { cookies: { animeSource: SOURCES.OTAKUDESU } };
  const samehadakuReq = { cookies: { animeSource: SOURCES.SAMEHADAKU } };

  const [otakudesuData, samehadakuData] = await Promise.all([
    fetchAllAnimeData(otakudesuReq),
    fetchAllAnimeData(samehadakuReq),
  ]);

  app.locals.sourceData[SOURCES.OTAKUDESU] = otakudesuData;
  app.locals.sourceData[SOURCES.SAMEHADAKU] = samehadakuData;

  console.log(
    `Data loaded: ${otakudesuData.length} anime from ${SOURCES.OTAKUDESU}, ${samehadakuData.length} from ${SOURCES.SAMEHADAKU}`,
  );
};

(async () => await fetchAllSourcesData())();

app.use(
  "/",
  animeRoutes,
  genreRoutes,
  episodeRoutes,
  scheduleRoutes,
  settingsRoutes,
);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);

setInterval(fetchAllSourcesData, 60 * 60 * 1000);
