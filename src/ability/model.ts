import { SITE_URL } from "../app";
import { asLinks } from "../helpers";

export class Ability {
  name: string;
  description: string;
  transformers: string[];
  created: string;
  url: string;

  constructor(name: string, description: string, transformers: number[], created: string, id: number) {
    this.name = name;
    this.description = description;
    this.transformers = asLinks(`${SITE_URL}`)(`transformers`)(transformers);
    this.created = created;
    this.url = `${SITE_URL}/abilities/${id}`;
  }
}