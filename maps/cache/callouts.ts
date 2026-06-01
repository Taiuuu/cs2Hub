import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site", description: "Sitio principal con heaven y main." },
    { name: "Main A", description: "Pasillo principal T hacia A." },
    { name: "Heaven A", description: "Posición elevada CT con vista dominante al site." },
    { name: "Quad", description: "Coberturas cuadradas del site A." },
    { name: "Squeaky Door", description: "Puerta que conecta mid con A." },
    { name: "CT A", description: "Zona CT con acceso a A." },
    { name: "Truck A", description: "Camión de cover en A." },
    { name: "Default Plant", description: "Posición de plante estándar en A." }
  ],
  siteB: [
    { name: "B Site", description: "Sitio secundario con cross." },
    { name: "Cross B", description: "Cruce de acceso al B site." },
    { name: "Headshot", description: "Ángulo de headshot en B." },
    { name: "Close B", description: "Ángulo cercano del B site." },
    { name: "CT B", description: "Zona CT con acceso a B." },
    { name: "Sun Room", description: "Habitación lateral del B site." },
    { name: "Back Alley B", description: "Callejón trasero de B." }
  ],
  middle: [
    { name: "Mid", description: "Zona central del mapa." },
    { name: "Highway", description: "Pasillo central del mid." },
    { name: "Top Mid", description: "Parte superior del mid." },
    { name: "Boost Mid", description: "Posición de boost en mid." },
    { name: "Vending", description: "Zona de máquina de vending en mid." }
  ],
};
