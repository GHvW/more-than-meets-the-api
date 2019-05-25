import { SITE_URL } from "../app";
import { asLinks } from "../helpers";

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
    this.alt_modes = asLinks(alt_modes, `${SITE_URL}/altmodes`);
    this.weapons = asLinks(weapons, `${SITE_URL}/weapons`);
    this.abilities = asLinks(abilities, `${SITE_URL}/abilities`);
  }
}