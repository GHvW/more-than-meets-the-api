
export function asLinks(ids: number[], resource: string): string[] {
  return ids.map(id => `${resource}/${id}`)
}