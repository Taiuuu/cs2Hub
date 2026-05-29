import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const dust2ForceStrats: StratDetail[] = [
  createStrat({
    id: 'dust2-force-t-b-rush',
    name: 'Force B Rush',
    category: 'Force Buy',
    type: 'force',
    team: 'T',
    description:
      'Cargar B con SMGs y flashes rápidos para superar la defensa de Upper y plantar la bomba.',
    objectivePrincipal: 'Explotar la superioridad de armas cortas y shockear el sitio B.',
    concept:
      'Presionar con fuerza en lugar de utilización completa, aprovechando ángulos cerrados.',
    risks: ['Mala sincronización del flash', 'Perder Upper sin trade', 'mala smoke de Door'],
    failReaction:
      'Si fallan los flashes, plantar rápido y jugar el postplant desde Door y Platform.',
    adaptationsPossible:
      'Cambiar a un split corto con uno o dos jugadores por Platform si se cierra Upper.',
    midRoundOptions: ['Consolidar el sitio si hay planta', 'jugar retrasado si el T se reagrupa'],
    winCondition: 'El T planta y mantiene al menos dos líneas de trade en B.',
    failureStates: ['T pierde todos antes del sitio', 'bomb plant imposible'],
    commonMistakes: ['entrar separados', 'no coordinar flashes', 'olvidar la smoke de Door'],
    recoveryPlan: 'Una vez fallado el rush, resignarse a jugar un postplant con la bomba en Platform.',
    economyLogic: 'Minimizar el gasto en util y confiar en Mac-10/MP9.',
    minimumUtility: ['Flash Door', 'Smoke Door'],
    priorityWeapons: ['SMG en Upper', 'Rifle en Door'],
    spacingRules: 'Empujar en cuadros cortos, mantener el trade cercano.',
    utilityLayering: 'Flash de entry → smoke de Door → molotov de Upper si se pierde control.',
    timingWindows: 'Entrar antes del 20s para sorprender al CT.',
    reactionTree: 'Upper claro → entrar; Upper cerrado → pivote a Door; no contacto → plant.',
    rotationPunish: 'Si el CT rota de A, castigar la nueva configuración con presión de Platform.',
    lurkTiming: 'El lurker entra después del primer flash para asegurar el sitio.',
    infoProtocols: 'Reportar presencia en Upper, Door y Platform.',
    setup: '5 B con util limitada.',
    playerDistribution: 'Tres Upper, dos Door.',
    importantSpaces: ['Upper', 'Door', 'Platform', 'Tunnels'],
    pointOfContact: 'Upper con flashes directos.',
    postplant: 'Jugar Plant en Door y cubrir Platform/Upper.',
    roles: {
      entry: fillRole(
        {
          position: 'Upper',
          objective: 'Abrir la línea de Upper y absorber el primer fuego.',
          utility: 'Flash Upper y smoke Door si es necesario.',
          timing: 'Entrar con el primer grupo con el flash inicial.',
          postplant: 'Formar la cruz en Door y Platform.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Door',
          objective: 'Cubrir el sitio y close the gap.',
          utility: 'Smoke Door y flash de seguimiento.',
          timing: 'Entrar tras el primer contacto de Upper.',
          postplant: 'Mantener la puerta y ayudar a cortar la rotación.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
