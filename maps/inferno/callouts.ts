import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site", description: "Sitio principal con pit y library." },
    { name: "Pit", description: "Posición profunda T-side en A." },
    { name: "Truck", description: "Cover de entry en A." },
    { name: "Library", description: "Zona lateral con acceso CT." },
    { name: "Short (Arch)", description: "Ruta corta desde mid hacia A." },
    { name: "Palace", description: "Ruta alternativa T hacia A." },
    { name: "CT A", description: "Zona de CT con acceso al site A." },
    { name: "Balcony", description: "Balcón elevado sobre A." }
  ],
  siteB: [
    { name: "B Site", description: "Sitio secundario al final de banana." },
    { name: "Banana", description: "Pasillo principal T hacia B." },
    { name: "Coil", description: "Cover T en el pasillo de banana." },
    { name: "Second Oranges", description: "Posición CT ofensiva en banana." },
    { name: "First Oranges", description: "Primera zona de banana." },
    { name: "CT B", description: "Zona CT con acceso a B." },
    { name: "Car B", description: "Cover lateral en B site." }
  ],
  middle: [
    { name: "Mid", description: "Zona central del mapa." },
    { name: "Arch", description: "Arco de acceso al mid." },
    { name: "Underpass", description: "Túnel bajo el mid." },
    { name: "Top Mid", description: "Zona superior del mid." },
    { name: "CT Mid", description: "Zona CT en el mid." }
  ],
};
