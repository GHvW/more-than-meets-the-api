import { SITE_URL } from "../app";
import { asLinks } from "../util/helpers";

// const links = asLinks(`${SITE_URL}`);

export class Transformer {
  name: string;
  faction: string;
  alt_modes: string[];
  weapons: string[];
  groups: string[];
  abilities: string[];
  appearances: string[];
  created: string;
  url: string;

  constructor(
    name: string, 
    faction: string, 
    alt_modes: number[],
    groups: number[],
    weapons: number[],
    abilities: number[],
    appearances: number[],
    created: string,
    id: number) {
    
    this.name = name;
    this.faction = faction;
    this.alt_modes = asLinks(`${SITE_URL}`)(`altmodes`)(alt_modes);
    this.groups = asLinks(`${SITE_URL}`)(`groups`)(groups);
    this.weapons = asLinks(`${SITE_URL}`)(`weapons`)(weapons);
    this.abilities = asLinks(`${SITE_URL}`)(`abilities`)(abilities);
    this.appearances = asLinks(`${SITE_URL}`)(`installments`)(appearances);
    this.created = created;
    this.url = `${SITE_URL}/transformers/${id}`;
  }
}