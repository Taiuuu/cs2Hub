import { MapCallouts } from "@/types";

export const callouts: MapCallouts = {
  siteA: [
    { name: "A Site", description: "El sitio principal con múltiples coberturas." },
    { name: "Ticket Booth", description: "Cover frente al site A." },
    { name: "Jungle", description: "Zona lateral con vista al site." },
    { name: "CT", description: "Spawn CT con acceso al site." },
    { name: "Stairs", description: "Escaleras de acceso al site desde mid." },
    { name: "Ramp", description: "Rampa de acceso T hacia A." },
    { name: "Short", description: "Ruta corta desde T hacia A vía mid." },
    { name: "Triple Box", description: "Coberturas triples en el site." },
    { name: "Tetris", description: "Coberturas en forma de tetris." },
    { name: "Palace", description: "Ruta alternativa T hacia A." }
  ],
  siteB: [
    { name: "B Site", description: "Sitio secundario." },
    { name: "Van", description: "Cover principal del B site." },
    { name: "Bench", description: "Cover lateral del B site." },
    { name: "Apartments", description: "Ruta T hacia B por apps." },
    { name: "Short Apps", description: "Parte corta de los apartments." },
    { name: "Long Apps", description: "Parte larga de los apartments." },
    { name: "B Short", description: "Ruta corta hacia B." },
    { name: "Market", description: "Zona de market con acceso a B." }
  ],
  middle: [
    { name: "Mid", description: "Zona central del mapa." },
    { name: "Window", description: "Ventana dominante del mid." },
    { name: "Short Mid", description: "Parte corta del mid hacia A." },
    { name: "Top Mid", description: "Parte superior del mid." },
    { name: "Connector", description: "Conector entre mid y CT." },
    { name: "Catwalk", description: "Pasarela lateral del mid." },
    { name: "Ladder Room", description: "Habitación con escalera en mid." }
  ],
};
