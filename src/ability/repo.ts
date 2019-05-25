import { Pool } from "pg";
import { Repo, DbResult } from "../repo/index";
import { Ability } from "./model";

export class AbilityRepo implements Repo<Ability> {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<DbResult<Ability[]>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(
        `SELECT * FROM ability`);
      return { ok: true, result: queryResult.rows.map(row => new Ability(row.name, row.description)) };
    } catch (error) {
      return { ok: false, result: { code: 500, message: `500: ${error}` } };
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<DbResult<Ability>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(
        `SELECT * FROM ability
         WHERE id = $1`, [id]
      );
      const it = queryResult.rows[0];
      return { ok: true, result: new Ability(it.name, it.description) };
    } catch (error) {
      return { ok: false, result: { code: 500, message: `500: ${error}` } };
    } finally {
      client.release();
    }
  }
}