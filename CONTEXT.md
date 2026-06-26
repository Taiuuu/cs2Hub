# CS2 Hub - Context
**Última actualización:** 01 Junio 2026

---

# 📌 Estado General

## ✅ Proyecto

CS2 Hub es una aplicación web desarrollada con:

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- LocalStorage (sin base de datos)
- Static Export para GitHub Pages

El proyecto se encuentra funcional y listo para desplegar.

---

# ✅ Funcionalidades Implementadas

## 🗺️ Mapas

- 10 mapas competitivos
  - Dust2
  - Mirage
  - Nuke
  - Ancient
  - Inferno
  - Overpass
  - Anubis
  - Cache
  - Train
  - Vertigo

Características:

- Grid responsive
    - Desktop: 4 columnas
    - Tablet: 2 columnas
    - Mobile: 1 columna

- Backgrounds JPG
- Logos/Iconos
- Hover animations
- Smooth transitions

---

## 🎯 Crosshair Manager

Permite:

- Crear miras
- Buscar miras
- Guardar automáticamente
- Copiar código
- Persistencia mediante LocalStorage

### Mejoras implementadas

- Layout de dos columnas
- Formulario simplificado
- Eliminado campo Equipo (CT/T/Both)
- Campo Nombre
- Campo Código
- Campo Descripción
- Botón Copiar Código
- Validaciones
- Mejor diseño visual

### Preview

Incluye preview en Canvas.

Características:

- Renderizado en tiempo real
- Parseo del código de la mira
- Fondo estilo CS2
- Toggle mostrar/ocultar
- Responsive

Componente:

```
CrosshairPreview.tsx
```

---

## 📊 Stats

Permite buscar jugadores utilizando:

- Steam
- FACEIT

### Steam

Funciona correctamente.

Información mostrada:

- Avatar
- Nombre
- Perfil
- Nivel
- Última actualización

Componente:

```
SteamCard.tsx
```

---

### FACEIT

Información disponible:

- Avatar
- Nickname
- Level
- ELO
- Matches
- Wins
- Losses
- Win Rate
- KD Ratio
- Headshot %
- Última actualización

Componente:

```
FaceitCard.tsx
```

---

### PlayerFetcher

Incluye:

- Formulario de búsqueda
- Botón Buscar
- Botón Refresh
- Loading
- Manejo de errores
- Cards responsive

---

## ⚙️ Config Manager

Permite:

- Crear configuraciones
- Guardar JSON
- Editar
- Persistencia LocalStorage

---

## 📝 Notes

Permite:

- Crear notas
- Guardarlas automáticamente
- LocalStorage

---

# 🔧 API

## Steam API

Estado:

✅ Funcionando

---

## FACEIT API

Estado:

⚠️ Parcialmente funcionando.

Problema actual:

```
GET /players/{nickname}/stats?game=cs2
```

retorna errores 400.

Pendiente:

- Revisar autenticación
- Revisar endpoint
- Verificar si debe utilizar Player ID
- Mejorar manejo de errores

Actualmente existe fallback cuando falla la API.

---

# 📁 Componentes

```
CrosshairPreview.tsx
FaceitCard.tsx
SteamCard.tsx
MapCard.tsx
PlayerFetcher.tsx
```

---

# 📁 Estructura

```
cs2-hub/

app/
components/
public/
    maps/
        backgrounds/
        icons/

lib/
types/

.github/
    workflows/

next.config.ts
package.json
```

---

# 💾 Persistencia

Actualmente toda la información se guarda mediante:

- LocalStorage

No existe backend ni base de datos.

---

# 🚀 Deployment

Configurado para:

- GitHub Pages
- Vercel

## Build

```
npm run build
```

## Desarrollo

```
npm run dev
```

## Producción local

```
npm start
```

## Lint

```
npm run lint
```

---

# 🌐 Variables de entorno

Desarrollo:

```
STEAM_API_KEY=
FACEIT_API_KEY=
```

GitHub Pages:

No utiliza variables de entorno porque es un sitio estático.

Para utilizar APIs dinámicas se recomienda Vercel.

---

# 📦 Build

Estado:

✅ Compila correctamente.

Resultado:

- TypeScript sin errores
- Static Export funcionando
- Responsive correcto

---

# ⚠️ Problemas conocidos

## FACEIT

- Algunos nicknames devuelven 404.
- El endpoint de estadísticas devuelve 400.
- Debe revisarse la API v4.

---

## Imágenes

Train y Vertigo utilizan backgrounds temporales.

Pendiente reemplazarlos por imágenes reales.

---

# 📈 Performance

- Carga aproximada: 300 ms
- Responsive funcionando
- Imágenes optimizadas para Static Export

Advertencia menor:

- LCP en imágenes (no crítico).

---

# 🚨 Prioridades del Proyecto (Actualizado)

## 🔴 PRIORIDAD CRÍTICA

El desarrollo de nuevas funcionalidades queda en segundo plano hasta mejorar completamente la experiencia de usuario.

El objetivo principal es convertir CS2 Hub en una aplicación con apariencia profesional, moderna y orientada al aprendizaje de Counter-Strike 2.

La inspiración visual principal debe ser:

- FACEIT
- ProSettings
- Leetify
- Scope.gg

Manteniendo siempre:

- Tema oscuro.
- Colores negros y grises.
- Naranja como color principal de acento.
- Azul únicamente para elementos secundarios.
- Diseño limpio.
- Excelente rendimiento.
- Sin animaciones pesadas.

---

# 🎨 Rediseño General

Toda la aplicación debe compartir el mismo lenguaje visual.

Objetivos:

