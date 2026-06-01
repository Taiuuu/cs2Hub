import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "nuke-execute-a-ramp-squeaky",
  name: "Full Execute A (Ramp + Squeaky)",
  category: "Protocol",
  team: "T",
  setup: "3 Ramp / 2 Squeaky",
  description: "Execute coordinado a A con smokes de heaven, hut y squeaky door.",
  objectivePrincipal: "Tomar A site con crossfire desde ramp y squeaky simultáneamente.",
  minimumUtility: ["Smoke heaven", "Smoke squeaky", "Smoke hut", "Flash ramp", "Molotov trophy room"],
  utilityLayering: "Smoke heaven -> Smoke hut -> Smoke squeaky -> Flash ramp -> Entrada",
  timingWindows: "Ejecutar a 22-24s con todas las smokes activas.",
  winCondition: "A plantado en el centro con cuatro vivos.",
  failureStates: ["Heaven no smokado y el AWP está activo", "Squeaky bloqueado"],
  commonMistakes: ["Entrar por ramp sin smoke de heaven", "Squeaky sin apoyo de flash"],
  reactionTree: "Heaven fumado y hut fumado -> entrada ramp y squeaky simultánea; CT aggression desde ramp -> esperás smoke y entras por squeaky; Outside pressure -> lurker corta la rotación de afuera.",
  postplant: "Cubrir desde ramp (a resguardo) y squeaky (dentro del site).",
  roles: [],
};

export const tacticProtocol2: Tactic = {
  id: "nuke-execute-b-secret",
  name: "Full Execute B (Yard + Secret)",
  category: "Protocol",
  team: "T",
  setup: "3 Yard / 2 Secret",
  description: "Execute B por yard y secret con smokes de CT B y radio.",
  objectivePrincipal: "Tomar B site antes de que CT rote de A.",
  minimumUtility: ["Smoke CT B", "Smoke radio", "Flash site B", "Molotov hell"],
  utilityLayering: "Smoke CT B -> Smoke radio -> Flash site -> Molotov hell -> Entrada",
  timingWindows: "Ejecutar a 20-22s.",
  winCondition: "B plantado con tres vivos.",
  reactionTree: "CT B fumado -> entrada yard + secret simultánea; CT aggression yard -> smoke yard y entrar por secret; Lurker vents -> corta rotación CT.",
  postplant: "Cubrir desde secret y silo.",
  roles: [],
};