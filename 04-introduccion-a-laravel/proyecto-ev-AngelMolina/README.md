Proyecto de laravel hecho con xampp y mysql.

## lo que hace el proyecto

Es una tienda simple donde se pueden ver productos y sus detalles. use criptomonedas como ejemplo de productos porque me parecio mas interesante que hacer una tienda generica.

## buenas practicas aplicadas

la logica esta en el controlador, no en las vistas
use nombres claros como `ProductoAMController`, `index`, `show`
añadi comentarios en el codigo para explicar que hace cada parte
aproveche el orm de laravel para las consultas a la base de datos
cree una plantilla base para no repetir codigo en las vistas
use `route('productos.index')` para facilitar el mantenimiento
defini los campos que se pueden asignar masivamente por seguridad

## tecnologias usadas

- laravel (framework php)
- mysql (base de datos)
- xampp (servidor local)
- blade (plantillas)

## estructura del proyecto

### base de datos

cree una tabla `productos` con estos campos:
- id
- nombre
- descripcion  
- precio
- stock
- timestamps

### modelo

el modelo `Producto` esta en `app/Models/Producto.php` y se conecta con la tabla productos.

### controlador

`ProductoController` tiene dos metodos:
- `index()` - muestra todos los productos
- `show($id)` - muestra el detalle de un producto

### vistas

use blade para las vistas:
- `layouts/app.blade.php` - plantilla base con header y footer
- `productos/index.blade.php` - lista de productos
- `productos/show.blade.php` - detalle de producto

### rutas

las rutas estan en `routes/web.php`:
- `/` - redirige al listado
- `/productos` - lista de productos
- `/productos/{id}` - detalle de producto



