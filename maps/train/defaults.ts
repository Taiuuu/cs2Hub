import { Tactic } from "@/types";

export const tacticDefault1: Tactic = {
  id: "train-default-2-1-2",
  name: "Default 2-1-2",
  category: "Default",
  team: "T",
  setup: "2 A Ivy / 1 Mid / 2 B T-con",
  description: "Presión dividida para leer la defensa CT antes de comprometerse.",
  objectivePrincipal: "Obtener información de ivy y T-con para decidir el sitio.",
  winCondition: "Pick en ivy o T-con + ejecutar el sitio débil a 22s.",
  minimumUtility: ["Smoke ivy", "Smoke T-con", "Flash mid"],
  timingWindows: "Decidir sitio entre 18-22s.",
  reactionTree: "Pick en ivy -> execute A con smokes; Pick en T-con -> execute B con ventaja; Sin pick -> fake A -> B con rotación rápida.",
  postplant: "Cubrir desde e-box y bomb train.",
  roles: [
    {
      name: "ivy-control",
      label: "Ivy Control",
      position: "Ivy / A entry",
      objective: "Ganar espacio en ivy y forzar que el CT se retire a upper A.",
      utility: "Smoke ivy, Flash pocket",
      timing: "Avanzar a ivy a 8s, smoke a 10s.",
      responsibility: "Controlar ivy sin exponerse al AWP de upper A.",
      whatToLook: "Upper A, CT A, Popdog",
      communication: "Ivy controlado / AWP en upper A / CT cayó",
      onTeammateDeath: "Retroceder y esperar el segundo.",
      onNoContact: "Avanzar hasta el site con cautela.",
      postplant: "Cubrir desde e-box.",
    }
  ],
};