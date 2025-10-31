# 🚀 Cómo Abrir y Ver el Proyecto

## Opción 1: Abrir Directamente en el Navegador (Recomendado)

1. Ve a la carpeta `actividadhallowen`
2. Haz doble clic en `index.html`
3. Se abrirá en tu navegador predeterminado
4. Navega entre las páginas usando el menú

## Opción 2: Usar un Servidor Local

Si quieres usar un servidor local (no es necesario para este proyecto, pero es buena práctica):

### Con Python (si lo tienes instalado):
```bash
cd /Users/angel/Desktop/curso_2025/02-diseno-de-interfaces-web/actividadhallowen
python3 -m http.server 8000
```
Luego abre: `http://localhost:8000`

### Con Node.js y Live Server:
```bash
npx live-server
```

### Con PHP:
```bash
php -S localhost:8000
```

## 🧪 Cómo Probar la Accesibilidad

### 1. Navegación con Teclado
- Pulsa **Tab** para avanzar entre elementos
- Pulsa **Shift + Tab** para retroceder
- Pulsa **Enter** para activar enlaces y botones
- Pulsa **Espacio** para marcar checkboxes y radio buttons
- Observa el borde naranja que indica dónde estás

### 2. Controles de Accesibilidad
En el menú superior derecha encontrarás:
- **🌙 Tema**: Cambia entre tema oscuro y claro
- **A+**: Aumenta el tamaño del texto
- **A-**: Disminuye el tamaño del texto

### 3. Zoom del Navegador
- En Chrome/Firefox: **Ctrl** + **+** para zoom in, **Ctrl** + **-** para zoom out
- En Mac: **Cmd** + **+** y **Cmd** + **-**
- Prueba a hacer zoom hasta 200% - todo debe seguir viéndose bien

### 4. Probar el Formulario
Ve a la página de **Contacto** y:
- Intenta enviar el formulario vacío (verás los errores)
- Escribe un email mal escrito (ej: "prueba@com")
- Navega solo con teclado
- Observa cómo se anuncian los errores

### 5. Skip Link
- Pulsa **Tab** nada más cargar la página
- Verás aparecer "Saltar al contenido principal"
- Pulsa **Enter** y saltará directamente al contenido

## 📱 Probar en Diferentes Dispositivos

### Modo Responsive en Chrome
1. Abre las DevTools: **F12** o **Cmd + Option + I**
2. Click en el icono de dispositivos móviles (o **Ctrl + Shift + M**)
3. Prueba diferentes tamaños: iPhone, iPad, etc.

## 🔍 Validar el Código

### Validar HTML
1. Ve a: https://validator.w3.org/#validate_by_upload
2. Sube cualquiera de los archivos HTML
3. Debería pasar sin errores

### Comprobar Contraste
1. Ve a: https://webaim.org/resources/contrastchecker/
2. Introduce los colores:
   - Texto: #e0e0e0
   - Fondo: #1a0933
3. Verifica que pasa los estándares AA

## 🎯 Qué Deberías Ver

### Página de Inicio
- Header con título y subtítulo
- Menú de navegación sticky
- Controles de accesibilidad
- 3 tarjetas informativas sobre Halloween Town
- Lista de características especiales
- Botones para explorar más
- Footer con información

### Página de Personajes
- Galería con 6 personajes principales
- Cada personaje tiene emoji, nombre, rol y descripción
- Tarjetas que hacen hover effect
- Información sobre personajes secundarios

### Página de Película
- Datos técnicos de la película
- Historia completa dividida en secciones
- Vídeo embebido de YouTube
- Transcripción desplegable del tráiler
- Curiosidades sobre la película

### Página de Contacto
- Formulario completo con validación
- Campos: nombre, email, asunto, personaje favorito, mensaje
- Checkboxes para newsletter y privacidad
- Botones de enviar y limpiar
- Mensajes de error y éxito

## 🎨 Características Visuales a Observar

### Tema Oscuro (por defecto)
- Fondo morado oscuro con degradados
- Texto blanco/gris claro
- Acentos en naranja y morado

### Tema Claro
- Fondo gris muy claro
- Texto oscuro
- Mantiene los mismos acentos

### Animaciones
- Los emojis de personajes flotan suavemente
- Las tarjetas hacen efecto hover
- Los botones se elevan al pasar el ratón
- El menú tiene transiciones suaves

## 🐛 Solución de Problemas

### Los estilos no se ven
- Comprueba que la carpeta `css` está en el mismo nivel que los HTML
- Verifica que el archivo se llama `estilos.css`

### El JavaScript no funciona
- Comprueba que la carpeta `js` está en el mismo nivel
- Verifica que los archivos se llaman `accesibilidad.js` y `formulario.js`
- Abre la consola del navegador (F12) y busca errores

### Las preferencias no se guardan
- Comprueba que el navegador permite localStorage
- En modo incógnito puede que no funcione

## 📚 Archivos del Proyecto

```
actividadhallowen/
├── index.html                        # Página principal
├── personajes.html                   # Galería de personajes
├── pelicula.html                     # Info de la película
├── contacto.html                     # Formulario
├── README.md                         # Documentación principal
├── EXPLICACION_ACCESIBILIDAD.md     # Explicación detallada
├── INSTRUCCIONES.md                  # Este archivo
├── css/
│   └── estilos.css                  # Todos los estilos
└── js/
    ├── accesibilidad.js             # Tema y tamaño de fuente
    └── formulario.js                # Validación del formulario
```

## ✅ Checklist de Pruebas

- [ ] He abierto las 4 páginas HTML
- [ ] He navegado entre páginas usando el menú
- [ ] He probado la navegación con teclado (Tab)
- [ ] He cambiado el tema claro/oscuro
- [ ] He aumentado y disminuido el tamaño de fuente
- [ ] He enviado el formulario con errores
- [ ] He enviado el formulario correctamente
- [ ] He probado el zoom al 200%
- [ ] He visto la transcripción del vídeo
- [ ] He comprobado que funciona en móvil (responsive)

## 🎓 Para Entregar

Si tienes que entregar este proyecto:

1. **Comprimir la carpeta**: 
   - Clic derecho en `actividadhallowen` > Comprimir
   - Se creará `actividadhallowen.zip`

2. **Documentos incluidos**:
   - ✅ 4 archivos HTML
   - ✅ 1 archivo CSS
   - ✅ 2 archivos JavaScript
   - ✅ README.md (documentación principal)
   - ✅ EXPLICACION_ACCESIBILIDAD.md (explicación detallada)
   - ✅ Este archivo de instrucciones

3. **Opcional - Screenshots**:
   Puedes hacer capturas de pantalla de cada página para incluir en la documentación

---

¡Espero que el proyecto te sirva! Está todo listo para usar y entregar.

**Nota**: Si encuentras algún bug o algo que mejorar, solo tienes que editar los archivos correspondientes. Todo está comentado para que sea fácil de entender.

