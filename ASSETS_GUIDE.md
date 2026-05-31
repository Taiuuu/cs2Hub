# Guía: Agregar Imágenes de Mapas

## Estructura de carpetas

```
public/
└── maps/
    ├── backgrounds/     (JPG - fondos de tarjetas)
    ├── icons/          (PNG - logos de mapas)
    └── gameRadar/      (PNG - minimapas del juego)
```

## Pasos para agregar las imágenes

### 1. Fondos de mapas (`/public/maps/backgrounds/`)

Coloca un JPG para cada mapa con el nombre del ID:
- `dust2.jpg`
- `mirage.jpg`
- `nuke.jpg`
- `inferno.jpg`
- `ancient.jpg`
- `anubis.jpg`
- `cache.jpg`
- `overpass.jpg`
- `train.jpg`
- `vertigo.jpg`

**Especificaciones:**
- Formato: JPG/JPEG
- Tamaño: 800x1000px (relación 3:4)
- Peso: < 150KB cada una
- Contenido: Screenshot, render o imagen representativa del mapa

### 2. Logos de mapas (`/public/maps/icons/`)

Coloca un PNG con transparencia para cada mapa:
- `dust2.png`
- `mirage.png`
- `nuke.png`
- `inferno.png`
- `ancient.png`
- `anubis.png`
- `cache.png`
- `overpass.png`
- `train.png`
- `vertigo.png`

**Especificaciones:**
- Formato: PNG con transparencia
- Tamaño: 200x200px (cuadrado)
- Peso: < 50KB cada una
- Contenido: Logo del mapa centrado sobre fondo transparente

### 3. Game Radar (`/public/maps/gameRadar/`)

Opcional: Coloca el radar del mapa (usado en la página de detalles):
- `mirage_gameradar.png`
- etc.

**Especificaciones:**
- Formato: PNG con transparencia
- Tamaño: 512x512px
- Peso: < 100KB
- Contenido: Minimap del juego en Counter-Strike

## Cómo funciona

Una vez agregues las imágenes en las carpetas correctas, el grid de mapas se actualiza automáticamente. El componente `MapCard` busca:

- **Fondo**: `/maps/backgrounds/{mapId}.jpg`
- **Icono**: `/maps/icons/{mapId}.png`

Donde `mapId` es: `dust2`, `mirage`, `nuke`, `inferno`, `ancient`, `anubis`, `cache`, `overpass`, `train`, `vertigo`

## Validación

Después de agregar las imágenes:
1. Guarda los archivos
2. Recarga la página `/maps`
3. Las tarjetas mostrarán el grid responsive con hover effects

Si una imagen no existe, se mostrará un placeholder gris.

## Recursos

Para obtener imágenes de mapas de CS2:
- **Fondos**: Capturas de pantalla del juego en máximas gráficas
- **Logos**: Logos oficiales de Valve o diseños personalizados
- **Radares**: Minimapas descargables de la comunidad o mapas del juego

---

**Nota**: Las imágenes se sirven desde `public/` directamente en Next.js, así que los paths son relativos a `/maps/backgrounds/`, `/maps/icons/`, etc.
