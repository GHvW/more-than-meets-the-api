
export class AltMode {
  altModeType: string;
  subtype: string;
  family: string;
  kind: string;

  constructor(altModeType: string, subtype: string, family: string, kind: string) {
    this.altModeType = altModeType;
    this.subtype = subtype;
    this.family = family;
    this.kind = kind;
  }
}