import { Pool } from "pg";
import { Transformer } from "../transformer/model";
import { AltMode } from "../alt-mode/model";

type ServerError = 505;

interface DbOk<A> {
  ok: true;
  result: A;
}

interface DbErr {
  ok: false;
  result: { code: ServerError, message: string };
}

export type DbResult<A> 
  = DbOk<A> 
  | DbErr;

export interface Repo<A> {
  findAll(): Promise<DbResult<A[]>>;
  findById(id: number): Promise<DbResult<A>>;
}

export class TransformerRepo implements Repo<Transformer> {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<DbResult<Transformer[]>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(`SELECT * FROM transformer`);
      return { ok: true, result: queryResult.rows.map(row => new Transformer(row.name, row.faction)) };
    } catch (error) {
      return { ok: false, result: { code: 505, message: `505: ${error}` } };
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
      return { ok: false, result: { code: 505, message: `505: ${error}` } };
    } finally {
      client.release();
    }
  }
}

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
      return { ok: false, result: { code: 505, message: `505: ${error}` } };
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
      return { ok: false, result: { code: 505, message: `505: ${error}` } };
    } finally {
      client.release();
    }
  }
}

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
      return { ok: false, result: { code: 505, message: `505: ${error}` } };
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
      return { ok: false, result: { code: 505, message: `505: ${error}` } };
    } finally {
      client.release();
    }
  }
}