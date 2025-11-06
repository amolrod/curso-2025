# Guion para vídeo demostración - Gestión Biblioteca

**Duración estimada:** 3-5 minutos

---

## Intro (30 seg)

- Mostrar archivo abierto en VS Code
- Explicar brevemente: "sistema de gestión de biblioteca con JavaScript POO para cumplir criterios 4e a 4k"
- Mostrar estructura de archivos: `index.html`, `style.css`, `app.js`

---

## Demostración de funcionalidad (90 seg)

### Abrir aplicación en navegador

1. Abrir `index.html` → mostrar interfaz cargada con libros de ejemplo
2. Destacar contador: "7 libros" en la cabecera de colección

### Añadir libro

3. Rellenar formulario:
   - Título: "El arte de la guerra"
   - Autor: "Sun Tzu"
   - Año: 500 (mostrar validación si se pone año fuera de rango, luego corregir a 2010)
   - Género: "ensayo"
   - ISBN: "978-1-234-56789-0"
4. Click "Añadir Libro" → mensaje verde de confirmación
5. Mostrar que aparece en la lista
6. Intentar añadir el mismo ISBN de nuevo → mensaje de error por duplicado

### Buscar

7. Escribir en buscador por título: "subtle" → mostrar resultado
8. Limpiar y buscar por ISBN: "978-0-06-245771-4" → mostrar resultado exacto
9. Click "Mostrar Todos" para volver a lista completa

### Estadísticas

10. Scrollear a sección estadísticas
11. Explicar: "muestra libros agrupados por género y antigüedad media calculada"
12. Señalar valores: "ensayo: 3", "desarrollo personal: 2", etc.

### Eliminar

13. Click en "Eliminar" de un libro → confirmar diálogo
14. Mostrar que desaparece de la lista
15. Mostrar que estadísticas se actualizan automáticamente

---

## Evidencia código POO (60 seg)

### Volver a VS Code

16. Abrir `app.js`
17. Mostrar clase `Libro` con campos privados `#titulo`, `#autor`, etc. → **criterio 4h**
18. Mostrar constructor con validaciones → **criterio 4g**
19. Scrollear a clase `Biblioteca`
20. Destacar patrón singleton:
    - Variable estática `#instancia`
    - Método `getInstance()`
    - Comentario explicando "única fuente de verdad" → **criterio 4j**
21. Mostrar método `agregarLibro()` con validación de duplicados

---

## Evidencia métodos de array (45 seg)

22. Mostrar método `buscar()` → destacar `.filter()` → **criterio 4e**
23. Mostrar método `listar()` → destacar `.map()` para copias inmutables → **criterio 4e**
24. Mostrar método `estadisticas()`:
    - `.reduce()` para agrupar por género
    - `.map()` para extraer antigüedades
    - `.reduce()` para sumar → **criterio 4e**

---

## Evidencia depuración (30 seg)

### Consola del navegador

25. Abrir DevTools → pestaña Console
26. Mostrar logs de debug: "instancia única creada", "libro agregado", etc.
27. Ejecutar test manual en consola:

```javascript
const bib = Biblioteca.getInstance();
bib.estadisticas();
```

28. Mostrar objeto retornado con estructura `{ porGenero: {...}, mediaAntiguedad: ... }`

### Breakpoint

29. DevTools → pestaña Sources
30. Abrir `app.js` → poner breakpoint en línea del método `agregarLibro()` (búsqueda de duplicados)
31. Volver a app → intentar añadir libro
32. Mostrar ejecución pausada en breakpoint
33. Mostrar variables en el scope: `this.#libros`, `libro`, `existente`
34. Continuar ejecución → **criterio 4k**

---

## Cierre (15 seg)

35. Volver a vista de app funcionando
36. Decir: "cumple todos los criterios: POO con clases bien estructuradas (4f, 4g), encapsulación (4h), métodos filter/map/reduce (4e), patrón singleton (4j), comentarios y debug (4k)"
37. Mostrar brevemente README.md con resumen de criterios

---

## Puntos clave a enfatizar

- **4e**: mostrar líneas exactas con `filter`, `map`, `reduce` en código
- **4f/4g**: destacar que todo es POO, no hay funciones sueltas
- **4h**: mostrar `#` en campos privados y getters públicos
- **4i**: todo pasa por objetos `Libro` y `Biblioteca`
- **4j**: explicar por qué singleton (única fuente de verdad)
- **4k**: mostrar console.debug y breakpoint en acción

