# CS2 Hub - Context
**Última actualización:** 27 Junio 2026

---

# 📌 Estado General

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

- 10 mapas competitivos:
  - Dust2, Mirage, Nuke, Ancient, Inferno, Overpass, Anubis, Cache, Train, Vertigo

- Grid responsive: 4 columnas desktop / 2 tablet / 1 mobile
- Backgrounds JPG en `/public/maps/backgrounds/`
- Iconos/logos para cada mapa
- MapCard con hover effects y transiciones smooth

---

## 🎯 Crosshair Manager

✅ Completamente rediseñado e implementado.

Permite:
- Crear miras
- Buscar miras
- Guardar automáticamente
- Copiar código con un clic
- Persistencia mediante LocalStorage

Diseño:
- Layout de dos columnas
- Formulario simplificado (Nombre, Código, Descripción)
- Eliminado campo Equipo (CT/T/Both)
- Mejor organización visual de cards
- Búsqueda rápida

Preview:
- Canvas grande con renderizado en tiempo real
- Parseo del código de la mira
- Fondo estilo CS2
- Toggle mostrar/ocultar
- Responsive

Componente: `CrosshairPreview.tsx`

---

## 📊 Stats

### Steam
✅ Funcionando correctamente.

Información mostrada:
- Avatar, Nombre, Perfil URL
- SteamID64, Vanity URL, Friend Code
- Nivel XP, País, Fecha de registro
- Amigos, Commendations

### FACEIT
✅ Integración completa y funcionando.

Correcciones realizadas (27 Jun 2026):
- URL base corregida: `/api/v4/` → `/data/v4/`
- Endpoint de stats corregido: `?game=cs2` → `/cs2` (path param)
- Flujo corregido: nickname → player_id → stats
- Campos del response alineados con los que espera el componente
- `Recent Results` mapeado correctamente de `"1"/"0"` a `W/L`
- Header de autenticación: `Authorization: Bearer ${process.env.FACEIT_API_KEY}`

Información mostrada:
- Nickname, País, Fecha de registro
- ELO, Nivel, Peak ELO
- Partidas, Winrate, HS%, K/D
- ADR, UDR, Clutch 1v1, Clutch 1v2
- Últimas partidas (W/L)

Componentes: `FaceitCard.tsx`, `SteamCard.tsx`, `PlayerFetcher.tsx`

### CS2 Performance
- Requiere perfil público con estadísticas habilitadas en Steam
- Muestra: Aim, Utility, Position, Clutch, Opening, Party, K/D, Rating, Peak Rating

---

## ⚙️ Config Manager

- Crear configuraciones con JSON settings
- Guardar y editar
- Persistencia LocalStorage

---

## 📝 Notes

- Crear notas y guardarlas automáticamente
- LocalStorage

---

# 🔧 API

## Steam API
✅ Funcionando

Endpoints utilizados:
- `GetPlayerSummaries` — perfil
- `GetSteamLevel` — nivel XP
- `GetFriendList` — amigos
- `ResolveVanityURL` — resolver vanity
- `GetUserStatsForGame` — stats CS2

## FACEIT API
✅ Funcionando (corregido el 27 Jun 2026)

Flujo correcto:
1. `GET https://open.faceit.com/data/v4/players?nickname={nickname}` → obtener `player_id`
2. `GET https://open.faceit.com/data/v4/players/{player_id}/stats/cs2` → estadísticas
3. `GET https://open.faceit.com/data/v4/players/{player_id}/history?game=cs2&limit=5` → historial

Variables de entorno requeridas:
```
STEAM_API_KEY=
FACEIT_API_KEY=
```

---

# 📁 Estructura del Proyecto

```
cs2-hub/
├── app/
│   ├── api/
│   │   └── stats/
│   │       └── route.ts        ← API route principal (Steam + FACEIT)
│   ├── stats/
│   │   └── page.tsx
│   ├── crosshairs/
│   ├── configs/
│   ├── notes/
│   └── maps/
├── components/
│   ├── stats/
│   │   ├── PlayerFetcher.tsx
│   │   ├── FaceitCard.tsx
│   │   └── SteamCard.tsx
│   ├── crosshairs/
│   ├── layout/
│   ├── maps/
│   └── ui/
├── public/
│   └── maps/
│       ├── backgrounds/        ← 10 JPGs
│       └── icons/
├── lib/
├── types/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .env.local
├── next.config.ts
└── package.json
```

---

# 💾 Persistencia

Toda la información se guarda mediante LocalStorage. No existe backend ni base de datos.

---

# 🚀 Deployment

Configurado para GitHub Pages y Vercel.

```bash
npm run dev      # Desarrollo (http://localhost:3000)
npm run build    # Build para producción
npm start        # Ejecutar build local
npm run lint     # Verificar código
```

Build produce carpeta `/out` lista para hosting.
GitHub Actions automático en cada push a main.

---

# 📊 Performance

- Carga aproximada: ~300ms (localhost)
- Responsive funcionando
- Imágenes optimizadas para Static Export
- ⚠️ LCP warning en imágenes (no crítico)

---

# 🎨 Diseño y Estilo

Inspiración visual principal: FACEIT, ProSettings, Leetify, Scope.gg

Reglas de diseño:
- Tema oscuro siempre
- Colores base: negros y grises
- Naranja como color de acento principal
- Azul solo para elementos secundarios
- Diseño limpio, sin animaciones pesadas

---

# 🚨 Prioridades del Proyecto

## 🔴 Alta Prioridad

### Pestaña Mapas
Al ingresar a un mapa individual, rediseñar completamente:
- Header con imagen grande, nombre y callouts con overlay oscuro
- Información general: descripción, dificultad, ritmo, estilo de juego
- Dos pestañas: Terrorist / Counter-Terrorist
- Estrategias por tipo de ronda: Eco, Force, Semi Buy, Full Buy
- Filtros por zona (A / Mid / B) y rol (Entry, Support, Lurker, IGL, AWP)
- Placeholders cuando no haya contenido real

---

## 🟡 Media Prioridad

### Pestaña Crosshairs
✅ Ya rediseñada. Posibles mejoras futuras:
- Preview aún más grande
- Favoritas destacadas

### Pestaña Config
Convertir en ficha profesional del jugador (inspiración ProSettings / FACEIT):
- Mouse (DPI, sens, zoom, polling rate, m_yaw)
- Video (resolución, aspect ratio, brillo, refresh rate, display mode)
- Video avanzado (todos los parámetros CS2)
- Viewmodel, HUD, Radar, Launch Options
- Crosshair con preview integrado
- Descarga de config con un clic

### Pestaña Estadísticas
Mejoras futuras:
- Historial de partidas
- Evolución de ELO
- Gráficos y comparativas
- Tendencias

---

## 🟢 Baja Prioridad

- Optimización de performance
- Refactor interno y limpieza de código

---

# ✅ Estado Actual

| Funcionalidad | Estado |
|---|---|
| Mapas (grid) | ✅ Completo |
| Mapa individual (detalle) | 🔴 Pendiente rediseño |
| Crosshair Manager | ✅ Completo y rediseñado |
| Config Manager | ✅ Funcional |
| Steam Stats | ✅ Funcionando |
| FACEIT Stats | ✅ Funcionando (corregido 27 Jun 2026) |
| Responsive | ✅ Completo |
| LocalStorage | ✅ Completo |
| GitHub Pages / Vercel | ✅ Configurado |
| Static Export | ✅ Funcionando |