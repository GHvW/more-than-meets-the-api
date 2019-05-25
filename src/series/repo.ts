import { Pool } from "pg";
import { Repo, DbResult } from "../repo/index";
import { Series } from "./model";


export class SeriesRepo implements Repo<Series> {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<DbResult<Series[]>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(
        `SELECT * FROM series`);
      return { ok: true, result: queryResult.rows.map(row => new Series(row.name, row.release_date, row.number_seasons)) };
    } catch (error) {
      return { ok: false, result: { code: 500, message: `500: ${error}` } };
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<DbResult<Series>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(
        `SELECT * FROM series
         WHERE id = $1`, [id]);
      const it = queryResult.rows[0];
      return { ok: true, result: new Series(it.name, it.release_date, it.number_seasons) };
    } catch (error) {
      return { ok: false, result: { code: 500, message: `500: ${error}` } };
    } finally {
      client.release();
    }
  }
}