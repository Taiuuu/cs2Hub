import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "mirage-execute-a-full",
  name: "Full Execute A",
  category: "Protocol",
  team: "T",
  setup: "2 Palace / 2 Stairs-Ramp / 1 Mid Lurk",
  description: "Ejecución coordinada a A con smokes de jungle, CT spawn y stairs.",
  objectivePrincipal: "Tomar A site con crossfire desde palace y stairs.",
  minimumUtility: ["Smoke jungle", "Smoke CT spawn", "Smoke stairs", "Flash ticket", "Molotov site o CT"],
  utilityLayering: "Smoke CT -> Smoke jungle -> Smoke stairs -> Flash ticket -> Entrada simultánea",
  timingWindows: "Ejecutar a 22-24s cuando todas las smokes estén activas.",
  winCondition: "A plantado bajo jungle con cuatro vivos.",
  failureStates: ["Smoke de CT no aterriza", "Jungle no smokada y hay AWP"],
  commonMistakes: ["Entrar sin que todas las smokes estén activas", "No cubrir catwalk"],
  reactionTree: "A claro con smokes -> entrada doble palace + stairs; CT aggression de stairs -> esperás la smoke y entras por palace; AWP en jungle -> smoke jungle primero, luego entrar.",
  postplant: "Cubrir desde jungle (fumado) y ticket booth; lurker corta rotación en connector.",
  roles: [],
};

export const tacticProtocol2: Tactic = {
  id: "mirage-execute-b-apps",
  name: "Full Execute B Apps",
  category: "Protocol",
  team: "T",
  setup: "4 B Apps / 1 Mid Lurk",
  description: "Inundar B por apps con smokes de van, bench y short.",
  objectivePrincipal: "Tomar B site antes de que CT rote de A.",
  minimumUtility: ["Smoke van", "Smoke bench", "Flash short apps", "Molotov market o site"],
  utilityLayering: "Smoke van -> Smoke bench -> Flash short -> Molotov -> Entrada",
  timingWindows: "Entrar a 20-22s.",
  winCondition: "B plantado bajo bench con tres vivos.",
  reactionTree: "B despejado -> plantar bajo bench; CT en van -> smoke van y flanquear desde market; CT aggression de short -> retroceder y esperar.",
  postplant: "Cubrir desde bench y van; lurker corta en connector o short.",
  roles: [],
};