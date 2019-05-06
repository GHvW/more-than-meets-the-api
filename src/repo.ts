import { Pool } from "pg";
import { Transformer } from "./transformer/model";

type ServerError = 505;

interface DbOk<A> {
  ok: true;
  result: A;
}

interface DbErr {
  ok: false;
  result: ServerError;
}

type DbResult<A> 
  = DbOk<A> 
  | DbErr;

export interface Repo<A> {
  findAll(): Promise<DbResult<A[]>>;
  findById(id: number): Promise<DbResult<A>>;
}

// export interface findAll<A> {
//   (): Promise<A[]>
// }

// export interface findById<A> {
//   (id: number): Promise<A | null>
// }


export class PostgresRepo implements Repo<Transformer> {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<DbResult<Transformer[]>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(`SELECT * FROM transformer`);
      return { ok: true, result: queryResult.rows.map(row => new Transformer(row.name, row.allegiance)) };
    } catch (error) {
      return { ok: false, result: 505 };
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<DbResult<Transformer>> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(`SELECT * FROM transformer WHERE id = $1`, [id]);
      return { ok: true, result: new Transformer(result.rows[0], result.rows[1]) };
    } catch (error) {
      return { ok: false, result: 505 };
    } finally {
      client.release();
    }
  }
}
