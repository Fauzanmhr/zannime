import express from "express";
import {
  renderSettingsPage,
  updateSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/settings", renderSettingsPage);
router.post("/settings", updateSettings);

export default router;
