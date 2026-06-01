import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "vertigo-execute-a-full",
  name: "Full Execute A",
  category: "Protocol",
  team: "T",
  setup: "4 A / 1 Lurk Mid",
  description: "Ejecución coordinada a A con smokes de stairs CT, way y ramp.",
  minimumUtility: ["Smoke stairs CT", "Smoke way", "Smoke ramp A", "Flash side A", "Molotov CT A"],
  utilityLayering: "Smoke stairs CT -> Smoke way -> Smoke ramp A -> Flash side -> Molotov CT -> Entrada",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado en centro con tres vivos.",
  failureStates: ["Smoke de stairs CT no aterriza", "Way sigue activo"],
  commonMistakes: ["Entrar por ramp sin smoke de way", "No cubrir stairs CT"],
  reactionTree: "Stairs CT fumado y way fumado -> entrada simultánea desde ramp y side; CT aggression en way -> esperás smoke y entras por ramp; Mid lurk -> corta rotación si CT viene de B.",
  postplant: "Cubrir desde way y side A con smokes activas.",
  roles: [],
};

export const tacticProtocol2: Tactic = {
  id: "vertigo-execute-b-full",
  name: "Full Execute B",
  category: "Protocol",
  team: "T",
  setup: "3 Scaffolding / 2 Ramp B",
  description: "Ejecución a B con smokes de ramp B, CT B y scaffolding entry.",
  minimumUtility: ["Smoke ramp B", "Smoke CT B", "Flash scaffolding", "Molotov pillar"],
  utilityLayering: "Smoke CT B -> Smoke ramp B -> Flash scaffolding -> Molotov pillar -> Entrada",
  timingWindows: "Ejecutar a 20-22s.",
  winCondition: "B plantado detrás del pillar con tres vivos.",
  reactionTree: "CT B fumado -> entrada scaffolding + ramp simultánea; CT aggression ramp -> smoke ramp y entrar por scaffolding; Pillar activo -> molotov pillar antes de entrar.",
  postplant: "Cubrir desde scaffolding y ramp B con smokes activas.",
  roles: [],
};