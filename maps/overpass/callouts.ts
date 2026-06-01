import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site", description: "Sitio principal con múltiples coberturas." },
    { name: "Short", description: "Ruta corta T hacia A por el lateral." },
    { name: "Long", description: "Pasillo largo T hacia A." },
    { name: "Playground", description: "Zona de juego con acceso a A." },
    { name: "Fountain", description: "Fuente central del site A." },
    { name: "Heaven A", description: "Posición elevada con vista al site A." },
    { name: "CT A", description: "Zona CT con acceso a A." },
    { name: "Truck A", description: "Camión de cover en A." }
  ],
  siteB: [
    { name: "B Site", description: "Sitio secundario al final de agua." },
    { name: "Agua", description: "Pasillo de agua — ruta principal T hacia B." },
    { name: "Monster", description: "Zona de monstruo con ángulo dominante." },
    { name: "Pillar B", description: "Pilar central del B site." },
    { name: "CT B", description: "Zona CT con acceso a B." },
    { name: "Bank", description: "Cover lateral del B site." },
    { name: "Corner B", description: "Esquina del B site." }
  ],
  middle: [
    { name: "Mid", description: "Zona central del mapa." },
    { name: "Monster", description: "Conector mid con vista a agua y A." },
    { name: "Top Mid", description: "Parte superior del mid." },
    { name: "Connector", description: "Conector entre mid y A." },
    { name: "Toilets", description: "Baños — zona de lurk clave en mid." }
  ],
};
