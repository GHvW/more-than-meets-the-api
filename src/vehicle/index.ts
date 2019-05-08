import express from "express";
import { getAllVehicles, getVehicleById } from "../handlers";

const router = express.Router();

router.get("/", getAllVehicles);

router.get("/:id", getVehicleById);

module.exports = router;