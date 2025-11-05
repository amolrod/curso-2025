GUÍA DE ACCESIBILIDAD WEB
Proyecto de Desarrollo de Aplicaciones Web


PRINCIPIOS WCAG 2.1 IMPLEMENTADOS

1. PERCEPTIBLE
• Texto alternativo: todas las imágenes tienen descripciones (atributo alt)
• Contraste de colores: texto principal #1a1a1a sobre #f5f5f5 (ratio 14.7:1) - supera nivel AAA
• Estructura de encabezados: jerarquía lógica h1 → h2 → h3 → h4 sin saltos
• Contenido audiovisual: descripciones textuales completas para usuarios con discapacidad visual

2. OPERABLE
• Navegación por teclado: todos los elementos accesibles con Tab y Enter
• Enlace "Saltar al contenido": oculto visualmente, aparece al recibir foco con Tab
• Foco visible: borde de 3px en color #4a2c1a en todos los elementos interactivos
• Áreas clicables: mínimo 44x44px en todos los botones y enlaces

3. COMPRENSIBLE
• Idioma declarado: <html lang="es">
• Navegación consistente: menú idéntico en todas las páginas
• Indicador de página actual: aria-current="page"
• Etiquetas de formulario: todos los campos tienen <label> asociado correctamente
• Ayuda contextual: textos de ayuda con aria-describedby
• Campos agrupados: uso de <fieldset> y <legend> para campos relacionados

4. ROBUSTO
• HTML5 semántico: todas las etiquetas correctamente cerradas
• Roles ARIA: header, nav, main, footer con roles landmarks
• Estados ARIA: aria-current, aria-required, aria-describedby, aria-label


CARACTERÍSTICAS ADICIONALES

Responsive Design
El sitio se adapta a móviles y tabletas usando media queries (@media max-width: 768px)

Alto Contraste
Soporte para modo de alto contraste del sistema con @media (prefers-contrast: high)

Reducir Movimiento
Respeta la preferencia del usuario de reducir animaciones con @media (prefers-reduced-motion: reduce)

Unidades Relativas
Uso de rem en lugar de px para que el usuario pueda ajustar el tamaño del texto


ELEMENTOS CLAVE DEL CÓDIGO

Texto alternativo:
<img src="nosferatu.jpg" alt="Cartel de la película Nosferatu de 1922">

Saltar navegación:
<a href="#contenido-principal" class="saltar-nav">Saltar al contenido principal</a>

Formulario accesible:
<label for="nombre">Nombre:</label>
<input type="text" id="nombre" aria-required="true">
<span id="ayuda-email" class="ayuda">Necesitamos tu email para responderte</span>

Roles ARIA:
<nav role="navigation" aria-label="Navegación principal">
<main id="contenido-principal" role="main">

CONCLUSIÓN

El proyecto cumple con los 4 principios WCAG 2.1 (Perceptible, Operable, Comprensible, Robusto) y es utilizable por personas con discapacidades visuales, auditivas, motoras y cognitivas.