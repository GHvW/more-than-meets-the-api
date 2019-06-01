import { SITE_URL } from "../app";
import { asLinks } from "../util/helpers";

export class Series {
  name: string;
  releaseDate: Date;
  medium: string;
  numberVolumes: number;
  installments: string[];
  created: string;
  url: string;

  constructor(
    name: string, 
    releaseDate: Date, 
    medium: string, 
    numberVolumes: number, 
    installments: number[], 
    created: string, 
    id: number) {

    this.name = name;
    this.releaseDate = releaseDate;
    this.medium = medium;
    this.numberVolumes = numberVolumes;
    this.installments = asLinks(`${SITE_URL}`)(`installments`)(installments);
    this.created = created;
    this.url = `${SITE_URL}/series/${id}`;
  }
}