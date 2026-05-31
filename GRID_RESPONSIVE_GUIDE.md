# Grid Responsive de Mapas - Diseño CS2

## ✅ Cambios Implementados

### 1. Componente `MapCard` (`components/maps/MapCard.tsx`)

Tarjeta individual reutilizable con:
- ✓ Imagen de fondo (JPG)
- ✓ Overlay oscuro con degradado
- ✓ Logo centrado (PNG)
- ✓ Nombre en la parte inferior
- ✓ **Sin información secundaria** (solo imagen → logo → nombre)

#### Interacciones:
- **Hover**: Zoom 1.03, brillo aumentado (+10%), sombra elevada
- **Transición**: 250ms suave
- **Click**: Navega al detalle del mapa

### 2. Página de Mapas (`app/maps/page.tsx`)

Grid responsivo:
- **Desktop** (lg): 4 columnas
- **Tablet** (sm): 2 columnas
- **Mobile**: 1 columna

```html
<!-- Estructura del grid -->
<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <!-- 10 tarjetas MapCard -->
</section>
```

### 3. Estructura de Assets

```
public/maps/
├── backgrounds/        (JPG - fondos de tarjetas)
│   ├── dust2.jpg
│   ├── mirage.jpg
│   ├── nuke.jpg
│   ├── inferno.jpg
│   ├── ancient.jpg
│   ├── anubis.jpg
│   ├── cache.jpg
│   ├── overpass.jpg
│   ├── train.jpg
│   └── vertigo.jpg
│
├── icons/             (PNG - logos)
│   ├── dust2.png
│   ├── mirage.png
│   ├── nuke.png
│   ├── inferno.png
│   ├── ancient.png
│   ├── anubis.png
│   ├── cache.png
│   ├── overpass.png
│   ├── train.png
│   ├── vertigo.png
│   └── placeholder.svg (fallback mientras faltan imágenes)
│
└── gameRadar/         (PNG - minimapas del juego)
    └── mirage_gameradar.png
```

## 📋 Orden de Mapas (Pool Competitivo)

1. **Dust2**
2. **Mirage**
3. **Nuke**
4. **Ancient**
5. **Inferno**
6. **Overpass**
7. **Anubis**
8. **Cache** ← Nuevo
9. **Train**
10. **Vertigo**

## 🚀 Próximos Pasos

### Para completar el grid, necesitas:

1. **Fondos JPG** (obligatorio)
   - 10 imágenes JPG (una por mapa)
   - Tamaño: 800x1000px
   - Coloca en: `/public/maps/backgrounds/`
   - Nombre: `{mapId}.jpg`

2. **Logos PNG** (obligatorio)
   - 10 imágenes PNG con transparencia
   - Tamaño: 200x200px
   - Coloca en: `/public/maps/icons/`
   - Nombre: `{mapId}.png`

3. **Game Radar PNG** (opcional)
   - Minimapa del juego
   - Coloca en: `/public/maps/gameRadar/`
   - Nombre: `mirage_gameradar.png`

### Guía completa en:
📖 [ASSETS_GUIDE.md](./ASSETS_GUIDE.md)

## 🎨 Especificaciones Técnicas

### MapCard - Props

```tsx
interface MapCardProps {
  id: string;           // ID del mapa (dust2, mirage, etc.)
  nombre: string;       // Nombre mostrado (Dust2, Mirage, etc.)
  fondo: string;        // Path a imagen de fondo (/maps/backgrounds/...)
  icono: string;        // Path a icono (/maps/icons/...)
}
```

### Responsive Breakpoints

```
Mobile:    1 columna (100%)
Tablet:    2 columnas (sm:grid-cols-2)
Desktop:   4 columnas (lg:grid-cols-4)
```

### Tamaño de Tarjetas

- **Altura**: 320px (h-80)
- **Ancho**: 100% (responsive)
- **Relación**: ~4:5 (custom)

## 📱 Responsive Design

```css
/* Tailwind classes usadas */
grid gap-6                    /* Espaciado uniforme */
sm:grid-cols-2               /* 2 columnas en tablet */
lg:grid-cols-4               /* 4 columnas en desktop */
rounded-2xl                  /* Bordes redondeados 16px */
hover:scale-105              /* Zoom 1.05 */
hover:shadow-2xl             /* Sombra elevada */
group-hover:brightness-110   /* Brillo +10% */
transition-all duration-250  /* Animación 250ms */
```

## ✨ Características del Hover

```
Antes:
- Sombra: shadow-lg
- Escala: 1.0
- Brillo: 100%

Después:
- Sombra: shadow-2xl
- Escala: 1.05
- Brillo: 110%
- Transición: 250ms
```

---

**Estado**: ✅ Completo y funcional  
**Pendiente**: Agregar imágenes (fondos + logos)

Para preguntas o cambios en el diseño, consulta la documentación en `ASSETS_GUIDE.md`.
