import express from "express";
import transformerRouter from "./transformer";
import altModeRouter from "./alt-mode";
import seriesRouter from "./series";
import abilityRouter from "./ability";

const SITE_URL = "http://localhost:1337/api";


const app = express();
const router = express.Router();


router.get("/", (_req, res) => {
  res.send({
    transformers: `${SITE_URL}/transformers/`
  });
});


router.use("/transformers", transformerRouter);

router.use("/altmodes", altModeRouter);

router.use("/series", seriesRouter);

router.use("/abilities", abilityRouter);

app.use("/api", router);

export default app;