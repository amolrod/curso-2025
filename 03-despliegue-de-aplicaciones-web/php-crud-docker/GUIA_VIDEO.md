# 📝 Guía para Grabar el Vídeo

## 🎬 Estructura del Vídeo (~8 minutos)

### 1. Introducción (30 segundos)
**Mostrar**: Diapositiva o pantalla con el título

**Decir**:
> "Hola, en este vídeo voy a presentar mi proyecto de Sistema de Gestión de Empleados, un CRUD completo desarrollado con PHP y MySQL, implementado en Docker con Apache, SSL/HTTPS, mod_rewrite y análisis de logs con GoAccess."

**Mostrar**: Estructura de carpetas del proyecto

---

### 2. Levantar el Proyecto (1 minuto)
**Mostrar**: Terminal

**Ejecutar**:
```bash
cd /tmp/php-crud-docker
docker-compose up -d --build
```

**Decir**:
> "Primero, levantamos el proyecto con Docker Compose. Esto construye las imágenes, genera certificados SSL autofirmados, y levanta tres contenedores: el servidor web Apache con PHP, MySQL para la base de datos, y phpMyAdmin para gestión visual."

**Ejecutar**:
```bash
docker-compose ps
```

**Mostrar**: Los tres contenedores corriendo

---

### 3. Demostración CRUD (2 minutos)
**Mostrar**: Navegador en https://localhost

**Decir**:
> "La aplicación principal muestra un listado de empleados con una interfaz moderna usando Bootstrap 5."

**Acciones a realizar**:

1. **Listar empleados**: Mostrar la tabla con los 5 empleados de ejemplo
   
2. **Crear empleado**: 
   - Clic en "Añadir Nuevo Empleado"
   - Rellenar formulario:
     - Nombre: "Pedro Sánchez"
     - Dirección: "Calle Serrano 50, Madrid"
     - Salario: "48000"
   - Enviar
   - Mostrar que aparece en la lista

3. **Ver empleado**:
   - Clic en el ícono del ojo en Pedro Sánchez
   - Mostrar vista detallada

4. **Editar empleado**:
   - Clic en el ícono del lápiz
   - Cambiar salario a 50000
   - Guardar
   - Verificar cambio en la lista

5. **Eliminar empleado**:
   - Clic en el ícono de la papelera
   - Mostrar confirmación
   - Confirmar
   - Verificar que desaparece de la lista

---

### 4. mod_rewrite - URLs Limpias (1 minuto)
**Mostrar**: Navegador

**Decir**:
> "El sistema implementa mod_rewrite para URLs amigables. En lugar de usar read.php?id=1, usamos /empleado/1"

**Acciones**:
1. Escribir en la barra de direcciones: `https://localhost/empleado/1`
2. Mostrar que funciona correctamente
3. Probar: `https://localhost/editar/2`
4. Probar: `https://localhost/nuevo`
5. Probar: `https://localhost/empleados`

**Mostrar**: Editor de código con el archivo `.htaccess`

**Decir**:
> "Estas son las reglas de reescritura que lo hacen posible, junto con configuraciones de seguridad y optimización."

---

### 5. SSL/HTTPS (1 minuto)
**Mostrar**: Navegador

**Decir**:
> "El sistema implementa comunicaciones seguras con SSL. Si intentamos acceder por HTTP, nos redirige automáticamente a HTTPS."

**Acciones**:
1. Escribir: `http://localhost` (sin la 's')
2. Mostrar que redirige a `https://localhost`
3. Clic en el candado del navegador
4. Mostrar el certificado SSL

**Mostrar**: Editor con `000-default.conf` (línea de RewriteRule)

**Decir**:
> "La redirección se configura tanto en Apache como en el .htaccess para garantizar que todo el tráfico esté encriptado."

**Mostrar**: Editor con `default-ssl.conf` (configuración SSL)

---

### 6. GoAccess - Análisis de Logs (1.5 minutos)
**Mostrar**: Navegador

**Decir**:
> "Para el análisis de logs, he implementado GoAccess, una herramienta de análisis en tiempo real."

**Acciones**:
1. Ir a: `https://localhost/analytics.php`
2. Mostrar el dashboard de GoAccess
3. Explicar las métricas visibles:
   - Visitantes únicos
   - Páginas más visitadas
   - Sistemas operativos y navegadores
   - Códigos de estado HTTP
   - Ancho de banda

**Mostrar**: Terminal

**Ejecutar**:
```bash
docker exec -it php-apache-crud tail -5 /var/log/apache2/access.log
```

**Decir**:
> "GoAccess está procesando estos logs de Apache en tiempo real, mostrando estadísticas útiles para monitorear el tráfico del sitio."

