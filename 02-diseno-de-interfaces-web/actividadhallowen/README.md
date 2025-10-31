# The Nightmare Before Christmas - Proyecto de Accesibilidad Web 🎃🎄

## Descripción del Proyecto

Este es mi proyecto de **Diseño de Interfaces Web** para 2º de DAW. He creado una página web accesible sobre la película "The Nightmare Before Christmas" de Tim Burton, aplicando todo lo que hemos aprendido sobre accesibilidad web y los principios WCAG 2.1.

## 📁 Estructura del Proyecto

```
actividadhallowen/
├── index.html           # Página de inicio
├── personajes.html      # Galería de personajes
├── pelicula.html        # Información sobre la película
├── contacto.html        # Formulario de contacto
├── css/
│   └── estilos.css      # Estilos con diseño accesible
├── js/
│   ├── accesibilidad.js # Script para tema y tamaño de fuente
│   └── formulario.js    # Validación del formulario
└── README.md           # Este archivo
```

## 🎯 Objetivos Cumplidos

### 1. Perceptible
- ✅ **Alternativas textuales**: He usado `aria-label` en los emojis de personajes para describir cómo son
- ✅ **Contraste de colores**: Colores con contraste alto (mínimo 4.5:1) para que se lea bien
- ✅ **Texto alternativo**: Todos los elementos visuales tienen descripciones
- ✅ **Subtítulos**: El vídeo tiene transcripción completa para personas con problemas de audición

### 2. Operable
- ✅ **Navegación por teclado**: Todo funciona con Tab, Shift+Tab, Enter y Espacio
- ✅ **Foco visible**: Se ve claramente dónde estás cuando navegas con teclado (borde naranja)
- ✅ **Skip link**: Hay un enlace oculto al principio para saltar directamente al contenido
- ✅ **Botones grandes**: Todos los botones tienen mínimo 44x44px (recomendación WCAG)
- ✅ **Sin trampas de teclado**: No hay ningún sitio donde te quedes atascado navegando

### 3. Comprensible
- ✅ **Idioma declarado**: `lang="es"` en todas las páginas
- ✅ **Navegación consistente**: El menú es igual en todas las páginas
- ✅ **Etiquetas claras**: Todos los campos del formulario tienen su etiqueta asociada
- ✅ **Validación del formulario**: Los errores se explican claramente en español
- ✅ **Instrucciones**: Hay textos de ayuda que explican qué poner en cada campo

### 4. Robusto
- ✅ **HTML5 semántico**: Uso de `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- ✅ **Roles ARIA**: He usado `role="banner"`, `role="navigation"`, `role="main"`, etc.
- ✅ **Live regions**: Los mensajes de error y éxito se anuncian automáticamente
- ✅ **Validado**: El HTML está bien formado y sin errores

## ♿ Características de Accesibilidad Específicas

### Para Personas con Discapacidad Visual
- **Lectores de pantalla compatibles**: Funciona con NVDA, JAWS y VoiceOver
- **Descripciones detalladas**: Los personajes tienen descripciones completas
- **Estructura clara**: Los encabezados están bien jerarquizados (H1 > H2 > H3)
- **Controles de accesibilidad**: Botones para aumentar/disminuir el tamaño de texto

### Para Personas con Discapacidad Auditiva
- **Transcripción completa**: El tráiler tiene toda la transcripción escrita
- **Contenido textual**: Toda la información importante está en texto, no solo en vídeo

### Para Personas con Discapacidad Motórica
- **Navegación completa por teclado**: No hace falta el ratón para nada
- **Botones grandes**: Fáciles de pulsar (44x44px mínimo)
- **Áreas de clic amplias**: Los enlaces tienen buen padding
- **Sin límites de tiempo**: No hay contenido que desaparezca rápido

### Para Personas con Discapacidad Cognitiva
- **Lenguaje sencillo**: He intentado escribir claro y sin palabras raras
- **Iconos visuales**: Los emojis ayudan a identificar las secciones
- **Estructura clara**: No hay popups molestos ni cosas que distraigan
- **Colores consistentes**: Los mismos colores significan lo mismo en toda la web

## 🎨 Características de Diseño

- **Tema oscuro/claro**: Botón para cambiar entre los dos temas
- **Tamaño de fuente ajustable**: Botones A+ y A- para cambiar el tamaño
- **Preferencias guardadas**: Se recuerdan tus preferencias con localStorage
- **Diseño responsive**: Se ve bien en móvil, tablet y ordenador
- **Animaciones opcionales**: Respeta la preferencia `prefers-reduced-motion`

## 🔧 Tecnologías Usadas

- **HTML5**: Con etiquetas semánticas y atributos ARIA
- **CSS3**: Con variables CSS, Grid, Flexbox y media queries
- **JavaScript vanilla**: Sin frameworks, solo JS puro
- **localStorage**: Para guardar las preferencias del usuario

## 📝 Comentarios en el Código

He puesto comentarios en todo el código explicando qué hace cada cosa y por qué es importante para la accesibilidad. Por ejemplo:

```html
<!-- Skip link para ir directo al contenido principal (ayuda a lectores de pantalla) -->
<a href="#contenido-principal" class="skip-link">Saltar al contenido principal</a>
```

```css
/* Foco visible para navegación por teclado - MUY IMPORTANTE */
.nav-menu a:focus {
    outline: 3px solid var(--color-acento);
    outline-offset: 2px;
}
```

## 🧪 Pruebas Realizadas

He probado la web con:
- ✅ Navegación solo con teclado (Tab, Shift+Tab, Enter, Espacio)
- ✅ Zoom del navegador al 200%
- ✅ Modo oscuro y claro
- ✅ Diferentes tamaños de pantalla (responsive)
- ✅ Validador HTML de W3C

## 💭 Reflexión Personal

Ha sido un proyecto interesante porque nunca me había parado a pensar en lo importante que es la accesibilidad. Hay un montón de gente que no puede usar webs "normales" si no están bien hechas.

Lo que más me ha costado ha sido acordarme de poner todos los atributos ARIA y las etiquetas correctamente, sobre todo en el formulario. Pero he aprendido que es súper importante para que los lectores de pantalla funcionen bien.

También me he dado cuenta de que la accesibilidad no solo ayuda a personas con discapacidad, sino a todo el mundo. Por ejemplo, el contraste alto se ve mejor, los botones grandes son más fáciles de pulsar en el móvil, y el texto claro es más rápido de leer.

## 🎓 Conclusiones

### Lo que he aprendido:
1. La importancia del HTML semántico (usar las etiquetas correctas)
2. Cómo funcionan los atributos ARIA y cuándo usarlos
3. Que la navegación por teclado es fundamental
4. La importancia del contraste de colores
5. Que la accesibilidad beneficia a todos, no solo a personas con discapacidad

### Medidas de accesibilidad aplicadas:
- **Perceptible**: Texto alternativo, contraste alto, transcripciones
- **Operable**: Navegación por teclado, foco visible, botones grandes
- **Comprensible**: Idioma declarado, etiquetas claras, validación útil
- **Robusto**: HTML semántico, ARIA, compatible con tecnologías de asistencia

## 📚 Referencias

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs - Accessibility](https://developer.mozilla.org/es/docs/Web/Accessibility)
- [WebAIM - Recursos de accesibilidad](https://webaim.org/)

---

**Alumno**: Proyecto de 2º DAW  
**Asignatura**: Diseño de Interfaces Web  
**Fecha**: Octubre 2025  
**Tema**: The Nightmare Before Christmas - Accesibilidad Web

