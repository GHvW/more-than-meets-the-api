import express from "express";
import transformerRouter from "./transformer";
import altModeRouter from "./alt-mode";
import seriesRouter from "./series";
import abilityRouter from "./ability";
import weaponRouter from "./weapon";
import installmentRouter from "./installment";

export const SITE_URL = "http://localhost:1337/api";


const app = express();
const router = express.Router();


router.get("/", (_req, res) => {
  res.send({
    transformers: `${SITE_URL}/transformers/`,
    altmodes: `${SITE_URL}/altmodes/`,
    groups: `${SITE_URL}/groups/`,
    weapons: `${SITE_URL}/weapons/`,
    abilities: `${SITE_URL}/abilities/`,
    planets: `${SITE_URL}/planets/`,
    series: `${SITE_URL}/series/`,
    installments: `${SITE_URL}/installments/`
  });
});


router.use("/transformers", transformerRouter);

router.use("/altmodes", altModeRouter);

// router.use("/groups", groupRouter);

router.use("/weapons", weaponRouter);

router.use("/abilities", abilityRouter);

// router.use("/planets", planetRouter);

router.use("/series", seriesRouter);

router.use("/installments", installmentRouter);

app.use("/api", router);

export default app;