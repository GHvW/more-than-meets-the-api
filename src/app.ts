import express from "express";
import transformerRouter from "./transformer";
import altModeRouter from "./alt-mode";
import seriesRouter from "./series";
import abilityRouter from "./ability";
import weaponRouter from "./weapon";

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
    series: `${SITE_URL}/series/`
  });
});


router.use("/transformers", transformerRouter);

router.use("/altmodes", altModeRouter);

router.use("/series", seriesRouter);

router.use("/abilities", abilityRouter);

router.use("/weapons", weaponRouter);

app.use("/api", router);

export default app;