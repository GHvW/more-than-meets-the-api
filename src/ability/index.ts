import express from "express";
import { getAllAbilities, getAbilityById } from "../handlers";

const router = express.Router();

router.get("/", getAllAbilities);

router.get("/:id", getAbilityById);

export default router;