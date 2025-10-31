# 📋 EXPLICACIÓN DE MEDIDAS DE ACCESIBILIDAD

## Por el alumno de 2º DAW - Proyecto Halloween

Bueno, aquí voy a explicar todas las cosas de accesibilidad que he metido en la web y por qué las he puesto. Es lo que hemos ido viendo en clase y me ha parecido importante aplicarlo bien.

---

## 🔍 1. PRINCIPIO: PERCEPTIBLE
*"La información debe poder ser percibida por todos los usuarios"*

### 1.1 Alternativas Textuales

**¿Qué he hecho?**
- En la página de personajes, como no tengo imágenes reales, he usado emojis grandes. Para que los lectores de pantalla sepan qué son, les he puesto `role="img"` y `aria-label` con descripciones completas.

**Ejemplo:**
```html
<div class="character-emoji" role="img" aria-label="Jack Skellington, un esqueleto alto y delgado vestido con un traje de rayas negro">
    💀
</div>
```

**Por qué es importante:**  
Una persona ciega usando un lector de pantalla no ve el emoji, pero el lector le dice "Jack Skellington, un esqueleto alto y delgado...". Así sabe quién es el personaje.

### 1.2 Contraste de Colores

**¿Qué he hecho?**
- He elegido colores con buen contraste entre el texto y el fondo
- Texto blanco (#e0e0e0) sobre fondo oscuro (#1a0933) = contraste alto
- En tema claro, texto oscuro sobre fondo claro
- Los botones importantes (naranja #ff6b35) destacan bien

**Ratio de contraste conseguido:**  
- Texto normal: >4.5:1 (nivel AA)
- Texto grande: >3:1 (nivel AA)

**Por qué es importante:**  
Las personas con problemas de visión (cataratas, daltonismo, baja visión) necesitan buen contraste para leer. Si el texto es gris clarito sobre fondo blanco, no lo ven.

### 1.3 Contenido Multimedia Accesible

**¿Qué he hecho?**
- El vídeo del tráiler tiene una transcripción completa debajo
- Uso el elemento `<details>` para que se pueda desplegar
- Describo todo lo que pasa en el vídeo y lo que se dice

**Por qué es importante:**  
Las personas sordas o con problemas de audición no pueden oír el vídeo. Con la transcripción pueden leer todo lo que se dice y qué pasa en cada momento.

### 1.4 Tamaño de Fuente Ajustable

**¿Qué he hecho?**
- Botones A+ y A- para cambiar el tamaño del texto
- Se guarda la preferencia en localStorage
- Rango de 12px a 24px

**Por qué es importante:**  
Las personas mayores o con baja visión necesitan texto más grande para leer cómodamente. Muchos no saben usar el zoom del navegador, así que les pongo botones claros.

---

## ⌨️ 2. PRINCIPIO: OPERABLE
*"Los usuarios deben poder navegar y usar la interfaz"*

### 2.1 Navegación Completa por Teclado

**¿Qué he hecho?**
- Todo se puede hacer con teclado: Tab (avanzar), Shift+Tab (retroceder), Enter (activar), Espacio (marcar)
- Los botones son `<button>` de verdad, no divs con onclick
- Los enlaces son `<a>` de verdad
- El formulario se puede rellenar todo con teclado

**Por qué es importante:**  
Hay personas que no pueden usar ratón (parálisis, temblores, etc.) y solo usan teclado. Si algo no funciona con teclado, no pueden usarlo.

### 2.2 Foco Visible

**¿Qué he hecho?**
- Cuando navegas con Tab, se ve un borde naranja grueso alrededor del elemento activo
- CSS: `outline: 3px solid var(--color-acento);`
- Se aplica en todos los enlaces, botones y campos del formulario

**Código:**
```css
.nav-menu a:focus {
    outline: 3px solid var(--color-acento);
    outline-offset: 2px;
}
```

**Por qué es importante:**  
Si no sabes dónde estás al navegar con teclado, te pierdes. El foco visible te dice "estás aquí".

### 2.3 Skip Link (Saltar al Contenido)

**¿Qué he hecho?**
- Primer elemento de cada página (invisible hasta que recibe el foco)
- Permite saltar directamente al contenido principal
- Se muestra cuando pulsas Tab

**Código:**
```html
<a href="#contenido-principal" class="skip-link">Saltar al contenido principal</a>
```

**Por qué es importante:**  
Imagina tener que escuchar TODA la navegación en cada página antes de llegar al contenido. Con el skip link, un usuario de lector de pantalla puede saltar directamente a lo importante.

### 2.4 Áreas de Clic Grandes

**¿Qué he hecho?**
- Todos los botones tienen mínimo 44x44 píxeles
- Usé la variable CSS: `min-height: 44px; min-width: 44px;`

**Por qué es importante:**  
Las personas con problemas motrices (Parkinson, artritis) o en dispositivos táctiles necesitan botones grandes para no fallar al hacer clic.

### 2.5 Sin Límites de Tiempo

**¿Qué he hecho?**
- No hay popups que desaparezcan automáticamente
- No hay carruseles que cambien solos
- El usuario controla todo a su ritmo

**Por qué es importante:**  
Algunas personas tardan más en leer o actuar. Si algo desaparece en 5 segundos, puede que no les dé tiempo.

---

## 💡 3. PRINCIPIO: COMPRENSIBLE
*"La información debe ser fácil de entender"*

### 3.1 Idioma Declarado

**¿Qué he hecho?**
- `<html lang="es">` en todas las páginas

**Por qué es importante:**  
Los lectores de pantalla usan esto para saber en qué idioma leer. Si no está, pueden leer español con pronunciación inglesa y no se entiende nada.

### 3.2 Etiquetas de Formulario Correctas

**¿Qué he hecho?**
- Cada campo tiene su `<label>` asociado con el atributo `for`
- Textos de ayuda con `aria-describedby`
- Campos obligatorios marcados con asterisco y `aria-required="true"`

**Ejemplo:**
```html
<label for="nombre">
    Nombre <span class="required" aria-label="campo obligatorio">*</span>
</label>
<input type="text" id="nombre" name="nombre" required aria-required="true">
```

**Por qué es importante:**  
Los lectores de pantalla leen la etiqueta cuando llegas al campo, así sabes qué tienes que escribir. Sin etiqueta, solo dice "cuadro de edición" y no sabes qué poner.

### 3.3 Mensajes de Error Claros

**¿Qué he hecho?**
- Los errores se muestran en español claro
- Se usan live regions con `role="alert"` y `aria-live="polite"`
- Los lectores de pantalla los anuncian automáticamente

**Ejemplo:**
```html
<span id="email-error" class="error-message" role="alert" aria-live="polite">
    ⚠️ Por favor, introduce un email válido
</span>
```

**Por qué es importante:**  
"Error" no dice nada útil. "Por favor, introduce un email válido" explica exactamente qué está mal y cómo arreglarlo.

### 3.4 Navegación Consistente

**¿Qué he hecho?**
- El menú está en el mismo sitio en todas las páginas
- Los botones de accesibilidad están siempre en el mismo lugar
- El footer es igual en todas las páginas

**Por qué es importante:**  
Si el menú cambia de sitio en cada página, te desorientas. La consistencia ayuda a aprender dónde están las cosas.

### 3.5 Lenguaje Sencillo

**¿Qué he hecho?**
- He evitado palabras técnicas innecesarias
- Frases cortas y claras
- Explicaciones directas

**Por qué es importante:**  
Las personas con discapacidad cognitiva, dislexia o que están aprendiendo español necesitan texto simple. No hace falta complicar las cosas.

---

## 🏗️ 4. PRINCIPIO: ROBUSTO
*"El contenido debe funcionar con diferentes tecnologías"*

### 4.1 HTML Semántico

**¿Qué he hecho?**
- `<header>` para la cabecera
- `<nav>` para la navegación
- `<main>` para el contenido principal
- `<article>` para cada personaje/sección
- `<footer>` para el pie de página
- `<section>` para agrupar contenido relacionado

**Por qué es importante:**  
Los lectores de pantalla usan estas etiquetas para navegar. Por ejemplo, pueden saltar de sección en sección o ir directamente al nav. Si todo son divs, se pierden.

### 4.2 Roles ARIA

**¿Qué he hecho?**
- `role="banner"` en el header
- `role="navigation"` en el nav
- `role="main"` en el main
- `role="contentinfo"` en el footer
- `role="alert"` en mensajes de error
- `role="toolbar"` en los controles de accesibilidad

**Por qué es importante:**  
ARIA es como darle pistas extra a los lectores de pantalla sobre qué es cada cosa. Es un refuerzo del HTML semántico.

### 4.3 Estados y Propiedades ARIA

**¿Qué he hecho?**
- `aria-label` para describir elementos
- `aria-labelledby` para asociar títulos
- `aria-describedby` para textos de ayuda
- `aria-current="page"` para marcar la página activa
- `aria-invalid` para campos con error
- `aria-live` para anuncios dinámicos

**Por qué es importante:**  
Estas propiedades dan contexto. Por ejemplo, `aria-current="page"` indica "estás aquí" en el menú, ayudando a orientarse.

### 4.4 Validación del Formulario Accesible

**¿Qué he hecho?**
- Validación en JavaScript antes de enviar
- Los errores se anuncian automáticamente
- El foco va al primer campo con error
- Se puede corregir y volver a intentar

**Código JavaScript:**
```javascript
function mostrarError(campo, errorSpan, mensaje) {
    campo.classList.add('error');
    campo.setAttribute('aria-invalid', 'true');
    errorSpan.textContent = '⚠️ ' + mensaje;
}
```

**Por qué es importante:**  
Una validación accesible avisa al usuario de qué está mal sin necesidad de ver colores o iconos. Los lectores de pantalla anuncian el error.

---

## 🎨 5. MEJORAS ADICIONALES

### 5.1 Tema Claro/Oscuro

**¿Qué he hecho?**
- Botón para cambiar entre tema claro y oscuro
- Colores invertidos manteniendo el contraste
- Preferencia guardada en localStorage

**Por qué es importante:**  
Algunas personas tienen fotofobia (molestia con la luz) y prefieren temas oscuros. Otras ven mejor con fondos claros.

### 5.2 Respeto por Preferencias del Sistema

**¿Qué he hecho?**
- Media query `prefers-reduced-motion` para desactivar animaciones si el usuario lo prefiere

**Código:**
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

**Por qué es importante:**  
Las animaciones pueden marear a personas con vértigo o trastornos vestibulares. Respetar esta preferencia es importante.

### 5.3 Navegación Sticky

**¿Qué he hecho?**
- El menú se queda fijo arriba al hacer scroll
- CSS: `position: sticky; top: 0;`

**Por qué es importante:**  
No tienes que volver arriba para ir a otra página. Ayuda a todos, especialmente a personas con movilidad reducida que tardan más en hacer scroll.

---

## 📊 RESUMEN DE CUMPLIMIENTO WCAG 2.1

### Nivel A (Mínimo) ✅
- [x] Alternativas textuales
- [x] Navegación por teclado
- [x] Contraste mínimo
- [x] Idioma de la página
- [x] Identificación de errores

### Nivel AA (Recomendado) ✅
- [x] Contraste mejorado (4.5:1)
- [x] Redimensión de texto hasta 200%
- [x] Foco visible
- [x] Etiquetas o instrucciones
- [x] Sugerencias de error

### Nivel AAA (Óptimo) 🟡
- [x] Contraste máximo en algunos elementos
- [ ] Lenguaje de signos (no aplicable en este proyecto)
- [x] Sin límites de tiempo
- [x] Contenido no intermitente

---

## 🧪 CÓMO LO HE PROBADO

1. **Navegación con teclado**: He navegado toda la web solo con Tab, Shift+Tab, Enter y Espacio. Todo funciona.

2. **Zoom del navegador**: He probado al 200% y al 400%. El diseño se adapta y no se rompe.

3. **Tema claro y oscuro**: He cambiado entre los dos y el contraste se mantiene en ambos.

4. **Responsive**: Lo he probado en tamaño móvil, tablet y desktop. Se ve bien en todos.

5. **Formulario**: He probado a enviar con campos vacíos, emails mal escritos, etc. La validación funciona.

---

## 💭 LO QUE HE APRENDIDO

Antes de hacer este proyecto, la accesibilidad me sonaba pero no sabía lo importante que era. Ahora me doy cuenta de que:

1. **No es solo para personas con discapacidad**: El tamaño de fuente grande ayuda a mi abuela, el contraste alto se ve mejor al sol, los botones grandes son mejores en el móvil...

2. **No es difícil si lo haces desde el principio**: Añadir accesibilidad al final es un rollo, pero si lo piensas desde el inicio es bastante natural.

3. **HTML semántico es la base**: Si usas las etiquetas correctas, ya tienes mucha accesibilidad gratis. ARIA es solo para casos especiales.

4. **El teclado es fundamental**: Mucha más gente de la que pensaba usa solo el teclado. Hay que probarlo siempre.

5. **Los detalles importan**: Cosas pequeñas como el `aria-label` del asterisco o el `outline` en el foco marcan la diferencia.

---

## 🎯 CONCLUSIÓN

He intentado hacer una web que cualquier persona pueda usar, tenga la capacidad que tenga. No es perfecta (todavía estoy aprendiendo), pero creo que cumple con los principios básicos de accesibilidad que hemos visto en clase.

Lo más importante que me llevo es que **la accesibilidad no es un extra, es algo básico**. No estás haciendo un favor, estás haciendo las cosas bien.

---

**Palabras finales:**  
Este proyecto me ha hecho pensar mucho en cómo diseño y codifico. A partir de ahora voy a tener en cuenta la accesibilidad en todo lo que haga, porque he visto que no cuesta tanto y ayuda a muchísima gente.

Espero que este trabajo demuestre que he entendido lo que nos han enseñado sobre accesibilidad web y que sé aplicarlo en un proyecto real.

---

*Alumno de 2º DAW - Diseño de Interfaces Web - Octubre 2025*

