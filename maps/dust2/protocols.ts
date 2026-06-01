import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "dust2-execute-b-full",
  name: "Execute B Full",
  category: "Protocol",
  team: "T",
  setup: "5 B (3 tunnels / 2 mid apoyo)",
  description: "Ejecución total a B con smokes de puerta, auto y ventana B.",
  objectivePrincipal: "Tomar B con ventaja numérica antes de que CT rote de A.",
  concept: "Inundar B con util para eliminar todos los ángulos CT.",
  winCondition: "B plantado con tres jugadores vivos para postplant.",
  failureStates: ["Smoke de puerta falla", "CT rotó rápido desde A"],
  commonMistakes: ["Entrar sin smoke de ventana B", "No cubrir auto"],
  minimumUtility: ["Smoke puerta B", "Smoke auto", "Flash upper B", "Molotov site"],
  priorityWeapons: ["Rifle x3", "SMG tunnels"],
  timingWindows: "Entrar a 20-22s con todas las smokes activas.",
  utilityLayering: "Smoke puerta -> Smoke auto -> Flash upper -> Molotov site -> Entrada",
  reactionTree: "B despejado -> plantar en base y retener; CT fuerte en B -> plantar atrás y jugar postplant largo; Rotación de A -> castigar con lurker en mid.",
  postplant: "Cubrir desde tunnels y upper B; el lurker corta la rotación en mid.",
  roles: [
    {
      name: "entry",
      label: "Entry (Upper B / Puerta)",
      position: "Puerta B / Upper B",
      objective: "Ser el primer cuerpo en el site y absorber el primer disparo.",
      utility: "Flash upper B antes de entrar.",
      timing: "Entrar en cuanto la smoke de puerta esté activa.",
      responsibility: "Llegar al site y tomar posición antes que el resto del equipo.",
      whatToLook: "Auto, Ventana B, CT ángulos",
      communication: "Upper B limpio / dentro del site",
      onTeammateDeath: "Tomar la posición más segura y esperar el segundo trade.",
      onNoContact: "Plantar en base y cubrir desde auto.",
      postplant: "Cubrir desde auto o puerta con la smoke caída.",
    }
  ],
};