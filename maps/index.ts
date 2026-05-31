import { dust2Map } from "./dust2";
import { infernoMap } from "./inferno";
import { mirageMap } from "./mirage";
import { nukeMap } from "./nuke";

export const allMaps = [dust2Map, infernoMap, mirageMap, nukeMap];

export const mapsById = allMaps.reduce((acc, map) => {
  acc[map.id] = map;
  return acc;
}, {} as Record<string, typeof allMaps[number]>);

export { dust2Map, infernoMap, mirageMap, nukeMap };
