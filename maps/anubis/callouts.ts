import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site", description: "Sitio principal." },
    { name: "Palace", description: "Ruta principal T hacia A." },
    { name: "Steps A", description: "Escalones de acceso al site A." },
    { name: "CT A", description: "Zona CT con acceso a A." },
    { name: "Arches", description: "Arcos dominantes con vista al site." },
    { name: "Stairs A", description: "Escaleras laterales de A." },
    { name: "Corner A", description: "Esquina del site A." }
  ],
  siteB: [
    { name: "B Site", description: "Sitio secundario." },
    { name: "Water", description: "Zona de agua — ruta principal T hacia B." },
    { name: "Bridge B", description: "Puente de acceso a B." },
    { name: "CT B", description: "Zona CT con acceso a B." },
    { name: "Corner B", description: "Esquina del B site." },
    { name: "Short B", description: "Ruta corta hacia B." },
    { name: "Boat", description: "Cover lateral en B." }
  ],
  middle: [
    { name: "Mid", description: "Zona central del mapa." },
    { name: "Canal", description: "Canal central — lurk key." },
    { name: "Pillar Mid", description: "Pilar central del mid." },
    { name: "Top Mid", description: "Parte superior del mid." },
    { name: "Connector", description: "Conector entre mid y los sitios." }
  ],
};
