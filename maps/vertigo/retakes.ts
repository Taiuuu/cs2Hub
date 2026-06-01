import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "vertigo-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "2 CT Spawn / 2 Stairs / 1 Mid",
  description: "Retake de A usando stairs como entrada y CT spawn como flanqueo.",
  minimumUtility: ["Smoke site", "Flash way", "Molotov ramp"],
  utilityLayering: "Smoke site -> Flash way -> Entrada simultánea stairs + CT spawn",
  timingWindows: "Iniciar a 22-25s.",
  winCondition: "A limpio con dos CTs vivos.",
  reactionTree: "Way libre -> entrar desde stairs y CT spawn; T en site -> smoke site y coordinar entrada doble; T en ramp -> molotov ramp antes de entrar.",
  roles: [],
};

export const tacticRetake2: Tactic = {
  id: "vertigo-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 CT B / 2 Catwalk / 1 Mid",
  description: "Retake de B usando el CT de B como entrada y catwalk como flanqueo.",
  minimumUtility: ["Smoke scaffolding", "Flash site", "Molotov pillar"],
  winCondition: "B limpio con dos CTs vivos.",
  reactionTree: "Scaffolding libre -> entrar CT B y catwalk; T consolidado -> smoke scaffolding y flanquear; Pillar activo -> molotov pillar antes de asomarse.",
  roles: [],
};