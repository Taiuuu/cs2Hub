import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site", description: "Sitio principal con múltiples ángulos." },
    { name: "Main", description: "Pasillo principal T hacia A." },
    { name: "Donut", description: "Estructura circular central del site A." },
    { name: "Elbow", description: "Codo del pasillo de main." },
    { name: "House CT A", description: "Casa CT con acceso al site A." },
    { name: "Temple", description: "Templo lateral con acceso al site." },
    { name: "Ruins", description: "Ruinas con cover en A." },
    { name: "Corner A", description: "Esquina del site A." },
    { name: "Steps", description: "Escalones de acceso al site." }
  ],
  siteB: [
    { name: "B Site", description: "Sitio secundario." },
    { name: "Pit B", description: "Foso profundo en B site." },
    { name: "CT B", description: "Zona CT con acceso a B." },
    { name: "Open B", description: "Zona abierta de acceso a B." },
    { name: "Cave", description: "Cueva de acceso al B site." },
    { name: "Ladder", description: "Escalera lateral en B." },
    { name: "Side B", description: "Zona lateral del B site." }
  ],
  middle: [
    { name: "Mid", description: "Zona central del mapa." },
    { name: "Mid Top", description: "Parte superior del mid." },
    { name: "Mid CT", description: "Zona CT del mid." },
    { name: "River", description: "Río central del mid." },
    { name: "Bridge", description: "Puente del mid." }
  ],
};
