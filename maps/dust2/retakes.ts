import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "dust2-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "1 Pit / 2 CT Spawn / 1 Corto / 1 Long",
  description: "Recuperar A usando el pit como primera capa y CT como segunda.",
  objectivePrincipal: "Limpiar A con crossfire sin perder el CT para rotaciones.",
  concept: "Pit entra primero para atraer el fuego; CT flanquea desde corto.",
  winCondition: "A limpio con al menos dos CTs vivos.",
  failureStates: ["Pit muere sin trade", "Rampa cubierta por postplant"],
  minimumUtility: ["Smoke rampa", "Flash site", "Molotov coche"],
  utilityLayering: "Smoke rampa -> Flash coche -> Molotov site -> Entrada Pit",
  timingWindows: "Iniciar retake a 22-25s.",
  reactionTree: "Pit despejado -> CT entra desde corto con flash; Rampa contestada -> esperar que la smoke caiga y entrar; Dos Ts en site -> necesitás tres CTs mínimo para el retake.",
  postplant: "Cubrir desde Pit y Rampa con el CT adicional.",
  roles: [
    {
      name: "anchor",
      label: "Anchor (Pit)",
      position: "Pit",
      objective: "Ser la primera presencia en A y forzar que el T se exponga.",
      utility: "Flash site antes de asomarse.",
      timing: "Entrar a Pit a 23s.",
      responsibility: "Absorber el primer fuego y marcar la posición del T.",
      whatToLook: "Coche, Site, Rampa",
      communication: "T en coche / dos en site",
      onTeammateDeath: "Retroceder a pit corto y esperar el flash de CT.",
      onNoContact: "Avanzar al site limpiando ángulos.",
      postplant: "Defender la bomba desde Pit cubriendo CT.",
    }
  ],
};

export const tacticRetake2: Tactic = {
  id: "dust2-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 Upper B / 2 Tunnels / 1 Mid",
  description: "Recuperar B usando upper B para crossfire y tunnels para cortar postplant.",
  objectivePrincipal: "Limpiar B antes de que el T consolide la posición.",
  winCondition: "B limpio sin dejar que el T juegue el postplant.",
  minimumUtility: ["Smoke site", "Flash upper", "Molotov tunnels"],
  reactionTree: "Upper B claro -> entrar en dos y flanquear desde puerta; Tunnels bloqueado -> usar smoke para entrar por upper; T en auto -> necesitás la flash primero antes de asomarte.",
  postplant: "Cubrir desde upper B y cortar los ángulos de tunnels.",
  roles: [],
};