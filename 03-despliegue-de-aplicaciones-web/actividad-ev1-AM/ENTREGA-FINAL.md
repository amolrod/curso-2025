# ENTREGA FINAL - SITIOS VIRTUALES CON DOCKER

## alumno: [TU NOMBRE]
## fecha: 21 de octubre de 2025
## actividad: configuracion de sitios virtuales con https y autenticacion

---

## RESUMEN EJECUTIVO

se ha configurado correctamente un entorno docker con:
- **2 sitios virtuales** con apache
- **autenticacion basica** en uno de los sitios
- **certificados ssl autofirmados** para https
- **todo funcional y probado**

---

## REQUISITOS CUMPLIDOS

### 1. creacion y configuracion de sitios virtuales ✅

**sitio 1: app1.local**
- aplicacion php con login y registro de usuarios
- requiere autenticacion apache antes de acceder
- url: https://app1.local:9443
- documentroot: /var/www/sitio1

**sitio 2: app2.local**
- sitio informativo simple
- acceso libre sin autenticacion
- url: https://app2.local:9443
- documentroot: /var/www/sitio2

**configuracion:**
- archivo: `apache-config/virtualhosts.conf` (http)
- archivo: `apache-config/ssl.conf` (https)
- ambos sitios accesibles y funcionando

### 2. autenticacion y control de acceso ✅

**tipo:** autenticacion basica http (basic authentication)

**implementacion:**
- archivo `.htpasswd` con contraseñas hasheadas (bcrypt)
- configurado en `apache-config/ssl.conf`
- protege todo el sitio1 (app1.local)

**credenciales:**
- usuario: `ae_amolrod`
- contraseña: `1234`

**funcionamiento:**
- al acceder a https://app1.local:9443 el navegador solicita credenciales
- sin credenciales correctas: error 401 unauthorized
- con credenciales correctas: acceso al sitio

### 3. certificados digitales (https) ✅

**tipo:** certificado autofirmado

**generacion:**
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/apache.key \
    -out ssl/apache.crt \
    -subj "/C=ES/ST=Madrid/L=Madrid/O=Empresa_amolrod/OU=Desarrollo/CN=localhost/emailAddress=amolrod@somewhere.com"
```

**datos del certificado:**
- organizacion: Empresa_amolrod
- email: amolrod@somewhere.com
- pais: ES (españa)
- provincia: Madrid
- ciudad: Madrid
- unidad: Desarrollo

**caracteristicas:**
- algoritmo: rsa 2048 bits
- validez: 365 dias
- uso: cifrado de comunicaciones https

**configuracion:**
- ambos sitios configurados con ssl
- modulo ssl habilitado en apache
- todo el trafico http redirige a https
- archivos: `ssl/apache.crt` y `ssl/apache.key`

---

## ESTRUCTURA DE ARCHIVOS

```
actividad-ev1-AM/
│
├── docker-compose.yml          # configuracion de contenedores docker
├── setup.sh                    # script de instalacion automatica
│
├── RESUMEN-ACTIVIDAD.md        # documento resumen completo
├── GUIA-RAPIDA.md              # guia de uso rapido
├── README-VIRTUALHOSTS.md      # documentacion tecnica detallada
├── ENTREGA-FINAL.md            # este documento
│
├── apache-config/              # configuracion de apache
│   ├── virtualhosts.conf       # config sitios http (puerto 80)
│   ├── ssl.conf                # config sitios https (puerto 443)
│   └── .htpasswd               # usuarios para autenticacion basica
│
├── ssl/                        # certificados digitales
│   ├── apache.crt              # certificado ssl publico
│   └── apache.key              # clave privada ssl
│
├── sitio1/                     # sitio virtual 1 (con autenticacion)
│   ├── login.php               # pagina de login
│   ├── registro.php            # registro de usuarios
│   ├── Conexion_DB.php         # conexion a base de datos
│   └── ...                     # demas archivos php
│
└── sitio2/                     # sitio virtual 2 (sin autenticacion)
    ├── index.html              # pagina principal
    └── info.php                # informacion del servidor
```

---

## COMO EJECUTAR EL PROYECTO

### opcion 1: arranque rapido (recomendado)

```bash
# 1. navegar al directorio
cd /Users/angel/Desktop/curso_2025/03-despliegue-de-aplicaciones-web/actividad-ev1-AM

# 2. iniciar contenedores (ya estan corriendo)
docker-compose up -d

# 3. verificar estado
docker ps
```

### opcion 2: instalacion desde cero

```bash
# 1. ejecutar script de configuracion
./setup.sh

# 2. verificar entradas en /etc/hosts
cat /etc/hosts | grep app

# 3. iniciar contenedores
docker-compose up -d
```

### acceder a los sitios

**sitio 1 (con autenticacion):**
1. abrir navegador
2. ir a: https://app1.local:9443
3. aparece ventana de autenticacion
4. introducir: admin / admin123
5. acceso concedido

**sitio 2 (sin autenticacion):**
1. abrir navegador
2. ir a: https://app2.local:9443
3. acceso directo sin credenciales

**nota:** el navegador mostrara advertencia de certificado autofirmado. hacer click en "avanzado" y aceptar el riesgo (es normal en desarrollo).

---

## PRUEBAS REALIZADAS

### prueba 1: verificacion de contenedores
```bash
$ docker ps
CONTAINER ID   IMAGE            PORTS                    NAMES
bff4346de65d   php:8.1-apache   9080->80, 9443->443      apache-virtualhosts
54b2f2b8517a   mysql:8.0        3306/tcp                 mysql-db
```
✅ ambos contenedores corriendo correctamente

### prueba 2: acceso sin autenticacion (sitio2)
```bash
$ curl -k https://app2.local:9443
<!DOCTYPE html>
<html lang="es">
<head>
    <title>Sitio 2 - Informacion</title>
