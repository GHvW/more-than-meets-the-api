import { Pool } from "pg";
import { Repo, DbResult } from "../repo/index";
import { Installment } from "./model";

export class InstallmentRepo implements Repo<Installment> {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<DbResult<Installment[]>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(
        `SELECT * FROM installment_view`);
      return { 
        ok: true, 
        result: queryResult.rows.map(row => new Installment(
          row.name,
          row.installment_order,
          row.series_id,
          row.volume,
          row.transformers,
          row.created,
          row.id)) 
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

  async findById(id: number): Promise<DbResult<Installment>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(
        `SELECT * from installment_view 
         WHERE installment_view.id = $1`, [id]);
      const it = queryResult.rows[0];
      return { 
        ok: true, 
        result: new Installment(
          it.name,
          it.installment_order,
          it.series_id,
          it.volume,
          it.transformers,
          it.created,
          it.id) 
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