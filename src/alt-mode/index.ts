import express from "express";
import { getAllAltModes, getAltModeById } from "../handlers";

const router = express.Router();

router.get("/", getAllAltModes);

router.get("/:id", getAltModeById);

export default router;