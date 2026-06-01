import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site (Upper)", description: "Sitio principal en el piso superior." },
    { name: "Heaven", description: "Posición elevada dominante con vista al site." },
    { name: "Hut", description: "Cover CT en el site A." },
    { name: "Trophy", description: "Ángulo lateral en A site." },
    { name: "Ramp", description: "Entrada principal T hacia A." },
    { name: "Squeaky Door", description: "Puerta que conecta B con A verticalmente." },
    { name: "Lobby", description: "Zona de entrada T antes de ramp." }
  ],
  siteB: [
    { name: "B Site (Lower)", description: "Sitio secundario en el piso inferior." },
    { name: "Hell", description: "Posición debajo de A con acceso a B." },
    { name: "Secret", description: "Ruta alternativa T hacia B por el exterior." },
    { name: "Silo", description: "Cover exterior en yard." },
    { name: "Yard", description: "Zona abierta exterior." },
    { name: "CT B", description: "Spawn CT con acceso a B." },
    { name: "Radio", description: "Zona lateral del B site." }
  ],
  middle: [
    { name: "Outside", description: "Zona exterior del mapa." },
    { name: "Garage", description: "Garaje con acceso a outside y ramp." },
    { name: "Vents", description: "Ventilación que conecta A y B." },
    { name: "Mini", description: "Zona mini entre outside y yard." }
  ],
};
