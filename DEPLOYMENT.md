# CS2 Hub - Despliegue en GitHub Pages

## Opción 1: Local (Desarrollo)

```bash
npm run dev
```

Accede a: `http://localhost:3000`

## Opción 2: Build para Producción Local

```bash
npm run build
npm start
```

## Opción 3: GitHub Pages (Recomendado para Hosting)

### Paso 1: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Crea un repositorio llamado `cs2-hub` (o el nombre que prefieras)
3. Copia la URL: `https://github.com/TU_USUARIO/cs2-hub.git`

### Paso 2: Conectar repositorio local

```bash
git remote add origin https://github.com/TU_USUARIO/cs2-hub.git
git branch -M main
git push -u origin main
```

### Paso 3: Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. En "Source", selecciona: **Deploy from a branch**
4. Rama: **main**
5. Carpeta: **/root** (o lo que sugiera)

### Paso 4: Configurar el workflow (Automático)

El archivo `.github/workflows/deploy.yml` ya está configurado. Cada vez que hagas push a `main`:

```bash
git add .
git commit -m "Actualización de features"
git push origin main
```

Se desplegará automáticamente en: `https://TU_USUARIO.github.io/cs2-hub`

---

## Variables de Entorno

Crea un archivo `.env.local` en la raíz con:

```
STEAM_API_KEY=tu_steam_api_key
FACEIT_API_KEY=tu_faceit_api_key
```

**Nota**: En GitHub Pages no se pueden usar variables privadas (solo public). Considera usar una API pública o un backend separado para datos sensibles.

---

## Actualizaciones después del despliegue

### Agregar nuevos mapas:

1. Agregar imagen JPG en `/public/maps/backgrounds/{mapId}.jpg`
2. Agregar icono PNG en `/public/maps/icons/{mapId}.png`
3. Agregar entrada en `/maps/{mapId}/index.ts`
4. Actualizar `/maps/index.ts` para importar el nuevo mapa

### Hacer cambios en componentes:

1. Edita los archivos
2. Ejecuta `npm run dev` para probar localmente
3. Haz push: `git push origin main`
4. El workflow automático compilará y desplegará

---

## Troubleshooting

### La página no se actualiza después de push

- Espera 2-3 minutos para que el workflow termine
- Ve a tu repositorio → Actions para ver el estado
- Si hay error, revisa los logs del workflow

### Las imágenes no cargan en GitHub Pages

- Asegúrate de que las rutas usen `/cs2-hub/maps/...` en lugar de `/maps/...`
- Esto se maneja automáticamente con la configuración `output: "export"`

### Error de compilación

```bash
npm install  # Reinstala dependencias
npm run build  # Compila localmente
```

Si aparecen errores, revisa la terminal antes de hacer push.

---

## Scripts disponibles

```bash
npm run dev      # Desarrollo local
npm run build    # Build para producción
npm start        # Ejecutar build en local
npm run lint     # Verificar código
```
