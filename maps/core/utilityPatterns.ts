export interface UtilityPattern {
  id: string;
  name: string;
  description: string;
  components: string[];
  usage: string;
}

export const smokeExecPatterns: UtilityPattern[] = [
  {
    id: 'dust2-long-lateral',
    name: 'Long Lateral Smoke',
    description: 'Smoke que bloquea el ángulo largo desde la entrada a A y permite el push de corta.',
    components: ['Smoke long corner', 'Smoke car'],
    usage: 'Se usa en splits de A para aislar el ángulo largo y forzar al CT a jugar más cerca.',
  },
  {
    id: 'mirage-cat-window',
    name: 'Cats / Window',
    description: 'Doble smoke entre catwalk y ventana para asegurar el control medio antes de split A.',
    components: ['Smoke short', 'Smoke window'],
    usage: 'Condiciona al defensor a rotar y gana tiempo para el side B.',
  },
];

export const flashChains: UtilityPattern[] = [
  {
    id: 'nuke-hall-ramp',
    name: 'Hall / Rampa Chain',
    description: 'Cadena de flashes para limpiar la línea de rampa en la ejecución A de Nuke.',
    components: ['Flash hall', 'Flash ramp'],
    usage: 'El objetivo es obligar al rotador a retroceder y permitir avance seguro por hall.',
  },
  {
    id: 'inferno-banana-leap',
    name: 'Banana Leap',
    description: 'Dos flashes en línea para lanzar la entrada a banana sin perder ritmo.',
    components: ['Flash top banana', 'Flash car'],
    usage: 'Sirve para neutralizar a un defensor agresivo y mantener la velocidad del push.',
  },
];

export const molotovProtocols: UtilityPattern[] = [
  {
    id: 'anti-rush-late',
    name: 'Anti-Rush Late Molotov',
    description: 'Molotov lanzada en el último segundo para castigar un rush enemigo después de que se abre el choke.',
    components: ['Molotov deep site', 'Molotov choke'],
    usage: 'Se emplea en defensas CT para retardar el avance y obligar a un cambio de plan del rival.',
  },
  {
    id: 'retake-choke-brush',
    name: 'Retake Choke Brush',
    description: 'Molotov que cierra pasillos clave en un retake para limitar ángulos de entrada del CT.',
    components: ['Molotov bomb', 'Molotov connector'],
    usage: 'Usada durante retakes para proteger la aproximación y limpiar ángulos de corte.',
  },
];

export const antiRushUtility: UtilityPattern[] = [
  {
    id: 'voice-banana',
    name: 'Banana Delay',
    description: 'Combinación de nades en banana de Inferno para frenar cualquier rush enemigo.',
    components: ['HE banana', 'Molotov top', 'Smoke half'],
    usage: 'Permite al CT construir una línea temprana de anti-rush y ganar segundos de información.',
  },
  {
    id: 'dust2-b-tunnel',
    name: 'B Tunnel Lock',
    description: 'Molotov y flash que obligan al rush T a tomar un paso muy estrecho.',
    components: ['Molotov bottom tunnel', 'Flash door'],
    usage: 'Preserva la distancia CT contra pistolas y SMGs en un rush B temprano.',
  },
];

export const retakeUtility: UtilityPattern[] = [
  {
    id: 'default-ct-smoke',
    name: 'Default CT Retake Smoke',
    description: 'Smoke para cubrir un retake de bombsite con dos ángulos principales.',
    components: ['Smoke cross', 'Smoke site'],
    usage: 'Proporciona la base para un retake coordinado sin perder contacto con el site.',
  },
  {
    id: 'contact-reclear',
    name: 'Contact Re-clear',
    description: 'Flash y molotov combinados para re-explotar un ángulo después de un primer intento fallido.',
    components: ['Flash entry', 'Molotov close'],
    usage: 'Especialmente útil cuando el enemigo latea un retake y necesita forzarlo a salir.',
  },
];
