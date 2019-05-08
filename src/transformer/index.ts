import express from "express";
import { getAllTransformers, getTransformerById } from "../handlers";

const router = express.Router();

router.get("/", getAllTransformers);

router.get("/:id", getTransformerById);

export default router;