import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "dust2-pistol-rush-b",
  name: "Rush B Tunnels",
  category: "Pistol",
  team: "T",
  setup: "5 B (todos por tunnels)",
  description: "Rush completo por tunnels con flashes coordinadas de upper y lower.",
  objectivePrincipal: "Ganar B en ronda de pistol antes de que la CT tenga time.",
  concept: "Velocidad y abrumación numérica.",
  minimumUtility: ["Flash lower tunnels", "Flash upper tunnels", "Molotov auto"],
  timingWindows: "Entrar a B a 18s.",
  winCondition: "B plantado con tres vivos para postplant.",
  commonMistakes: ["Entrar apilados", "No flashear auto"],
  reactionTree: "B vacío -> plantar y retener; CT en upper -> usar molotov de auto y flanquear; CT rotó de A -> usar lurker de mid para cortar.",
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "dust2-pistol-ct-default",
  name: "Default CT Pistol",
  category: "Pistol",
  team: "CT",
  setup: "2 A (largo + corto) / 1 Mid (ventanas) / 2 B (upper + puerta)",
  description: "Setup estándar CT para pistol que cubre todos los ángulos sin over-aggression.",
  concept: "Jugar posiciones seguras, no pushear sin información.",
  minimumUtility: ["Molotov tunnels", "Flash largo"],
  winCondition: "Al menos dos intercambios positivos antes de que el T plante.",
  commonMistakes: ["Pushear largo sin flash", "Abandonar mid en pistol"],
  roles: [],
};