---

### 7. phpMyAdmin (30 segundos)
**Mostrar**: Navegador en http://localhost:8080

**Acciones**:
1. Login con root/rootpassword
2. Seleccionar base de datos `crud_db`
3. Mostrar tabla `employees`
4. Mostrar estructura de la tabla
5. Mostrar datos

**Decir**:
> "También incluí phpMyAdmin para gestión visual de la base de datos MySQL, donde podemos ver la estructura de las tablas y los datos almacenados."

---

### 8. Demostración de Docker (30 segundos)
**Mostrar**: Terminal

**Ejecutar**:
```bash
docker-compose ps
docker images | grep php-crud
docker volume ls | grep php-crud
```

**Decir**:
> "Todo el sistema está contenedorizado con Docker. Tenemos tres contenedores comunicándose a través de una red personalizada, con volúmenes persistentes para los datos y logs."

---

### 9. Código Fuente (30 segundos)
**Mostrar**: VS Code o editor

**Mostrar rápidamente**:
1. `config.php` - Conexión a base de datos
2. `index.php` - Lista de empleados con prepared statements
3. `create.php` - Validación de datos
4. `.htaccess` - Reglas de rewrite

**Decir**:
> "El código implementa buenas prácticas de seguridad: prepared statements para prevenir SQL injection, validación de datos en el servidor, y sanitización de entradas."

---

### 10. Conclusión (30 segundos)
**Mostrar**: Terminal

**Ejecutar**:
```bash
docker-compose down
```

**Decir**:
> "En resumen, he desarrollado un sistema CRUD completo que cumple todos los requisitos de la actividad:
> - Dockerizado con tres contenedores
> - mod_rewrite con URLs limpias
> - SSL/HTTPS con certificados autofirmados y redirección automática
> - GoAccess para análisis de logs en tiempo real
> - Documentación completa en el README
> 
> El proyecto está listo para ser usado y toda la documentación está disponible en el repositorio. Gracias por ver el vídeo."

---

## 📋 Checklist Pre-Grabación

Antes de grabar, asegúrate de:

- [ ] Limpiar el proyecto: `docker-compose down -v`
- [ ] Cerrar aplicaciones innecesarias
- [ ] Configurar resolución de pantalla (1920x1080)
- [ ] Probar el micrófono
- [ ] Tener agua cerca
- [ ] Preparar navegador:
  - [ ] Pestaña: https://localhost
  - [ ] Pestaña: http://localhost:8080
  - [ ] Pestaña: https://localhost/analytics.php
  - [ ] Zoom del navegador al 100%
- [ ] Terminal preparada en el directorio del proyecto
- [ ] Editor de código abierto con archivos clave
- [ ] Releer este guión

## 🎥 Configuración de Grabación

### Software Recomendado
- **macOS**: QuickTime Player o ScreenFlow
- **Windows**: OBS Studio
- **Linux**: SimpleScreenRecorder u OBS Studio

### Configuración
- **Resolución**: 1920x1080 (Full HD)
- **FPS**: 30
- **Audio**: 44.1 kHz o 48 kHz
- **Formato**: MP4 (H.264)

### Consejos
1. Graba en un lugar tranquilo
2. Habla claro y pausadamente
3. Si te equivocas, pausa y repite desde el inicio de la sección
4. Muestra el cursor del ratón para que se vea dónde haces clic
5. No te apresures, mejor claro que rápido
6. Puedes editar después para eliminar pausas largas

## ✂️ Post-Producción

### Ediciones Recomendadas
1. Eliminar tiempos de espera largos (compilación de Docker)
2. Acelerar secciones repetitivas si es necesario
3. Añadir títulos/subtítulos en secciones clave:
   - "1. mod_rewrite"
   - "2. SSL/HTTPS"
   - "3. GoAccess"
4. Añadir música de fondo suave (opcional)
5. Añadir pantalla de inicio y final con información

### Herramientas de Edición
- **Simple**: iMovie (Mac), Movie Maker (Windows)
- **Profesional**: DaVinci Resolve (gratis), Adobe Premiere Pro

## 📤 Exportación Final

- **Formato**: MP4
- **Códec**: H.264
- **Calidad**: Alta (8-10 Mbps)
- **Tamaño máximo**: Según requisitos de entrega
- **Nombre**: `apellido_nombre_crud_php_docker.mp4`

---

**¡Buena suerte con la grabación!** 🎬

Si necesitas hacer múltiples tomas, no te preocupes. Es normal. Lo importante es que el vídeo final sea claro y demuestre todas las características implementadas.
