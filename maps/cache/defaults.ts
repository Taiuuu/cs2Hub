import { Tactic } from "@/types";

export const tacticDefault1: Tactic = {
  id: "cache-default-2-1-2",
  name: "Default 2-1-2",
  category: "Default",
  team: "T",
  setup: "2 A Main / 1 Mid / 2 B Cross",
  description: "Presión dividida para leer la defensa CT antes de comprometerse.",
  objectivePrincipal: "Obtener información de mid y main para decidir el sitio.",
  winCondition: "Pick en mid o main + ejecutar el sitio débil a 22s.",
  minimumUtility: ["Smoke CT mid", "Flash main A", "Flash cross B"],
  timingWindows: "Decidir sitio entre 18-22s.",
  reactionTree: "Pick en mid -> split A main + squeaky; Pick en main -> execute A directo; Sin pick -> execute B con cross smokes.",
  postplant: "Cubrir desde quad y truck A.",
  roles: [
    {
      name: "mid-control",
      label: "Mid Control",
      position: "Highway / Top Mid",
      objective: "Ganar control de mid para habilitar el split A.",
      utility: "Smoke CT mid, Flash highway",
      timing: "Avanzar a mid a 8s, smoke a 10s.",
      responsibility: "Tomar mid sin exponerse al AWP CT.",
      whatToLook: "CT mid, Vending, Heaven A",
      communication: "Mid controlado / AWP en CT mid / highway libre",
      onTeammateDeath: "Retroceder a T mid y esperar el segundo.",
      onNoContact: "Avanzar a squeaky y preparar el split A.",
      postplant: "Cubrir desde squeaky o mid.",
    }
  ],
};