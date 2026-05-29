import { dust2Map } from './dust2';
import { mirageMap } from './mirage';

export const allMaps = [dust2Map, mirageMap];

export const mapsById = allMaps.reduce((acc, map) => {
  acc[map.id] = map;
  return acc;
}, {} as Record<string, typeof allMaps[number]>);

export { dust2Map, mirageMap };
