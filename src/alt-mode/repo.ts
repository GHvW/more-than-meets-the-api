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
        `SELECT alt_mode_general.type, alt_mode_general.subtype, alt_mode.family, alt_mode.kind FROM alt_mode
         JOIN alt_mode_general ON 
         alt_mode_general.id = alt_mode.alt_mode_general_id`);
      return { ok: true, result: queryResult.rows.map(row => new AltMode(row.type, row.subtype, row.family, row.kind)) };
    } catch (error) {
      return { ok: false, result: { code: 500, message: `500: ${error}` } };
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<DbResult<AltMode>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(
        `SELECT alt_mode_general.type, alt_mode_general.subtype, alt_mode.family, alt_mode.kind FROM alt_mode 
         JOIN alt_mode_general ON
         alt_mode_general.id = alt_mode.alt_mode_general_id 
         WHERE alt_mode.id = $1`, [id]);
      const it = queryResult.rows[0];
      return { ok: true, result: new AltMode(it.type, it.subtype, it.family, it.kind) };
    } catch (error) {
      return { ok: false, result: { code: 500, message: `500: ${error}` } };
    } finally {
      client.release();
    }
  }
}