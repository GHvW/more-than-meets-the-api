import { Request, Response } from "express";
import { Repo, TransformerRepo, AltModeRepo } from "./repo";
import { Pool } from "pg";
import { PgConfig } from "../secrets";

export const getAll = <A>(repo: Repo<A>) => async (_req: Request, res: Response) => {
  const dbQuery = await repo.findAll();
  if (dbQuery.ok) {
    res.status(200).json(dbQuery.result);
  } else {
    res.status(dbQuery.result.code).send(`Server Error: ${dbQuery.result.message}`);
  }
}

export const getById = <A>(repo: Repo<A>) => async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const dbQuery = await repo.findById(id);
  if (dbQuery.ok) {
    res.status(200).json(dbQuery.result);
  } else {
    res.status(dbQuery.result.code).send(`Server Error: ${dbQuery.result.message}`);
  }
}

const pool = new Pool(PgConfig);

const transformerRepo = new TransformerRepo(pool);
const altModeRepo = new AltModeRepo(pool);

export const getAllTransformers = getAll(transformerRepo);
export const getTransformerById = getById(transformerRepo);
export const getAllAltModes = getAll(altModeRepo);
export const getAltModeById = getById(altModeRepo);