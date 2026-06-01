import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "dust2-full-buy-a-split",
  name: "Full Execute A Split",
  category: "Buy",
  team: "T",
  setup: "2 Largo / 2 Mid-Corto / 1 Lurk B",
  description: "Split A con jugadores desde largo y desde corto vía mid, sincronizados con util.",
  objectivePrincipal: "Aislar el site A en un crossfire desde dos ángulos.",
  minimumUtility: ["Smoke CT A", "Smoke Rampa", "Flash corto", "Flash largo", "Molotov pit"],
  utilityLayering: "Smoke CT A -> Smoke Rampa -> Flash corto simultáneo -> Molotov Pit -> Entrada",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado con cuatro vivos.",
  reactionTree: "Corto despejado -> entrada doble simultánea; Largo resistido -> el split de corto entra primero; CT rota de B -> lurker corta en mid.",
  postplant: "Cubrir desde Rampa y Pit; uno defiende la base del site.",
  roles: [],
};