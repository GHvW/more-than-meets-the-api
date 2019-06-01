import { SITE_URL } from "../app";
import { asLinks } from "../util/helpers";

export class Installment {
  name: string;
  installmentOrder: number;
  series: string;
  volume: number;
  transformers: string[];
  created: string;
  url: string;

  constructor(
    name: string,
    installmentOrder: number,
    seriesId: string,
    volume: number,
    transformers: number[],
    created: string,
    id: number
  ) {
    this.name = name;
    this.installmentOrder = installmentOrder;
    this.series = `${SITE_URL}/series/${seriesId}`;
    this.volume = volume;
    this.transformers = asLinks(`${SITE_URL}`)(`transformers`)(transformers);
    this.created = created;
    this.url = `${SITE_URL}/installments/${id}`;
  }
}