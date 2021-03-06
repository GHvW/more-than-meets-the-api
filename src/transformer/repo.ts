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
      return { 
        ok: true, 
        result: queryResult.rows.map(row => {
          return new Transformer(
            row.name, 
            row.faction, 
            row.alt_modes, 
            row.associations,
            row.weapons, 
            row.abilities,
            row.appearances,
            row.created,
            row.id)
        }) 
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

  async findById(id: number): Promise<DbResult<Transformer>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(`SELECT * FROM transformer_view WHERE id = $1`, [id]);
      const it = queryResult.rows[0];
      return { 
        ok: true, 
        result: new Transformer(
          it.name, 
          it.faction,
          it.alt_modes,
          it.associations,
          it.weapons,
          it.abilities,
          it.appearances,
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