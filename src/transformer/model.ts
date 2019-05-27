import { SITE_URL } from "../app";
import { asLinks } from "../helpers";

// const links = asLinks(`${SITE_URL}`);

export class Transformer {
  name: string;
  faction: string;
  created: string;
  alt_modes: string[];
  weapons: string[];
  abilities: string[];

  constructor(
    name: string, 
    faction: string, 
    created: string,
    alt_modes: number[],
    weapons: number[],
    abilities: number[]) {

    this.name = name;
    this.faction = faction;
    this.created = created;
    this.alt_modes = asLinks(`${SITE_URL}`)(`altmodes`)(alt_modes);
    this.weapons = asLinks(`${SITE_URL}`)(`weapons`)(weapons);
    this.abilities = asLinks(`${SITE_URL}`)(`abilities`)(abilities);
  }
}