import { SITE_URL } from "./app";

export function asLinks(resource: string): (ids: number[]) => string[] {
  return (ids) => {
    return ids[0] !== null
    ? ids.map(id => `${resource}/${id}`)
    : [];
  }
}

export const asAltModeLinks = asLinks(`${SITE_URL}/altmodes`);
export const asTransformerLinks = asLinks(`${SITE_URL}/transformers`);
export const asSeriesLinks = asLinks(`${SITE_URL}/series`);
export const asAbilityLinks = asLinks(`${SITE_URL}/abilities`);
export const asWeaponLinks = asLinks(`${SITE_URL}/weapons`);