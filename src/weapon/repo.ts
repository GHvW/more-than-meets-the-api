import { Pool } from "pg";
import { Repo, DbResult } from "../repo";
import { Weapon } from "./model";

export class WeaponRepo implements Repo<Weapon> {
  
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<DbResult<Weapon[]>> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<DbResult<Weapon>> {
    throw new Error("Method not implemented.");
  }
}