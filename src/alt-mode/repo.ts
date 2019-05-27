import { Pool } from "pg";
import { Repo, DbResult } from "../repo/index";
import { AltMode } from "./model";

export class AltModeRepo implements Repo<AltMode> {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<DbResult<AltMode[]>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(
        `SELECT * FROM alt_mode_view`);
      return { 
        ok: true, 
        result: queryResult.rows.map(row => new AltMode(
          row.type, 
          row.subtype, 
          row.family, 
          row.kind,
          row.transformers,
          row.id,
          row.created)) 
      };
    } catch (error) {
      return { 
        ok: false, 
        result: { code: 500, message: `500: ${error}` } 
      };
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<DbResult<AltMode>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(
        `SELECT * from alt_mode_view 
         WHERE alt_mode_view.id = $1`, [id]);
      const it = queryResult.rows[0];
      return { 
        ok: true, 
        result: new AltMode(
          it.type, 
          it.subtype, 
          it.family, 
          it.kind,
          it.transformers,
          it.id,
          it.created) 
        };
    } catch (error) {
      return { 
        ok: false, 
        result: { code: 500, message: `500: ${error}` } 
      };
    } finally {
      client.release();
    }
  }
}