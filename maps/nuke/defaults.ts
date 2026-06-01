import { Tactic } from "@/types";

export const tacticDefault1: Tactic = {
  id: "nuke-default-2-1-2",
  name: "Default Outside + Ramp",
  category: "Default",
  team: "T",
  setup: "2 Outside / 2 Ramp / 1 Secret",
  description: "Presión simultánea en outside y ramp para leer la defensa CT.",
  objectivePrincipal: "Obtener información de outside y ramp para decidir el execute.",
  winCondition: "Pick en outside o ramp + decidir el sitio a 20s.",
  minimumUtility: ["Smoke heaven", "Flash ramp entry", "Smoke outside CT"],
  timingWindows: "Decidir sitio entre 18-22s.",
  reactionTree: "Pick en outside -> execute A con ramp + squeaky; Pick en ramp -> execute A directo; Sin pick -> execute B por secret con lurk.",
  postplant: "Cubrir desde ramp y hut.",
  roles: [
    {
      name: "outside-control",
      label: "Outside Control",
      position: "Outside / Garage",
      objective: "Ganar espacio en outside y forzar que el CT se retire.",
      utility: "Smoke outside CT, Flash pocket",
      timing: "Avanzar a outside a 8s.",
      responsibility: "Controlar outside sin exponerse al AWP de heaven.",
      whatToLook: "Heaven, CT outside, Rotaciones",
      communication: "Outside controlado / AWP en heaven / CT cayó",
      onTeammateDeath: "Retroceder a garage y esperar el segundo.",
      onNoContact: "Avanzar hasta ramp entry y buscar información.",
      postplant: "Cubrir desde outside con el AWP.",
    }
  ],
};