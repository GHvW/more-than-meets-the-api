import { SITE_URL } from "../app";
import { asLinks } from "../util/helpers";

export class Weapon {
  name: string;
  transformers: string[];
  created: string;
  url: string;

  constructor(name: string, transformers: number[], created: string, id: number) {
    this.name = name;
    this.transformers = asLinks(`${SITE_URL}`)(`transformers`)(transformers);
    this.created = created;
    this.url = `${SITE_URL}/weapons/${id}`;
  }
}