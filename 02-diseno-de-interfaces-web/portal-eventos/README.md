# Portal de Reservas de Eventos

Aplicación web para consultar eventos, ver detalles y realizar reservas.

## Características

### Página de Eventos (Home)
- Lista de eventos con imagen, título, fecha, lugar y precio
- Barra de búsqueda funcional
- Filtros por categoría (Música, Teatro, Deportes, Tecnología)
- Diseño responsive con CSS Grid

### Página de Reservas
- Listado de eventos disponibles
- Formulario de reserva con:
  - Selección de evento
  - Datos del usuario (nombre, email, teléfono)
  - Cantidad de entradas
- Cálculo automático del precio total
- Confirmación de reserva

### Página de Precios
- 3 planes de tarifas diferentes
- Plan VIP destacado
- Sección de ofertas y descuentos
- Información adicional de compra

## Tecnologías

- **Framework**: Ionic + Angular Standalone
- **Estilos**: SCSS con Grid y Flexbox
- **Responsive**: Mobile, Tablet y Desktop

## Ejecutar el proyecto

```bash
npm install
npm start
```

La aplicación se abrirá en `http://localhost:4200`

## Estructura del proyecto

```
src/app/
  ├── home/          # Página principal con eventos
  ├── reservas/      # Formulario de reservas
  ├── precios/       # Planes y precios
  └── app.routes.ts  # Configuración de rutas
```

## Responsive

- **Desktop**: > 1024px - Grid de 3-4 columnas
- **Tablet**: ~768px - Grid de 2 columnas  
- **Móvil**: < 480px - Grid de 1 columna
