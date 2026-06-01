import { Tactic } from "@/types";

export const tacticDefault1: Tactic = {
  id: "mirage-default-2-1-2",
  name: "Default 2-1-2",
  category: "Default",
  team: "T",
  setup: "2 B Apps / 1 Mid / 2 A (palace + ramp)",
  description: "Lectura de la defensa CT con presencia en los tres flancos.",
  objectivePrincipal: "Identificar el lado débil de la CT antes de comprometerse.",
  winCondition: "Pick en palace o mid + ejecutar el sitio débil a 22s.",
  minimumUtility: ["Smoke top mid", "Flash ramp", "Flash apps"],
  timingWindows: "Decidir sitio entre 18-22s.",
  reactionTree: "Pick en palace -> split A con palace + stairs; Pick en mid -> apoyo de B con tres jugadores; Sin pick -> reset y jugar segunda ronda de presión.",
  postplant: "Cubrir desde ticket booth y jungle.",
  roles: [
    {
      name: "entry",
      label: "Entry (A - Palace)",
      position: "Palace",
      objective: "Avanzar por palace y buscar información del ticket booth.",
      utility: "Flash palace antes de asomarse al site.",
      timing: "Avanzar a palace a 10s.",
      responsibility: "Forzar al CT de A a mantener su posición.",
      whatToLook: "Ticket booth, Stairs CT, Jungle",
      communication: "CT en ticket / jungle libre",
      onTeammateDeath: "Retroceder a palace y esperar el flash del compañero.",
      onNoContact: "Avanzar hasta el site y cubrir la entrada de stairs.",
      postplant: "Cubrir desde ticket booth o detrás del triple box.",
    }
  ],
};