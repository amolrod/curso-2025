# Configuracion de Sitios Virtuales con Docker

Este proyecto configura dos sitios virtuales con Apache, PHP y MySQL usando Docker. Incluye HTTPS con certificados autofirmados y autenticacion basica.

## Estructura del Proyecto

```
actividad-ev1-AM/
├── docker-compose.yml          # configuracion de contenedores
├── setup.sh                    # script de configuracion inicial
├── apache-config/
│   ├── virtualhosts.conf      # configuracion http (redirige a https)
│   ├── ssl.conf               # configuracion https de los sitios
│   └── .htpasswd              # archivo de passwords para autenticacion
├── ssl/
│   ├── apache.crt             # certificado ssl autofirmado
│   └── apache.key             # clave privada ssl
├── sitio1/                    # aplicacion php con login/registro
│   ├── login.php
│   ├── registro.htm
│   └── ...
└── sitio2/                    # sitio informativo simple
    ├── index.html
    └── info.php
```

## Requisitos

- Docker
- Docker Compose
- OpenSSL (para generar certificados)

## Instalacion y Configuracion

### 1. Ejecutar el script de configuracion

```bash
chmod +x setup.sh
./setup.sh
```

Este script:
- crea la estructura de directorios necesaria
- copia los archivos php al sitio1
- genera contenido basico para el sitio2
- crea un certificado ssl autofirmado valido por 365 dias
- genera el archivo de autenticacion con usuario: admin, password: admin123

### 2. Configurar el archivo hosts

Agrega estas lineas a `/etc/hosts`:

```bash
sudo nano /etc/hosts
```

Agregar:
```
127.0.0.1 app1.local
127.0.0.1 app2.local
```

### 3. Iniciar los contenedores

```bash
docker-compose up -d
```

Esto inicia:
- servidor apache con php 8.1 (puertos 9080 y 9443)
- servidor mysql 8.0 (puerto interno 3306)

### 4. Configurar la base de datos (primera vez)

Accede a https://app1.local:9443/configuracion.php para crear la base de datos y las tablas necesarias.

## Acceso a los Sitios

### Sitio 1 - app1.local (con autenticacion)
- **URL**: https://app1.local:9443
- **Autenticacion Apache**: 
  - Usuario: `ae_amolrod`
  - Password: `1234`
- **Contenido**: aplicacion php con sistema de login y registro de usuarios
- **Caracteristicas**:
  - requiere autenticacion basica de apache
  - conexion https obligatoria
  - acceso a base de datos mysql

### Sitio 2 - app2.local (sin autenticacion)
- **URL**: https://app2.local:9443
- **Autenticacion**: no requiere
- **Contenido**: pagina informativa simple con info del servidor
- **Caracteristicas**:
  - acceso libre
  - conexion https obligatoria

## Certificado SSL

El certificado es **autofirmado** (self-signed), lo que significa:
- tu navegador mostrara una advertencia de seguridad
- esto es normal en entornos de desarrollo
- en produccion se usaria un certificado de una ca como let's encrypt

Para aceptar el certificado:
1. en chrome/edge: click en "avanzado" > "acceder a [sitio] (no seguro)"
2. en firefox: click en "avanzado" > "aceptar el riesgo y continuar"

## Autenticacion Basica de Apache

El sitio1 (app1.local) requiere autenticacion a nivel de apache:
- se configura en el archivo `apache-config/ssl.conf`
- usa el archivo `.htpasswd` para almacenar usuarios
- es independiente del sistema de login php de la aplicacion

Para agregar mas usuarios:
```bash
# dentro del contenedor
docker exec -it apache-virtualhosts htpasswd -B /etc/apache2/.htpasswd nuevo_usuario
```

## Comandos Utiles

```bash
# iniciar contenedores
docker-compose up -d

# detener contenedores
docker-compose down

# ver logs
docker-compose logs -f

# reiniciar apache
docker-compose restart web

# acceder al contenedor apache
docker exec -it apache-virtualhosts bash

# acceder al contenedor mysql
docker exec -it mysql-db mysql -u root -p
```

## Resolucion de Problemas

### El navegador no resuelve app1.local o app2.local
- verifica que agregaste las entradas en `/etc/hosts`
- prueba hacer ping: `ping app1.local`

### Error de conexion a mysql
- verifica que el contenedor mysql este corriendo: `docker ps`
- espera unos segundos, mysql tarda en iniciar la primera vez
- verifica las credenciales en `Conexion_DB.php`

### El certificado no funciona
- regenera el certificado ejecutando: `./setup.sh`
- reinicia los contenedores: `docker-compose restart`

### La autenticacion no funciona
- verifica que el archivo `.htpasswd` existe en `apache-config/`
- el usuario por defecto es: admin / admin123
- asegurate de que el navegador no tenga credenciales cacheadas

## Documentacion de Configuracion

### Virtual Hosts
Los sitios virtuales permiten alojar multiples sitios web en un mismo servidor. se configuran mediante:
- nombre del servidor (ServerName)
- directorio raiz (DocumentRoot)
- configuracion especifica de cada sitio

### HTTPS
- protocolo https cifra la comunicacion entre cliente y servidor
- usa certificados digitales para autenticar el servidor
- en este proyecto usamos certificados autofirmados para desarrollo

### Autenticacion Basica
- mecanismo simple de control de acceso de apache
- solicita usuario y contraseña antes de acceder al sitio
- las credenciales se envian en cada peticion http
- se almacenan en formato hash en el archivo .htpasswd

## Tecnologias Utilizadas

- **Docker**: contenedorizacion de aplicaciones
- **Apache 2.4**: servidor web
- **PHP 8.1**: lenguaje de programacion
- **MySQL 8.0**: base de datos
- **OpenSSL**: generacion de certificados ssl
- **Bootstrap 4**: framework css para interfaces

## Notas de Seguridad

Para un entorno de produccion:
- usar certificados ssl de una autoridad certificadora real
- cambiar las contraseñas por defecto
- usar autenticacion mas robusta (oauth, jwt, etc)
- configurar firewall y permisos adecuados
- mantener actualizadas las imagenes de docker
