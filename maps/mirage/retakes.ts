import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "mirage-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "1 CT Spawn / 2 Jungle / 1 Stairs / 1 Mid-Connector",
  description: "Retake de A usando jungle como entrada principal y CT como flanqueo.",
  minimumUtility: ["Smoke triple box", "Flash site", "Molotov o Flash jungle"],
  utilityLayering: "Smoke triple box -> Flash jungle -> Entrada CT spawn + Jungle",
  timingWindows: "Iniciar retake a 22-25s.",
  winCondition: "A limpio con dos CTs vivos.",
  reactionTree: "Jungle limpio -> entrada doble CT + jungle; T en ticket booth -> smoke ticket y entrar por jungle; T en triple box -> molotov triple box y esperar el movimiento.",
  roles: [],
};

export const tacticRetake2: Tactic = {
  id: "mirage-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 B Short / 2 Apps / 1 CT Spawn",
  description: "Retake B usando presión desde apps y short con flashes coordinadas.",
  minimumUtility: ["Smoke van", "Flash site", "Molotov bench"],
  winCondition: "B limpio con tres CTs vivos.",
  reactionTree: "Van libre -> entrar por short B; Bench libre -> apps entra primero; T consolida site -> necesitás smoke de van para entrar seguro.",
  roles: [],
};