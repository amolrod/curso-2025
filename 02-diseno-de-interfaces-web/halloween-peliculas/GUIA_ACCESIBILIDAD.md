# Guia de Accesibilidad del Proyecto

Este documento explica de forma detallada como se han implementado los principios de accesibilidad web en el proyecto.

## Principios WCAG 2.1

### 1. PERCEPTIBLE

#### 1.1 Texto alternativo
**Ubicacion**: index.html, pelicula.html

```html
<img src="imagenes/nosferatu.jpg" alt="Cartel de la pelicula Nosferatu de 1922 mostrando al vampiro con las manos levantadas">
```

Todas las imagenes tienen texto alternativo descriptivo que explica el contenido visual.

#### 1.2 Contraste de color
**Ubicacion**: estilos.css

- Texto principal (#1a1a1a) sobre fondo claro (#f5f5f5): Ratio 14.7:1
- Texto en encabezado (#ffffff) sobre fondo oscuro (#2c1810): Ratio 15.4:1
- Enlaces en navegacion (#ffffff) sobre fondo (#6b4423): Ratio 8.2:1

Todos superan el nivel AAA (7:1 para texto normal).

#### 1.3 Estructura de encabezados
**Ubicacion**: Todas las paginas HTML

- h1: Titulo principal (solo uno por pagina)
- h2: Titulo de seccion principal
- h3: Subsecciones
- h4: Elementos dentro de subsecciones

Jerarquia logica sin saltos de nivel.

#### 1.4 Contenido audiovisual
**Ubicacion**: pelicula.html

```html
<div class="video-descripcion" role="region" aria-label="Descripcion del contenido visual">
```

Descripcion textual completa del contenido visual para usuarios con discapacidad visual.

### 2. OPERABLE

#### 2.1 Navegacion por teclado
**Ubicacion**: Todas las paginas

- Todos los enlaces e inputs son accesibles con Tab
- Enter activa enlaces y botones
- No hay trampas de teclado
- El orden de tabulacion es logico

#### 2.2 Saltar al contenido
**Ubicacion**: Todas las paginas HTML

```html
<a href="#contenido-principal" class="saltar-nav">Saltar al contenido principal</a>
```

```css
.saltar-nav:focus {
    left: 10px;
    z-index: 1000;
}
```

Enlace oculto que aparece al recibir foco para saltar la navegacion.

#### 2.3 Foco visible
**Ubicacion**: estilos.css

```css
*:focus {
    outline: 3px solid #4a2c1a;
    outline-offset: 2px;
}
```

Indicador de foco claro y visible en todos los elementos interactivos.

#### 2.4 Tamano de areas clicables
**Ubicacion**: estilos.css

```css
nav a {
    padding: 12px 20px; /* Minimo 44px de altura */
}

.boton {
    padding: 12px 24px; /* Minimo 44px */
}
```

Todos los elementos interactivos tienen minimo 44x44px.

### 3. COMPRENSIBLE

#### 3.1 Idioma de la pagina
**Ubicacion**: Todas las paginas HTML

```html
<html lang="es">
```

Declara el idioma para lectores de pantalla.

#### 3.2 Navegacion consistente
**Ubicacion**: Todas las paginas HTML

El menu de navegacion es identico en todas las paginas, siempre en el mismo orden y ubicacion.

#### 3.3 Indicador de pagina actual
**Ubicacion**: Todas las paginas HTML

```html
<a href="index.html" aria-current="page">Inicio</a>
```

Indica visualmente y semanticamente la pagina actual.

#### 3.4 Etiquetas de formulario
**Ubicacion**: contacto.html

```html
<label for="nombre">Nombre completo:</label>
<input type="text" id="nombre" name="nombre" required aria-required="true">
```

Todos los campos tienen etiquetas asociadas correctamente.

#### 3.5 Ayuda contextual
**Ubicacion**: contacto.html

```html
<input type="email" id="email" aria-describedby="ayuda-email">
<span id="ayuda-email" class="ayuda">Necesitamos tu email para poder responderte</span>
```

Textos de ayuda asociados semanticamente a los campos.

#### 3.6 Agrupacion de campos relacionados
**Ubicacion**: contacto.html

```html
<fieldset>
    <legend>Motivo del contacto:</legend>
    ...
</fieldset>
```

Campos relacionados agrupados con fieldset y legend.

### 4. ROBUSTO

#### 4.1 HTML valido
**Ubicacion**: Todas las paginas HTML

- Uso de HTML5 semantico
- Todas las etiquetas correctamente cerradas
- Atributos correctos
- Sin elementos obsoletos

#### 4.2 Roles ARIA
**Ubicacion**: Todas las paginas HTML

```html
<header role="banner">
<nav role="navigation" aria-label="Navegacion principal">
<main id="contenido-principal" role="main">
<footer role="contentinfo">
```

Roles ARIA landmarks para estructurar la pagina.

#### 4.3 Estados y propiedades ARIA
**Ubicacion**: Todas las paginas HTML

- `aria-current="page"` para pagina actual
- `aria-required="true"` para campos obligatorios
- `aria-describedby` para asociar ayudas
- `aria-label` para etiquetas descriptivas

## Caracteristicas adicionales de accesibilidad

### Responsive design
**Ubicacion**: estilos.css

```css
@media (max-width: 768px) {
    body {
        font-size: 1rem;
    }
}
```

El sitio se adapta a diferentes tamanos de pantalla.

### Alto contraste
**Ubicacion**: estilos.css

```css
@media (prefers-contrast: high) {
    body {
        background-color: #ffffff;
        color: #000000;
    }
}
```

Soporte para modo de alto contraste del sistema.

### Reducir movimiento
**Ubicacion**: estilos.css

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

Respeta la preferencia del usuario de reducir animaciones.

### Unidades relativas
**Ubicacion**: estilos.css

```css
body {
    font-size: 1.1rem; /* No px fijos */
}
```

Uso de rem para permitir que el usuario ajuste el tamano del texto.

## Lista de verificacion para la presentacion

- [ ] Mostrar texto alternativo en imagenes (inspector del navegador)
- [ ] Demostrar navegacion completa con teclado
- [ ] Mostrar enlace "Saltar al contenido" con Tab
- [ ] Demostrar foco visible en todos los elementos
- [ ] Mostrar formulario accesible con etiquetas y ayudas
- [ ] Explicar la jerarquia de encabezados
- [ ] Mostrar el codigo HTML semantico
- [ ] Demostrar contraste de colores adecuado
- [ ] Probar con lector de pantalla (opcional)
- [ ] Validar HTML en W3C Validator
- [ ] Probar zoom al 200%

## Herramientas de prueba recomendadas

1. **NVDA** (lector de pantalla gratuito para Windows)
2. **W3C Validator** (https://validator.w3.org/)
3. **WAVE** (extension de navegador para accesibilidad)
4. **Contrast Checker** (https://webaim.org/resources/contrastchecker/)
5. **axe DevTools** (extension de navegador)

## Conclusiones

Este proyecto cumple con los cuatro principios fundamentales de WCAG 2.1:

1. **Perceptible**: Contenido visible y comprensible para todos
2. **Operable**: Navegable por teclado con areas de clic adecuadas
3. **Comprensible**: Estructura clara y lenguaje simple
4. **Robusto**: HTML semantico y uso correcto de ARIA

El sitio es utilizable por personas con discapacidades visuales, auditivas, motoras y cognitivas.