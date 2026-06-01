import { Tactic } from "@/types";

export const tacticDefault1: Tactic = {
  id: "overpass-default-2-1-2",
  name: "Default 2-1-2",
  category: "Default",
  team: "T",
  setup: "2 Agua / 1 Mid / 2 A (short + long)",
  description: "Presión dividida para leer la defensa CT antes de comprometerse.",
  objectivePrincipal: "Obtener información de agua y mid para decidir el sitio.",
  winCondition: "Pick en agua o mid + ejecutar el sitio débil a 22s.",
  minimumUtility: ["Molotov monster", "Smoke top mid", "Flash short"],
  timingWindows: "Decidir sitio entre 18-22s.",
  reactionTree: "Pick en agua -> execute B con ventaja; Pick en mid -> split A short + long; Sin pick -> fake B -> A con rotación rápida.",
  postplant: "Cubrir desde agua y pillar B.",
  roles: [
    {
      name: "water-control",
      label: "Water Control",
      position: "Agua / Monster entry",
      objective: "Ganar espacio en agua negando monster con molotov.",
      utility: "Molotov monster, Flash agua",
      timing: "Avanzar a agua a 8s, molotov a 10s.",
      responsibility: "Controlar agua sin exponerse al AWP de monster.",
      whatToLook: "Monster, CT B, Rotaciones",
      communication: "Agua controlada / Monster activo / CT cayó",
      onTeammateDeath: "Retroceder y esperar el segundo.",
      onNoContact: "Avanzar hasta el site con cautela.",
      postplant: "Cubrir desde agua o pillar B.",
    }
  ],
};