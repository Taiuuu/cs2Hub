import { dust2Map } from "./dust2";
import { infernoMap } from "./inferno";
import { mirageMap } from "./mirage";
import { nukeMap } from "./nuke";
import { ancientMap } from "./ancient";
import { anubisMap } from "./anubis";
import { cacheMap } from "./cache";
import { overpassMap } from "./overpass";
import { vertigoMap } from "./vertigo";
import { trainMap } from "./train";

// Orden: Pool competitivo primero, luego mapas adicionales
export const allMaps = [
  dust2Map,
  mirageMap,
  nukeMap,
  ancientMap,
  infernoMap,
  overpassMap,
  anubisMap,
  cacheMap,
  trainMap,
  vertigoMap,
];

export const mapsById = allMaps.reduce((acc, map) => {
  acc[map.id] = map;
  return acc;
}, {} as Record<string, typeof allMaps[number]>);

export {
  dust2Map,
  infernoMap,
  mirageMap,
  nukeMap,
  ancientMap,
  anubisMap,
  cacheMap,
  overpassMap,
  vertigoMap,
  trainMap,
};
