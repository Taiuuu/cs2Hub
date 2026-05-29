import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const dust2Reaggressions: StratDetail[] = [
  createStrat({
    id: 'dust2-reaggression-b',
    name: 'Reaggression B Upper',
    category: 'Reaggression',
    type: 'reaggression',
    team: 'CT',
    description:
      'Ejecutar un push rápido por Upper para recuperar control de B después de una pérdida de la primera línea.',
    objectivePrincipal:
      'Golpear la posición rival antes de que se establezcan en Platform y Door.',
    concept:
      'Utilizar velocidad y molotovs para crear un segundo choque donde el T no espera presión CT.',
    risks: ['Perder el contacto en Upper', 'sobreextender sin visión', 'quedar cortados por util enemiga'],
    failReaction:
      'Si el T cierra Platform, retroceder a Door y jugar el retake con smoke de Upper.',
    adaptationsPossible:
      'Convertirlo en un control de default B si no hay cuerpos ni info para el push.',
    midRoundOptions: ['Mantener Upper y esperar a que el T intente salir', 'Rotar uno a Mid para apoyo'],
    winCondition: 'Recuperar Upper con al menos un trade y segurar B antes de que el T plante.',
    failureStates: ['CT pierde Upper sin trade', 'el T se planta rápido', 'no hay soporte desde Medio'],
    commonMistakes: ['empujar sin flash', 'ignorar el posible rotador del T', 'usar pocas nades'],
    recoveryPlan:
      'Reagruparse en Door/Platform y ejecutar un retake tradicional cuando el sitio esté plantado.',
    economyLogic: 'Conservar al menos un rifle y una smoke para la segunda fase del control.',
    minimumUtility: ['Flash Upper', 'Molotov Upper', 'Smoke Door'],
    priorityWeapons: ['Rifle en Upper', 'SMG en Platform', 'AWP en Mid support'],
    spacingRules: 'Presionar en líneas cortas y con trade cercano; no avanzar en masa.',
    utilityLayering: 'Flash Upper → Molotov Upper → Smoke Door.',
    timingWindows: 'Iniciar el push antes del 15s para pillar al T rotando o reposicionándose.',
    reactionTree:
      'Upper abierto → entrar; Platform fuerte → resetear a Door; no hay contacto → mantener sitio.',
    rotationPunish:
      'Si el T rota por mid, usar el AWP para castigar la cruz entre Mid y B.',
    lurkTiming: 'El lurker respeta el primer choque y entra solo si el T se repliega.',
    infoProtocols:
      'Comunicar puertas abiertas, Platform ocupado y short libre.',
    setup: '3 B / 2 medio para prioridad de push.',
    playerDistribution:
      'Uno Upper, uno Platform, uno Door, dos en Mid retenidos para rotar.',
    importantSpaces: ['Upper', 'Door', 'Platform', 'Tunnels', 'Mid'],
    pointOfContact: 'Upper para iniciar; Door para asegurar la rotación.',
    postplant: 'Cortar retake desde Upper y Platform si el T planta en Backsite.',
    roles: {
      entry: fillRole(
        {
          position: 'Upper',
          objective: 'Ganar el primer trade y meter al T en posición incómoda.',
          utility: 'Flash Upper y molotov detrás de la caja.',
          timing: 'Entrar con el primer flash antes del 15s.',
          postplant: 'Mantener el ángulo de Upper y soportar la rotación.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Platform',
          objective: 'Asegurar el trade y proteger la ruta de salida.',
          utility: 'Humo de Door si el sitio queda bajo control.',
          timing: 'Flashear con el entry y avanzar solo tras su contacto.',
          postplant: 'Cubrir la planta desde la plataforma.',
        },
        sharedRoles.support,
      ),
    },
  }),
  createStrat({
    id: 'dust2-reaggression-a',
    name: 'Reaggression A Short / Mid',
    category: 'Reaggression',
    type: 'reaggression',
    team: 'CT',
    description:
      'Presionar Short/Medio para recuperar espacio de A y castigar a la T que intenta resetear tras perder medio.',
    objectivePrincipal: 'Acarrear la ronda de vuelta hacia el CT antes de que el T organice el sitio.',
    concept:
      'Golpear con dos flashes en Short y uno de medio para cortar al T mientras reconstituye.',
    risks: ['Ser atrapado en el open mid', 'flash mal sincronizada', 'quedar expuesto al bomb plant en A'],
    failReaction:
      'Si el T cierra Short, retroceder a A Site con cajas y jugar desde Goose/Pit.',
    adaptationsPossible:
      'Si el T tiene util, usar la agresión como información y luego tomar un retake.',
    midRoundOptions: ['Reagrupar en Long', 'Volver a jugar B si Short no está disponible'],
    winCondition: 'El CT recupera Short y el T no puede establecer la línea de trade en A.',
    failureStates: ['Short lost sin trade', 'T planta en A sin presión', 'reagresión inutilizada por util'],
    commonMistakes: ['no cubrir el flanco de Xbox', 'entrar separados', 'no usar flash de continuidad'],
    recoveryPlan:
      'Si el push falla, bloquear Short y preparar una defensa de sitio con Pit y Goose.',
    economyLogic: 'Usar util clave para ganar espacio, no para pelear en círculos.',
    minimumUtility: ['Flash Short', 'Smoke Mid', 'Molotov Xbox'],
    priorityWeapons: ['Rifle en Short', 'AWP en Xbox', 'SMG agresivo en Mid'],
    spacingRules: 'Mantener distancia de line-to-line para poder tradear.',
    utilityLayering: 'Flash Short → Smoke Mid → Molotov Xbox.',
    timingWindows: 'Empujar entre 18-22s para romper el ciclo T de reposicionamiento.',
    reactionTree:
      'Short ganado → sostener; Short perdido → resetear a A; no hay cuerpos → escalar a medio.',
    rotationPunish:
      'Si el T rota de B, castigar su line up por Mid con el AWP.',
    lurkTiming: 'Lurker espera confirmación de Short antes de salir a Mid.',
    infoProtocols:
      'Reportar medio libre, short contestado y posibles cuerpos en A.',
    setup: '2 Short / 2 A / 1 Xbox swing.',
    playerDistribution:
      'Uno en Short, uno en Mid, dos en A y uno en Xbox.',
    importantSpaces: ['Short', 'Mid', 'Goose', 'Pit', 'Bombsite A'],
    pointOfContact: 'Short para iniciar; Mid para cortar la rotación.',
    postplant: 'Formar la cruz desde Goose, Pit y Xbox.',
    roles: {
      entry: fillRole(
        {
          position: 'Short',
          objective: 'Abrir el paso hacia A y forzar al T a reaccionar.',
          utility: 'Flash Short y smoke Mid.',
          timing: 'Ponerse en posición a 18s y entrar con soporte.',
          postplant: 'Cortar la rotación desde Mid y Goose.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Mid',
          objective: 'Cubrir la rotación de Xbox y el acceso a A.',
          utility: 'Smoke Mid y flash de seguimiento.',
          timing: 'Avanzar tras el primer contacto Short.',
          postplant: 'Mantener vista hacia Xbox y Headshot.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
