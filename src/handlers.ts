import { Request, Response } from "express";
import { Pool } from "pg";
import { PgConfig } from "../secrets";
import { Repo } from "./repo";
import { TransformerRepo } from "./transformer/repo";
import { SeriesRepo } from "./series/repo";
import { AltModeRepo } from "./alt-mode/repo";
import { AbilityRepo } from "./ability/repo";
import { WeaponRepo } from "./weapon/repo";


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
const seriesRepo = new SeriesRepo(pool);
const abilityRepo = new AbilityRepo(pool);
const weaponRepo = new WeaponRepo(pool);

export const getAllTransformers = getAll(transformerRepo);
export const getTransformerById = getById(transformerRepo);
export const getAllAltModes = getAll(altModeRepo);
export const getAltModeById = getById(altModeRepo);
export const getAllSeries = getAll(seriesRepo);
export const getSeriesById = getById(seriesRepo);
export const getAllAbilities = getAll(abilityRepo);
export const getAbilityById = getById(abilityRepo);
export const getAllWeapons = getAll(weaponRepo);
export const getWeaponById = getById(weaponRepo);