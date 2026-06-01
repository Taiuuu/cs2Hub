import { Tactic } from "@/types";

export const tacticDefault1: Tactic = {
  id: "inferno-default-banana-control",
  name: "Default Banana Control",
  category: "Default",
  team: "T",
  setup: "2 Banana / 1 Mid / 2 A (palace + arch)",
  description: "Presión en banana para leer la respuesta CT y decidir el sitio.",
  objectivePrincipal: "Controlar banana y obtener información de mid para decidir el sitio.",
  winCondition: "Pick en banana o mid + ejecutar el sitio débil a 22s.",
  minimumUtility: ["Molotov second oranges", "Smoke top banana", "Flash arch"],
  timingWindows: "Decidir sitio entre 18-22s.",
  reactionTree: "Pick en banana -> execute B con ventaja; Pick en mid -> split A con palace + arch; Sin pick -> fake B -> A con rotación rápida.",
  postplant: "Cubrir desde coil y first oranges.",
  roles: [
    {
      name: "banana-control",
      label: "Banana Control",
      position: "First Oranges / Coil",
      objective: "Ganar espacio en banana y forzar que el CT se retire.",
      utility: "Molotov second oranges, Smoke top banana",
      timing: "Avanzar a 8s, molotov a 10s.",
      responsibility: "Controlar banana sin exponerse innecesariamente.",
      whatToLook: "Second oranges, CT B, Rotaciones",
      communication: "Banana controlada / CT en second / CT cayó",
      onTeammateDeath: "Retroceder a first oranges y esperar el segundo.",
      onNoContact: "Avanzar hasta el site con cautela.",
      postplant: "Cubrir desde coil o first oranges.",
    }
  ],
};