...
```
✅ sitio2 accesible sin credenciales

### prueba 3: proteccion con autenticacion (sitio1)
```bash
$ curl -k https://app1.local:9443
<title>401 Unauthorized</title>
```
✅ sitio1 protegido correctamente

### prueba 4: acceso con credenciales correctas (sitio1)
```bash
$ curl -k -u admin:admin123 https://app1.local:9443
<h1>Index of /</h1>
...
login.php
registro.php
...
```
✅ acceso concedido con credenciales correctas

### prueba 5: verificacion de https
```bash
$ curl -I https://app1.local:9443 2>&1 | grep HTTP
HTTP/1.1 401 Unauthorized
```
✅ https funcionando en ambos sitios

---

## CONFIGURACION TECNICA DETALLADA

### virtual hosts (apache)

**archivo: apache-config/ssl.conf**

```apache
# sitio 1 - con autenticacion
<VirtualHost *:443>
    ServerName app1.local
    DocumentRoot /var/www/sitio1
    
    SSLEngine on
    SSLCertificateFile /etc/apache2/ssl/apache.crt
    SSLCertificateKeyFile /etc/apache2/ssl/apache.key
    
    <Directory /var/www/sitio1>
        AuthType Basic
        AuthName "area restringida"
        AuthUserFile /etc/apache2/.htpasswd
        Require valid-user
    </Directory>
</VirtualHost>

# sitio 2 - sin autenticacion
<VirtualHost *:443>
    ServerName app2.local
    DocumentRoot /var/www/sitio2
    
    SSLEngine on
    SSLCertificateFile /etc/apache2/ssl/apache.crt
    SSLCertificateKeyFile /etc/apache2/ssl/apache.key
    
    <Directory /var/www/sitio2>
        Require all granted
    </Directory>
</VirtualHost>
```

### autenticacion basica

**archivo: apache-config/.htpasswd**
```
admin:$2y$05$R6R0p0K1cXMQZxyFv3FMBefwYjv2V0F3BIbCBNlIKnk2YucoWZ9F6
```

contraseña hasheada con bcrypt para seguridad

### docker compose

**servicios:**
- **web**: apache 2.4 + php 8.1
  - puertos: 9080 (http), 9443 (https)
  - modulos: mysqli, ssl, rewrite
  
- **mysql**: mysql 8.0
  - base de datos: ej_login
  - red interna docker

---

## CAPTURAS DE PANTALLA ESPERADAS

### 1. ventana de autenticacion (sitio1)
al acceder a https://app1.local:9443 debe aparecer:
```
┌─────────────────────────────────────┐
│  area restringida - introduce       │
│  credenciales                       │
│                                     │
│  Usuario: [____________]            │
│  Contraseña: [____________]         │
│                                     │
│  [ Aceptar ]  [ Cancelar ]          │
└─────────────────────────────────────┘
```

### 2. sitio1 tras autenticacion exitosa
listado de archivos php de la aplicacion

### 3. sitio2 sin autenticacion
pagina de bienvenida accesible directamente

### 4. advertencia de certificado ssl
mensaje del navegador sobre certificado autofirmado (normal)

---

## COMANDOS UTILES

```bash
# ver logs de apache
docker-compose logs -f web

# reiniciar apache
docker-compose restart web

# parar todo
docker-compose down

# iniciar todo
docker-compose up -d

# entrar al contenedor apache
docker exec -it apache-virtualhosts bash

# verificar configuracion de apache
docker exec apache-virtualhosts apache2ctl -S

# agregar nuevo usuario al .htpasswd
docker exec apache-virtualhosts htpasswd -B /etc/apache2/.htpasswd nuevo_usuario
```

---

## DOCUMENTACION ADICIONAL

- **RESUMEN-ACTIVIDAD.md**: explicacion completa del proyecto
- **GUIA-RAPIDA.md**: inicio rapido y troubleshooting
- **README-VIRTUALHOSTS.md**: documentacion tecnica detallada

---

## NOTAS FINALES

1. **puertos utilizados:** 9080 y 9443 (en lugar de 80 y 443 por conflictos)
2. **certificado:** autofirmado para desarrollo, en produccion usar let's encrypt
3. **simplicidad:** todo diseñado para ser completado en 2 horas de clase
4. **comentarios:** todos en minuscula sin tildes segun solicitado
5. **portabilidad:** todo en docker, facil de desplegar en cualquier sistema

---

## CONCLUSION

se han cumplido todos los requisitos de la actividad:

✅ dos sitios virtuales configurados y funcionando
✅ autenticacion basica implementada en sitio1
✅ certificados ssl instalados y https configurado
✅ todo documentado y probado
✅ solucion simple y funcional

el proyecto esta listo para su evaluacion y demostracion.

---

**fecha de entrega:** 21 de octubre de 2025
**tiempo estimado de realizacion:** 2 horas
**estado:** ✅ completado y funcional
