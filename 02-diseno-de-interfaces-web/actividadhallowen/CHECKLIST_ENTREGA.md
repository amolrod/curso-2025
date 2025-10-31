# ✅ CHECKLIST DE ENTREGA - Proyecto Halloween

## 📋 Antes de Entregar

### Archivos Obligatorios
- [x] `index.html` - Página de inicio
- [x] `personajes.html` - Página de personajes
- [x] `pelicula.html` - Página de la película
- [x] `contacto.html` - Página de contacto (formulario)
- [x] `css/estilos.css` - Hoja de estilos
- [x] `js/accesibilidad.js` - Script de accesibilidad
- [x] `js/formulario.js` - Script de validación

### Documentación
- [x] `README.md` - Documentación principal del proyecto
- [x] `EXPLICACION_ACCESIBILIDAD.md` - Explicación detallada de medidas
- [x] `INSTRUCCIONES.md` - Cómo usar el proyecto
- [x] `RESUMEN_PROYECTO.md` - Resumen visual

### Verificación de Código
- [x] HTML5 semántico usado en todas las páginas
- [x] Etiquetas `<header>`, `<nav>`, `<main>`, `<footer>` presentes
- [x] Atributos `lang="es"` en todos los HTML
- [x] Todos los enlaces funcionan
- [x] Todos los scripts cargan correctamente
- [x] CSS enlazado correctamente en todas las páginas

### Accesibilidad - WCAG 2.1 Nivel A
- [x] Texto alternativo en elementos visuales
- [x] Navegación por teclado completa
- [x] Contraste de color adecuado
- [x] Idioma de la página declarado
- [x] Etiquetas de formulario correctas

### Accesibilidad - WCAG 2.1 Nivel AA
- [x] Contraste mejorado (4.5:1)
- [x] Redimensión de texto funcional
- [x] Foco visible en todos los elementos
- [x] Instrucciones claras en formulario
- [x] Sugerencias de error útiles

### Funcionalidades
- [x] Cambio de tema claro/oscuro funciona
- [x] Botones A+ y A- cambian el tamaño de fuente
- [x] Las preferencias se guardan en localStorage
- [x] Formulario valida todos los campos
- [x] Los errores se muestran claramente
- [x] El formulario se puede enviar correctamente
- [x] Skip link funciona (Tab al inicio)

### Responsive Design
- [x] Se ve bien en móvil (< 768px)
- [x] Se ve bien en tablet (768px - 1024px)
- [x] Se ve bien en desktop (> 1024px)
- [x] Media queries implementadas
- [x] Grid y Flexbox responsive

### Testing
- [x] Probado en Chrome/Firefox/Safari
- [x] Navegación solo con teclado testeada
- [x] Zoom al 200% comprobado
- [x] Formulario con errores testeado
- [x] Skip link verificado
- [x] Temas claro/oscuro probados
- [x] Controles de tamaño de fuente verificados

### Código Limpio
- [x] Comentarios explicativos en HTML
- [x] Comentarios en CSS
- [x] Comentarios en JavaScript
- [x] Indentación correcta
- [x] Sin código comentado innecesario
- [x] Sin console.log olvidados

---

## 📦 PREPARAR PARA ENTREGAR

### Paso 1: Verificar Estructura
```
actividadhallowen/
├── contacto.html
├── index.html
├── pelicula.html
├── personajes.html
├── README.md
├── EXPLICACION_ACCESIBILIDAD.md
├── INSTRUCCIONES.md
├── RESUMEN_PROYECTO.md
├── css/
│   └── estilos.css
└── js/
    ├── accesibilidad.js
    └── formulario.js
```

### Paso 2: Prueba Final
1. [ ] Abrir `index.html` en el navegador
2. [ ] Navegar a las 4 páginas usando el menú
3. [ ] Cambiar el tema
4. [ ] Cambiar el tamaño de fuente
5. [ ] Rellenar el formulario
6. [ ] Navegar con Tab por todas las páginas
7. [ ] Verificar que el skip link aparece con Tab

### Paso 3: Comprimir
```bash
# Desde la carpeta padre (02-diseno-de-interfaces-web)
zip -r actividadhallowen.zip actividadhallowen/
```

O en Mac:
- Clic derecho en la carpeta `actividadhallowen`
- "Comprimir actividadhallowen"
- Se creará `actividadhallowen.zip`

### Paso 4: Verificar el ZIP
1. [ ] Descomprimir en otra ubicación
2. [ ] Abrir `index.html` del ZIP descomprimido
3. [ ] Verificar que todo funciona igual

---

## 📝 CONTENIDO DEL README (Verificar)