- Sidebar mucho más moderna y profesional.
- Mejor distribución de espacios.
- Cards consistentes.
- Tipografía clara.
- Componentes reutilizables.
- Bordes y sombras uniformes.
- Mejor experiencia en desktop y mobile.
- Placeholders cuando aún no exista contenido.
- Nunca dejar secciones vacías.

Los mapas actuales son el ejemplo visual que debe seguir el resto de la aplicación.

---

# 🗺️ Pestaña Mapas (Máxima Prioridad)

La pantalla principal de mapas funciona muy bien visualmente.

Al ingresar a un mapa actualmente la información se siente desordenada.

Debe rediseñarse completamente.

## Cada mapa deberá contener

### Header

- Imagen grande del mapa.
- Nombre.
- Calls principales sobre la imagen.
- Overlay oscuro.

---

### Información General

Mostrar:

- Descripción.
- Dificultad.
- Ritmo.
- Estilo de juego.
- Puntos importantes.

---

### Objetivos del mapa

Dividir en dos columnas.

## Terrorist

Explicar:

- Qué busca este lado.
- Qué zonas controlar.
- Cómo se suele ganar el mapa.
- Cuáles son los objetivos principales.

Ejemplo Mirage:

- Ganar medio.
- Presionar Connector.
- Abrir A con utilidades.
- Castigar rotaciones.

---

## Counter-Terrorist

Explicar:

- Qué zonas defender.
- Qué información obtener.
- Cómo negar el control del mapa.
- Cómo jugar las rotaciones.

---

## Dos pestañas principales

Cada mapa tendrá:

- Terrorist
- Counter-Terrorist

Toda la información cambiará dependiendo del lado seleccionado.

---

## Dentro de Terrorist

Mostrar estrategias separadas por tipo de ronda.

- Eco
- Force Buy
- Semi Buy
- Full Buy

Cada estrategia deberá mostrar:

- Nombre.
- Objetivo.
- Explicación paso a paso.
- Jugadores necesarios.
- Dificultad.

---

## Filtros

Permitir filtrar por:

Ataque

- A
- Medio
- B

Rol

- Entry
- Support
- Lurker
- IGL
- AWP

Contenido disponible

- Smokes
- Flash
- Molotovs
- Executes
- Defaults
- Splits
- Jugadas rápidas

---

## Dentro de Counter-Terrorist

La misma estructura pero orientada a defensa.

Mostrar:

- Defensas.
- Crossfires.
- Retakes.
- Pushes.
- Anti Eco.
- Force.
- Full Buy.

Filtros

- A
- Medio
- B

Rol

- Anchor
- Rotador
- AWP
- Support

---

## Placeholders

Mientras una sección no tenga información real deberá mostrar placeholders bien diseñados.

Nunca dejar espacios vacíos.

---

# 🎯 Pestaña Crosshairs

Debe rediseñarse tomando como referencia páginas como ProSettings.

Objetivos:

- Preview en vivo.
- Canvas grande.
- Copiar código con un clic.
- Crear miras manualmente.
- Editar nombre.
- Guardar favoritas.
- Mejor organización de las cards.
- Búsqueda rápida.

Cada card debería mostrar:

- Preview.
- Nombre.
- Última actualización.
- Botón copiar.
- Código.

---

# ⚙️ Pestaña Config

Debe convertirse en una ficha profesional del jugador.

Inspiración:

- ProSettings
- FACEIT

La información deberá organizarse como una ficha técnica.

## Mouse

- DPI
- Sensibilidad
- Zoom
- Polling Rate
- m_yaw

---

## Video

- Resolución
- Aspect Ratio
- Brillo
- Refresh Rate
- Display Mode

---

## Video Avanzado

Mostrar todos los parámetros de CS2.

---

## Viewmodel

---

## HUD

---

## Radar

---

## Launch Options

---

## Crosshair

Con preview integrado.

---

## Descarga

Todo el config debe poder descargarse con un solo clic.

El diseño deberá ser similar al ejemplo de referencia, sin incluir publicidad.

---

# 📊 Pestaña Estadísticas

Luego del rediseño visual se continuará mejorando la sección de estadísticas.

Objetivos futuros:

- Historial de partidas.
- Evolución de ELO.
- Gráficos.
- Comparativas.
- Tendencias.
- Más estadísticas del jugador.

---

# 🟠 Prioridad Media

## FACEIT API

Actualmente presenta problemas de integración.

No es una prioridad inmediata.

Pendiente:

- Revisar autenticación.
- Verificar endpoint correcto.
- Revisar Player ID.
- Mejorar manejo de errores.

Mientras tanto el resto de la aplicación debe seguir evolucionando independientemente de FACEIT.

---

# 🟢 Prioridad Baja

## Optimización

- Performance.
- Imágenes.
- LCP.
- Refactor interno.
- Limpieza del código.

---

# 🎯 Objetivo del Proyecto

CS2 Hub no debe ser solamente un lugar para guardar configuraciones.

Debe convertirse en una plataforma completa para jugadores de Counter-Strike 2.

El usuario debería poder encontrar en un único lugar:

- Mapas.
- Estrategias.
- Utilidades.
- Smokes.
- Flash.
- Molotovs.
- Executes.
- Crosshairs.
- Configuraciones.
- Estadísticas.
- Recursos de aprendizaje.

Todas las secciones deberán compartir el mismo diseño visual, manteniendo una estética moderna inspirada en FACEIT y priorizando siempre la experiencia de usuario antes que agregar nuevas funcionalidades.

# ✅ Estado actual

Proyecto completamente funcional.

Implementado:

- ✅ Mapas
- ✅ Crosshair Manager
- ✅ Config Manager
- ✅ Notes
- ✅ Steam Stats
- ✅ Responsive
- ✅ LocalStorage
- ✅ GitHub Pages
- ✅ Static Export

Pendiente únicamente:

- Finalizar integración completa con FACEIT.