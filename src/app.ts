// import { Pool } from "pg";
import express from "express";
// const express = require("express");
// import { PgConfig } from "../secrets";

// const pool = new Pool(PgConfig);


const SITE_URL = "http://localhost:1337/api";


const app = express();
const router = express.Router();


router.use("/", (_req, res) => {
  res.send({
    transformers: `${SITE_URL}/transformers/`
  });
});



app.use("/api", router);

module.exports = app;