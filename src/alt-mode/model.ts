import { SITE_URL } from "../app";
import { asLinks } from "../helpers";

export class AltMode {
  type: string;
  subtype: string;
  family: string;
  kind: string;
  transformers: string[];

  constructor(type: string, subtype: string, family: string, kind: string, transformers: number[]) {
    this.type = type;
    this.subtype = subtype;
    this.family = family || "unknown";
    this.kind = kind || "unknown";
    this.transformers = asLinks(`${SITE_URL}`)(`transformers`)(transformers);
  }
}