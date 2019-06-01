
export function asLinks(siteUrl: string): (resource: string) => (ids: number[]) => string[] {
  return (resource) => (ids) => {
    return ids[0] !== null
    ? ids.map(id => `${siteUrl}/${resource}/${id}`)
    : [];
  }
}
