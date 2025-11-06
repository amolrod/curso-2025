# Gestión de Biblioteca - DWEC 2º DAW

Sistema de gestión de biblioteca implementado con JavaScript orientado a objetos.

## Criterios de evaluación cumplidos

### 4e - Métodos de arrays (filter, map, reduce)

- **`filter`**: usado en `buscar()` para filtrar libros por título/isbn, en `eliminar()` para excluir libro por isbn
- **`map`**: usado en `listar()` para crear copias inmutables, en `estadisticas()` para extraer antigüedades, en renderizado de UI
- **`reduce`**: usado en `estadisticas()` para agrupar libros por género y calcular suma de antigüedades

### 4f - Programación orientada a objetos

Toda la lógica se basa en objetos propios: `Libro`, `Biblioteca`, `ControladorUI`.

### 4g - Clases bien estructuradas

- `Libro`: representa la entidad con propiedades y validación
- `Biblioteca`: gestiona la colección con lógica de negocio
- `ControladorUI`: maneja interacción con el DOM

### 4h - Métodos y propiedades encapsulados

- Campos privados con `#` en todas las clases
- Getters públicos para acceso controlado
- Validación en constructores y métodos

### 4i - Uso de objetos propios

No se usan estructuras planas. Todo pasa por instancias de `Libro` y `Biblioteca`.

### 4j - Patrón singleton

`Biblioteca.getInstance()` garantiza una única instancia en toda la aplicación. Justificación: fuente única de verdad para los datos.

### 4k - Comentarios y depuración

- Comentarios en minúsculas explicando el "por qué"
- `console.debug` en operaciones clave
- Sección de tests en consola al final de `app.js`

## Estructura del proyecto

```
├── index.html      # estructura y formularios
├── style.css       # estilos responsive y accesibles
├── app.js          # lógica POO completa
├── README.md       # este archivo
└── guionvideo.md   # guion para demo en vídeo
```

## Uso

1. Abre `index.html` en un navegador moderno
2. Añade libros mediante el formulario
3. Busca por título o ISBN
4. Consulta estadísticas generadas automáticamente
5. Elimina libros desde la lista

## Depuración en navegador

### Chrome / Edge

1. `F12` → pestaña **Sources**
2. Navega a `app.js` en el árbol de archivos
3. Pon breakpoints haciendo clic en los números de línea
4. Interactúa con la app; el debugger se pausará

Puntos clave para breakpoints:
- Línea del método `agregarLibro()` (validación duplicados)
- Línea del método `estadisticas()` (reduce de géneros)
- Línea del método `buscar()` (filter con criterios)

### Firefox

1. `F12` → pestaña **Debugger**
2. Mismo flujo que Chrome

### Safari

1. Desarrollador → Mostrar Inspector Web → Sources
2. Mismo flujo

## Errores comunes

### "todos los campos son obligatorios"

- Revisa que ningún campo del formulario esté vacío
- Los espacios en blanco se eliminan automáticamente

### "ya existe un libro con isbn..."

- Cada ISBN debe ser único
- Verifica que no estés duplicando un libro de ejemplo

### "año de publicación no válido"

- El año debe estar entre 1000 y 2100
- Asegúrate de introducir un número válido

### La búsqueda no devuelve resultados

- La búsqueda por título es parcial e insensible a mayúsculas
- La búsqueda por ISBN es exacta
- Usa "Mostrar Todos" para restablecer la vista

## Tests en consola

Abre la consola del navegador (`F12` → Console) y prueba:

```javascript
// obtener instancia singleton
const bib = Biblioteca.getInstance();

// crear libro manual
const test = new Libro('Mi Libro', 'Yo Mismo', 2024, 'ficción', '123-456');

// agregar
bib.agregarLibro(test);

// buscar
bib.buscar({ titulo: 'Libro' });

// estadísticas
const stats = bib.estadisticas();
console.table(stats.porGenero);

// eliminar
bib.eliminar('123-456');
```

## Tecnologías

- HTML5 semántico
- CSS3 (grid, flexbox, custom properties)
- JavaScript ES6+ (clases, campos privados, métodos de array)
- Sin dependencias externas

## Autor

Proyecto desarrollado para DWEC - 2º DAW
Criterios RA CE: 4e, 4f, 4g, 4h, 4i, 4j, 4k
