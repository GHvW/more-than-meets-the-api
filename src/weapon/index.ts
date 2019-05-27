import express from "express";
import { getAllWeapons, getWeaponById } from "../handlers";

const router = express.Router();

router.get("/", getAllWeapons);

router.get("/:id", getWeaponById);

export default router;