import express from "express";
import { getAllInstallments, getInstallmentById } from "../handlers";

const router = express.Router();

router.get("/", getAllInstallments);

router.get("/:id", getInstallmentById);

export default router;