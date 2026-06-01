import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site", description: "Sitio principal entre los vagones." },
    { name: "Upper A", description: "Parte superior del site A con vagones grandes." },
    { name: "Lower A", description: "Parte inferior del site A." },
    { name: "Ivy", description: "Zona de hiedra — ruta principal T hacia A." },
    { name: "E-box", description: "Caja eléctrica — cover clave en A." },
    { name: "Popdog", description: "Ruta alternativa T hacia A desde el lateral." },
    { name: "CT A", description: "Zona CT con acceso a A." },
    { name: "Bomb Train", description: "Vagón de la bomba en A." },
    { name: "Ladder Room", description: "Sala con escalera de acceso a A." }
  ],
  siteB: [
    { name: "B Site", description: "Sitio secundario más compacto." },
    { name: "Upper B", description: "Parte superior del B site." },
    { name: "Lower B", description: "Parte inferior del B site." },
    { name: "T-con", description: "Conector T hacia B." },
    { name: "Hay", description: "Zona de heno con cover en B." },
    { name: "CT B", description: "Zona CT con acceso a B." },
    { name: "Olof Boost", description: "Posición de boost clásica en B." }
  ],
  middle: [
    { name: "Mid", description: "Zona central entre los dos sitios." },
    { name: "Connector", description: "Conector central del mapa." },
    { name: "Yard", description: "Patio exterior entre los sitios." },
    { name: "Catwalk", description: "Pasarela de acceso entre A y mid." }
  ],
};
