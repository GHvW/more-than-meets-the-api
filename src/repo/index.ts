import { Pool } from "pg";
import { Transformer } from "../transformer/model";
import { Vehicle } from "../vehicle/model";

type ServerError = 505;

interface DbOk<A> {
  ok: true;
  result: A;
}

interface DbErr {
  ok: false;
  result: ServerError;
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
      const queryResult = await client.query(`SELECT * FROM transformer WHERE id = $1`, [id]);
      const it = queryResult.rows[0];
      return { ok: true, result: new Transformer(it.name, it.allegiance) };
    } catch (error) {
      return { ok: false, result: 505 };
    } finally {
      client.release();
    }
  }


}

export class VehicleRepo implements Repo<Vehicle> {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<DbResult<Vehicle[]>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(`SELECT * FROM vehicle`);
      return { ok: true, result: queryResult.rows.map(row => new Vehicle(row.name, row.vehicleType)) };
    } catch (error) {
      return { ok: false, result: 505 };
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<DbResult<Vehicle>> {
    const client = await this.pool.connect();
    try {
      const queryResult = await client.query(`SELECT * FROM vehicle WHERE id = $1`, [id]);
      const it = queryResult.rows[0];
      return { ok: true, result: new Vehicle(it.name, it.vehicleType) };
    } catch (error) {
      return { ok: false, result: 505 };
    } finally {
      client.release();
    }
  }
}