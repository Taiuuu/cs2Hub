# 🚀 GitHub Pages - Setup Rápido (5 minutos)

## Paso 1: Crear repo en GitHub

```bash
# En GitHub, crea un nuevo repo llamado "cs2-hub"
# O tu nombre preferido
```

## Paso 2: Conectar código

```bash
cd "c:\Users\Usuario\Documents\Proyectos VSCODE\cs2-hub"

# Agregar remoto
git remote add origin https://github.com/TU_USUARIO/cs2-hub.git

# Primera subida
git branch -M main
git add .
git commit -m "Deploy inicial"
git push -u origin main
```

## Paso 3: Configurar GitHub Pages

1. Ve a **https://github.com/TU_USUARIO/cs2-hub/settings**
2. En sidebar → **Pages**
3. **Source** → selecciona: "Deploy from a branch"
4. **Branch** → main / /root
5. **Save**

## Paso 4: Verificar deployment

- Espera 2-3 minutos
- Ve a **Actions** en tu repo para ver el progress
- Tu sitio estará en: `https://TU_USUARIO.github.io/cs2-hub`

---

## Actualizar después

```bash
# Haces cambios locales
git add .
git commit -m "Actualización"
git push origin main

# Se despliega automáticamente en ~2 min
```

---

## Local Development

```bash
npm run dev
# http://localhost:3000
```

---

## Build for Testing

```bash
npm run build
npm start
```

---

## Variables de Entorno

**Para desarrollo**: `.env.local` funciona normal con APIs

**Para GitHub Pages**: NO funciona (static site)
- Las rutas API siguen siendo dinámicas
- Stats page puede fallar sin backend

**Solución**: Usa Vercel en lugar de GitHub Pages si necesitas APIs:

```bash
# Vercel es gratis y toma 30 segundos
# 1. Ve a vercel.com
# 2. Import From Git → selecciona tu repo
# 3. Listo, automático
```

---

## Troubleshooting

**404 en GitHub Pages:**
- Espera 5 min después de push
- Verifica: Pages está habilitado en settings
- Rama correcta (main/master)

**Las imágenes no cargan:**
- Next.js `output: export` usa rutas relativas
- Debería funcionar automáticamente

**API no funciona:**
- Esperado en GitHub Pages (static only)
- Usa Vercel para APIs dinámicas

---

## Archivo de Configuración

`.github/workflows/deploy.yml` ✅ Listo
`next.config.ts` ✅ Configurado para export
