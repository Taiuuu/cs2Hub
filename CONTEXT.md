# Instrucciones para Copilot — CS2 Hub

## Formato de respuesta
- Respondé SOLO con código: el fragmento modificado. Nada de explicaciones antes o después.
- No repitas código que no cambió. Mostrá solo el bloque necesario con 1-2 líneas de contexto arriba/abajo.
- No agregues comentarios nuevos salvo que se pida.
- Si algo es ambiguo, UNA pregunta corta en vez de asumir. No expliques por qué preguntás.
- No repitas ni parafrasees el prompt.
- No agregues disclaimers genéricos. Si hay riesgo real y concreto, una línea, no un párrafo.

## Alcance de lectura
- No releas el proyecto entero salvo que se pida explícitamente. Trabajá solo sobre el/los archivos pasados en el prompt.
- Si necesitás contexto de otro archivo, pedilo puntualmente en vez de inventar la estructura.
- Usá este CONTEXT.md como fuente de verdad de la arquitectura general, no infieras leyendo todo.

## Estilo de código
- TypeScript + Next.js App Router, siguiendo el estilo existente del archivo.
- Tailwind v4 para estilos, tema oscuro + naranja como acento (ver sección Diseño en CONTEXT.md principal).
- No reformatees código que no toqué.
- No agregues logging/console.log extra salvo que se pida.
- No agregues manejo de errores genérico (try/catch amplios) salvo que se pida; si agregás uno, específico.
- No introduzcas dependencias nuevas sin avisar primero (una línea: "esto requiere instalar X").

## Reglas de dominio del proyecto
- No hay backend/DB: toda persistencia es LocalStorage. Cualquier feature nueva de datos debe seguir ese patrón salvo que se pida explícitamente lo contrario.
- El turno/tema del proyecto es CS/CS2 competitivo — nombres de dominio en inglés/gaming estándar (crosshair, clutch, ADR, etc.), no traducir términos propios del juego.
- Static Export para GitHub Pages: no usar features de Next.js incompatibles con `output: export` (sin API routes dinámicas del lado server en producción salvo la ya existente de stats, sin `next/image` con optimización server-side sin configurar).

## Qué NO hacer nunca
- No reescribas archivos completos si el cambio es puntual.
- No sugieras refactors grandes no pedidos.
- No agregues tests salvo que se pidan.
- No cambies nombres de funciones/variables existentes salvo que sea el pedido explícito.

---

## Estado actual del proyecto (2026-07-02)

### Dependencias
- `next`: 16.2.6 (App Router)
- `react`: 19.2.4
- `tailwindcss`: v4 (dark theme)
- `lucide-react`: v1.21.0 (icons)
- `recharts`: v2.x (gráficos de ELO)
- `@supabase/supabase-js`: v2.106.2

### Features implementados

#### 1. Metadata API
**Archivos**: [app/layout/metadata.ts](app/layout/metadata.ts), layouts en cada sección
- Metadata centralizada con OG tags, Twitter cards, keywords
- `baseMetadata` para root, secciones específicas con descripciones
- Dynamic metadata en `app/maps/[slug]/layout.tsx` por mapa
- Compatible con static export

#### 2. Gráfico de ELO en FACEIT Card
**Archivos**: [components/stats/FaceitCard.tsx](components/stats/FaceitCard.tsx), [app/api/stats/history/route.ts](app/api/stats/history/route.ts)
- Endpoint `/api/stats/history?faceitNickname=X&limit=10` fetchea últimos 10 matches
- LineChart recharts muestra evolución (naranja #ff5500, tema oscuro)
- Carga automática sin afectar stats principales
- Compatible con static export (client-side fetch)

#### 3. Mapas y Estrategias
**Archivos**: [app/maps/page.tsx](app/maps/page.tsx), [app/maps/[slug]/page.tsx](app/maps/[slug]/page.tsx)
- Página de mapas con listado y detalle dinámico
- Filtros T/CT, por zona (A/Mid/B), por rol (Entry/Support/Lurker/Anchor/AWP)
- Tácticas agrupadas por categoría de compra

#### 4. Configuraciones de Juego
**Archivos**: [app/configs/page.tsx](app/configs/page.tsx), [components/configs/](components/configs/)
- CRUD de configuraciones (Mouse, Video, HUD, Radar, Launch Options)
- `.cfg` file download
- LocalStorage persistence (key: 'gameConfigs')

#### 5. Miras (Crosshairs)
**Archivos**: [app/crosshairs/page.tsx](app/crosshairs/page.tsx)
- Gestor de miras con guardar/editar/eliminar
- LocalStorage (key: 'crosshairs')

#### 6. Stats Player
**Archivos**: [components/stats/PlayerFetcher.tsx](components/stats/PlayerFetcher.tsx), [components/stats/SteamCard.tsx](components/stats/SteamCard.tsx), [components/stats/FaceitCard.tsx](components/stats/FaceitCard.tsx)
- Skeleton loaders detallados (Steam, CS2, FACEIT)
- Tema oscuro + naranja en headers
- API: `/api/stats?steamUsername=X&faceitNickname=Y`

#### 7. Settings / Backup
**Archivos**: [app/settings/page.tsx](app/settings/page.tsx)
- Export JSON (crosshairs + gameConfigs + notes)
- Import JSON con validación
- LocalStorage: 'crosshairs', 'gameConfigs', 'notes'

### Errores conocidos a resolver

1. **app/configs/page.tsx**
   - Line 320: `Cannot find name 'Pencil'` — falta import de lucide-react
   - Line 332: `Cannot find name 'X'` — falta import de lucide-react
   - Line 352: Type error en `onSubmit` handler

2. **app/maps/[slug]/page.tsx**
   - Type mismatch entre `MapTactic` y `RoundStrat`
   - `tactic.roles` es objeto, no array — revisar estructura de tipos

### Rutas eliminadas
- `/app/maps/[mapId]/` — Conflicto con `[slug]`, eliminada completamente

### Próximos pasos
1. Resolver imports faltantes en configs/page.tsx (Pencil, X)
2. Verificar tipos en maps/[slug]/page.tsx
3. Testing en dev server (npm run dev)
4. Deploy a GitHub Pages si todo compila