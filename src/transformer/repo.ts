import { Pool } from "pg";
import { Repo, DbResult } from "../repo/index";
import { Transformer } from "./model";

export class TransformerRepo implements Repo<Transformer> {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<DbResult<Transformer[]>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(`SELECT * FROM transformer_view`);
      return { ok: true, result: queryResult.rows.map(row => new Transformer(row.name, row.faction)) };
    } catch (error) {
      return { ok: false, result: { code: 500, message: `500: ${error}` } };
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<DbResult<Transformer>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(`SELECT * FROM transformer WHERE id = $1`, [id]);
      const it = queryResult.rows[0];
      return { ok: true, result: new Transformer(it.name, it.faction) };
    } catch (error) {
      return { ok: false, result: { code: 500, message: `500: ${error}` } };
    } finally {
      client.release();
    }
  }
}