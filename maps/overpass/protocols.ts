import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "overpass-execute-b-agua",
  name: "Full Execute B Agua",
  category: "Protocol",
  team: "T",
  setup: "4 Agua / 1 Mid Lurk",
  description: "Inundar B por agua con smokes de pillar, CT B y monster.",
  objectivePrincipal: "Tomar B site antes de que CT rote de A.",
  minimumUtility: ["Smoke monster", "Smoke CT B", "Smoke pillar B", "Flash site", "Molotov bank"],
  utilityLayering: "Molotov monster -> Smoke monster -> Smoke CT B -> Smoke pillar -> Flash site -> Entrada",
  timingWindows: "Entrar a 20-22s.",
  winCondition: "B plantado detrás del pillar con tres vivos.",
  failureStates: ["Monster no smokado y hay AWP", "CT B libre con dos CTs"],
  commonMistakes: ["Entrar sin smoke de monster", "No cubrir bank"],
  reactionTree: "Monster fumado -> entrada directa por agua; CT aggression agua -> retroceder y esperar; Lurker mid -> corta rotación CT.",
  postplant: "Cubrir desde agua y bank.",
  roles: [],
};

export const tacticProtocol2: Tactic = {
  id: "overpass-execute-a-split",
  name: "Full Execute A Split",
  category: "Protocol",
  team: "T",
  setup: "2 Short / 2 Long / 1 Lurk Mid",
  description: "Split A clásico con smokes de heaven, short y CT.",
  objectivePrincipal: "Aislar A con dos ángulos de entrada simultáneos.",
  minimumUtility: ["Smoke heaven A", "Smoke CT A", "Smoke short", "Flash long", "Molotov fountain"],
  utilityLayering: "Smoke heaven -> Smoke CT A -> Smoke short -> Flash long -> Molotov fountain -> Entrada doble",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado en el centro con cuatro vivos.",
  reactionTree: "Heaven fumado y CT fumado -> entrada doble short + long; CT aggression short -> esperar smoke y entrar por long; Lurker toilets -> corta rotación CT.",
  postplant: "Cubrir desde fountain y truck A.",
  roles: [],
};