El README debe incluir:
- [x] Título del proyecto
- [x] Descripción general
- [x] Estructura de archivos
- [x] Objetivos cumplidos (4 principios WCAG)
- [x] Características de accesibilidad específicas
- [x] Características de diseño
- [x] Tecnologías usadas
- [x] Reflexión personal
- [x] Conclusiones

---

## 🎓 EVALUACIÓN - Criterios Esperados

### HTML (25%)
- [x] Uso correcto de etiquetas semánticas
- [x] 4 páginas HTML interconectadas
- [x] Código validado
- [x] Atributos ARIA correctos

### CSS (25%)
- [x] Diseño atractivo y coherente
- [x] Contraste alto
- [x] Responsive design
- [x] Foco visible
- [x] Código organizado

### JavaScript (20%)
- [x] Funcionalidad de accesibilidad
- [x] Validación de formulario
- [x] Sin errores en consola
- [x] Código comentado

### Accesibilidad (25%)
- [x] Cumplimiento WCAG 2.1 AA
- [x] Navegación por teclado
- [x] Lectores de pantalla compatible
- [x] Transcripción de vídeo
- [x] Formulario accesible

### Documentación (5%)
- [x] README completo
- [x] Explicación de medidas
- [x] Código comentado
- [x] Instrucciones claras

---

## 🚀 PUNTOS EXTRA (Opcional)

- [x] Tema claro/oscuro (¡hecho!)
- [x] localStorage para preferencias (¡hecho!)
- [x] Respeto por prefers-reduced-motion (¡hecho!)
- [x] Transcripción completa de vídeo (¡hecho!)
- [x] Documentación extra detallada (¡hecho!)
- [x] Live regions en formulario (¡hecho!)
- [ ] Modo alto contraste extra (opcional)
- [ ] Versión en otro idioma (opcional)

---

## 🎯 PREGUNTAS TÍPICAS DEL PROFESOR

Prepárate para responder:

### ¿Por qué elegiste este tema?
> "Elegí The Nightmare Before Christmas porque es una película que combina Halloween y Navidad, y me pareció un tema visual e interesante para demostrar accesibilidad web."

### ¿Qué medidas de accesibilidad has aplicado?
> "He aplicado los 4 principios WCAG: Perceptible (contraste alto, alt text), Operable (teclado, foco visible), Comprensible (etiquetas claras, validación) y Robusto (HTML semántico, ARIA)."

### ¿Cómo has probado la accesibilidad?
> "He navegado toda la web solo con teclado, he probado el zoom al 200%, he verificado el contraste de colores, y he usado las DevTools para simular lectores de pantalla."

### ¿Qué dificultades encontraste?
> "Lo más complicado fue acordarme de poner todos los atributos ARIA correctamente y entender cuándo usarlos y cuándo no. También me costó hacer la validación del formulario accesible con los live regions."

### ¿Qué has aprendido?
> "He aprendido que la accesibilidad no es difícil si la piensas desde el principio, y que beneficia a todos los usuarios, no solo a personas con discapacidad. También he visto la importancia del HTML semántico."

---

## ✨ ÚLTIMO REPASO

Antes de entregar, responde SÍ a todas:

- [ ] ¿Funciona todo sin errores?
- [ ] ¿Se puede navegar solo con teclado?
- [ ] ¿El contraste de colores es bueno?
- [ ] ¿El formulario valida correctamente?
- [ ] ¿Los comentarios explican las decisiones?
- [ ] ¿La documentación está completa?
- [ ] ¿Has probado en diferentes navegadores?
- [ ] ¿Has probado el responsive en móvil?
- [ ] ¿El ZIP contiene todos los archivos?
- [ ] ¿Estás orgulloso del resultado?

Si todas las respuestas son SÍ... 

---

## 🎉 ¡LISTO PARA ENTREGAR!

```
╔════════════════════════════════════════════════════╗
║                                                    ║
║  ✅ Proyecto completo y verificado                ║
║  ✅ Accesibilidad WCAG 2.1 AA cumplida            ║
║  ✅ Código limpio y comentado                     ║
║  ✅ Documentación detallada                       ║
║  ✅ Diseño atractivo y funcional                  ║
║                                                    ║
║  🎃 ¡BUEN TRABAJO! 🎄                             ║
║                                                    ║
╚════════════════════════════════════════════════════╝
```

---

**Fecha de creación**: Octubre 2025  
**Alumno**: 2º DAW  
**Asignatura**: Diseño de Interfaces Web  
**Tema**: The Nightmare Before Christmas - Accesibilidad Web

---

## 📧 EN CASO DE DUDAS

Si el profesor pregunta algo o hay que hacer cambios:
- Todo el código está comentado
- Los archivos están organizados
- Es fácil encontrar y modificar cualquier cosa
- La documentación explica cada decisión

**¡Mucha suerte con la entrega!** 🍀

