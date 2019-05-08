import { Request, Response } from "express";
import { Repo, TransformerRepo, VehicleRepo } from "./repo";
import { Pool } from "pg";

export const getAll = <A>(repo: Repo<A>) => async (_req: Request, res: Response) => {
  let dbQuery = await repo.findAll();
  if (dbQuery.ok) {
    res.status(200).json(dbQuery.result);
  } else {
    res.status(dbQuery.result).send(`Server Error`);
  }
}

export const getById = <A>(repo: Repo<A>) => async (req: Request, res: Response) => {
  let dbQuery = await repo.findById(req.params.id);
  if (dbQuery.ok) {
    res.status(200).json(dbQuery.result);
  } else {
    res.status(dbQuery.result).send(`Server Error`);
  }
}

const pool = new Pool();

const transformerRepo = new TransformerRepo(pool);
const vehicleRepo = new VehicleRepo(pool);

export const getAllTransformers = getAll(transformerRepo);
export const getTransformerById = getById(transformerRepo);
export const getAllVehicles = getAll(vehicleRepo);
export const getVehicleById = getById(vehicleRepo);