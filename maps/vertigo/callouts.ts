import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site", description: "Sitio principal en el piso superior." },
    { name: "Way", description: "Entrada alternativa a A por el lateral." },
    { name: "Stairs CT", description: "Escaleras de CT con vista dominante." },
    { name: "CT A", description: "Zona de CT con acceso a A site." },
    { name: "Top Stairs", description: "Parte superior de las escaleras." },
    { name: "Ramp A", description: "Rampa de acceso a A site." },
    { name: "Side A", description: "Zona lateral del site A." }
  ],
  siteB: [
    { name: "B Site", description: "Sitio secundario." },
    { name: "Ramp B", description: "Rampa de acceso a B site." },
    { name: "Scaffolding", description: "Andamio con acceso al B site." },
    { name: "Catwalk", description: "Pasarela lateral de B." },
    { name: "Pillar", description: "Pilar central del B site." },
    { name: "CT B", description: "Zona CT con acceso a B." },
    { name: "Elevator", description: "Zona del ascensor en B." }
  ],
  middle: [
    { name: "Mid", description: "Zona central del mapa." },
    { name: "T-Mid", description: "Entrada T al mid." },
    { name: "CT-Mid", description: "Entrada CT al mid." },
    { name: "Boost", description: "Zona de boost en mid." },
    { name: "Connector", description: "Conector entre mid y los sitios." }
  ],
};
