
export class AltMode {
  type: string;
  subtype: string;
  family: string;
  kind: string;

  constructor(type: string, subtype: string, family: string, kind: string) {
    this.type = type;
    this.subtype = subtype;
    this.family = family;
    this.kind = kind;
  }
}