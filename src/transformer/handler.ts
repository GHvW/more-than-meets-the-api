import { Request, Response } from "express";
import { Repo } from "../repo";

export const getAll = <A>(repo: Repo<A>) => async (_req: Request, res: Response) => {
  let dbQuery = await repo.findAll();
  if (dbQuery.ok) {
    res.status(200).json(dbQuery.result);
  } else {
    res.status(dbQuery.result).send(`Server Error`);
  }
}

export const getById = <A>(repo: Repo<A>) => (id: number) => async (_req: Request, res: Response) => {
  let dbQuery = await repo.findById(id);
  if (dbQuery.ok) {
    res.status(200).json(dbQuery.result);
  } else {
    res.status(dbQuery.result).send(`Server Error`);
  }
}