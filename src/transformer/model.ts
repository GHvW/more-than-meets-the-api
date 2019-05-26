import { asWeaponLinks, asAltModeLinks, asAbilityLinks } from "../helpers";

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
    this.alt_modes = asAltModeLinks(alt_modes);
    this.weapons = asWeaponLinks(weapons);
    this.abilities = asAbilityLinks(abilities);
  }
}