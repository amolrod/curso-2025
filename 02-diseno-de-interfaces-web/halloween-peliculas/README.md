# Peliculas de Terror Clasicas

Proyecto web accesible con tematica Halloween sobre peliculas clasicas de terror.

## Descripcion

Este proyecto es una pagina web simple que presenta un catalogo de peliculas de terror clasicas. El objetivo principal es demostrar principios de accesibilidad web siguiendo las pautas WCAG.

## Estructura del sitio

El sitio web consta de 4 paginas:

1. **index.html** - Pagina de inicio con introduccion y pelicula destacada
2. **catalogo.html** - Listado de peliculas organizadas por decada
3. **pelicula.html** - Ficha detallada de una pelicula (Nosferatu 1922)
4. **contacto.html** - Formulario de contacto para sugerencias

## Caracteristicas de accesibilidad

### Perceptible

- **Texto alternativo**: Todas las imagenes tienen atributos alt descriptivos
- **Contraste**: Relacion de contraste adecuada entre texto y fondo (minimo 4.5:1)
- **Estructura semantica**: Uso correcto de encabezados (h1-h4) en orden jerarquico
- **Transcripciones**: Descripcion textual del contenido visual en la seccion de video

### Operable

- **Navegacion por teclado**: Todo el sitio es navegable usando solo el teclado (Tab, Shift+Tab, Enter)
- **Saltar al contenido**: Enlace invisible que se muestra al recibir foco para saltar la navegacion
- **Foco visible**: Indicador de foco visible en todos los elementos interactivos
- **Botones grandes**: Tamano minimo de 44x44px en todos los botones y enlaces
- **ARIA labels**: Etiquetas ARIA en navegacion y formularios

### Comprensible

- **Lenguaje claro**: Textos redactados de forma simple y directa
- **Etiquetas de formulario**: Todos los campos tienen etiquetas asociadas
- **Ayuda contextual**: Textos de ayuda en campos del formulario
- **Indicador de pagina actual**: aria-current en la navegacion
- **Mensajes de validacion**: Alertas claras en el formulario

### Robusto

- **HTML valido**: Codigo HTML5 semantico
- **Roles ARIA**: banner, navigation, main, contentinfo
- **Elementos semanticos**: nav, main, header, footer, article, section
- **Formularios accesibles**: Labels, fieldset, legend, aria-required

## Discapacidades contempladas

### Visual
- Texto alternativo en imagenes
- Alto contraste
- Estructura semantica para lectores de pantalla
- Tamano de fuente ajustable (rem)

### Auditiva
- Descripcion textual del contenido audiovisual
- No hay dependencia de audio para entender el contenido

### Motora
- Navegacion completa por teclado
- Botones y enlaces con tamano adecuado
- Formulario accesible con areas de clic grandes

### Cognitiva
- Estructura simple y clara
- Lenguaje directo sin tecnicismos innecesarios
- Jerarquia visual clara
- Navegacion consistente en todas las paginas

## Tecnologias utilizadas

- HTML5 semantico
- CSS3 (sin frameworks para mayor control)
- JavaScript vanilla (validacion simple)

## Pruebas de accesibilidad recomendadas

1. Navegar usando solo el teclado (Tab, Shift+Tab, Enter)
2. Usar un lector de pantalla (NVDA, JAWS, VoiceOver)
3. Validar HTML en https://validator.w3.org/
4. Comprobar contraste en https://webaim.org/resources/contrastchecker/
5. Probar con zoom al 200%

## Notas para la presentacion

Durante la exposicion mostrar:

1. **Texto alternativo**: Inspeccionar las imagenes y mostrar los atributos alt
2. **Navegacion por teclado**: Demostrar navegando todo el sitio sin raton
3. **Foco visible**: Mostrar como el foco se desplaza por los elementos
4. **Saltar navegacion**: Presionar Tab en la pagina principal para mostrar el enlace oculto
5. **Formulario accesible**: Demostrar las etiquetas, ayudas contextuales y validacion
6. **Estructura semantica**: Mostrar el codigo HTML y explicar el uso de elementos semanticos
7. **Contraste**: Mostrar los colores elegidos y su ratio de contraste
8. **Lector de pantalla**: Si es posible, demostrar la navegacion con NVDA o similar

## Instalacion

No requiere instalacion. Simplemente abrir index.html en un navegador web.

## Autor

Proyecto educativo para la asignatura de Diseno de Interfaces Web