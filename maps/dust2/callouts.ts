import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site", description: "El sitio principal, con múltiples coberturas." },
    { name: "Rampa", description: "Entrada desde CT hacia A." },
    { name: "Coche", description: "Cover central del site A." },
    { name: "Pit", description: "Posición profunda CT-side en A." },
    { name: "Corto", description: "Ruta corta desde mid hacia A." },
    { name: "Catwalk", description: "Paso elevado entre mid y A." },
    { name: "CT Largo", description: "Zona de CT en el pasillo largo." },
    { name: "Puerta A", description: "Entrada principal al site A desde el pasillo largo." }
  ],
  siteB: [
    { name: "B Site", description: "El sitio secundario con cover de auto." },
    { name: "Auto", description: "Posición CT dominante en B." },
    { name: "Puerta B", description: "Entrada principal al B desde upper B." },
    { name: "Tunnels", description: "Ruta T hacia B por debajo." },
    { name: "Lower Tunnels", description: "Parte baja de los tunnels." },
    { name: "Upper B", description: "Parte superior del site B." },
    { name: "Ventana B", description: "Ventana que domina upper B." }
  ],
  middle: [
    { name: "Mid", description: "Zona central del mapa." },
    { name: "Ventanas", description: "Posición elevada con vista a todo el mid." },
    { name: "Catwalk", description: "Pasarela entre mid y A." },
    { name: "Xbox", description: "Caja de cover central en mid." },
    { name: "Doble Puerta", description: "Pasillo con dos puertas hacia B." },
    { name: "Suelo Mid", description: "Zona baja del mid." }
  ],
};
