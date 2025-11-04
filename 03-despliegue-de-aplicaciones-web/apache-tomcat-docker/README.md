# 🚀 Despliegue de Aplicaciones Web con Docker
## Apache HTTP Server + Apache Tomcat + AJP Protocol

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white)](https://httpd.apache.org/)
[![Tomcat](https://img.shields.io/badge/Tomcat-F8DC75?style=for-the-badge&logo=apache-tomcat&logoColor=black)](https://tomcat.apache.org/)

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Arquitectura](#-arquitectura)
- [Requisitos Previos](#-requisitos-previos)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso](#-uso)
- [Acceso a las Aplicaciones](#-acceso-a-las-aplicaciones)
- [Despliegue de Aplicaciones WAR](#-despliegue-de-aplicaciones-war)
- [Seguridad](#-seguridad)
- [Monitorización y Logs](#-monitorización-y-logs)
- [Troubleshooting](#-troubleshooting)
- [Configuración Avanzada](#-configuración-avanzada)
- [Mantenimiento](#-mantenimiento)
- [FAQ](#-faq)

---

## 🎯 Descripción del Proyecto

Este proyecto implementa una solución completa de despliegue de aplicaciones web Java utilizando **Docker**, **Apache HTTP Server** y **Apache Tomcat** con comunicación mediante el protocolo **AJP (Apache JServ Protocol)**.

### Objetivos Cumplidos

✅ **Contenedorización completa** con Docker  
✅ **Reverse Proxy** configurado con Apache HTTP Server  
✅ **Servidor de aplicaciones** Tomcat optimizado  
✅ **Comunicación AJP** entre Apache y Tomcat  
✅ **Seguridad** implementada en interfaces administrativas  
✅ **Aplicación demo** incluida para pruebas  
✅ **Documentación completa** y bien estructurada  

### Características Principales

- 🐳 **Dockerfiles optimizados** siguiendo mejores prácticas
- 🔗 **Comunicación AJP** eficiente entre contenedores
- 🔒 **Autenticación y autorización** configurada
- 📊 **Healthchecks** y monitorización
- 🌐 **Red Docker** personalizada para aislamiento
- 💾 **Volúmenes persistentes** para logs y aplicaciones
- 🎨 **Aplicación demo** con interfaz moderna
- 📝 **Configuración bien documentada**

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENTE (Navegador)                    │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP (Puerto 80)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   APACHE HTTP SERVER                         │
│                     (Reverse Proxy)                          │
│  • mod_proxy                                                 │
│  • mod_proxy_ajp                                             │
│  • Virtual Hosts                                             │
└──────────────────────────┬──────────────────────────────────┘
                           │ AJP (Puerto 8009)
                           │ Red: app-network
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    APACHE TOMCAT                             │
│                 (Servidor de Aplicaciones)                   │
│  • Conector AJP habilitado                                   │
│  • Manager Application                                       │
│  • Aplicaciones WAR                                          │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Comunicación

1. **Cliente** → Realiza petición HTTP a `http://localhost/demo`
2. **Apache** → Recibe la petición en puerto 80
3. **mod_proxy_ajp** → Traduce la petición HTTP a AJP
4. **Red Docker** → Transmite la petición al contenedor Tomcat
5. **Tomcat** → Procesa la petición en puerto 8009 (AJP)
6. **Aplicación** → Genera la respuesta
7. **Tomcat** → Envía respuesta vía AJP
8. **Apache** → Traduce AJP a HTTP y envía al cliente

### Ventajas del Protocolo AJP

- ⚡ **Mayor rendimiento** que HTTP proxy
- 🔒 **Más seguro** (comunicación interna)
- 📦 **Menor overhead** en headers
- 🔄 **Keep-alive** nativo
- 🎯 **Optimizado** para Apache-Tomcat

---

## 📦 Requisitos Previos

### Software Necesario

- **Docker Desktop** (versión 20.10 o superior)
  - [Descargar para Windows](https://www.docker.com/products/docker-desktop)
  - [Descargar para macOS](https://www.docker.com/products/docker-desktop)
  - [Descargar para Linux](https://docs.docker.com/engine/install/)

- **Docker Compose** (versión 1.29 o superior)
  - Incluido en Docker Desktop
  - Linux: `sudo apt-get install docker-compose`

### Verificar Instalación

```powershell
# Verificar Docker
docker --version
# Salida esperada: Docker version 20.10.x o superior

# Verificar Docker Compose
docker-compose --version
# Salida esperada: docker-compose version 1.29.x o superior

# Verificar que Docker está corriendo
docker ps
```

### Recursos del Sistema Recomendados

- **RAM**: Mínimo 4GB, recomendado 8GB
- **CPU**: 2 cores mínimo
- **Disco**: 5GB de espacio libre
- **Sistema Operativo**: Windows 10/11, macOS, Linux

---

## 📁 Estructura del Proyecto

```
apache-tomcat-docker/
│
├── 📄 docker-compose.yml          # Orquestación de servicios
├── 📄 Dockerfile.apache           # Imagen de Apache HTTP Server
├── 📄 Dockerfile.tomcat           # Imagen de Apache Tomcat
├── 📄 README.md                   # Esta documentación
│
├── 📁 apache-config/              # Configuración de Apache
│   └── httpd-vhosts.conf         # Virtual Hosts y proxy config
│
├── 📁 tomcat-config/              # Configuración de Tomcat
│   ├── server.xml                # Configuración principal (AJP)
│   ├── tomcat-users.xml          # Usuarios y roles
│   └── context.xml               # Configuración de Manager
│
├── 📁 webapp/                     # Aplicaciones web
│   └── demo/                     # Aplicación de demostración
│       ├── index.html            # Página principal
│       ├── info.jsp              # Información del sistema
│       ├── test.jsp              # Página de pruebas
│       └── WEB-INF/
│           └── web.xml           # Descriptor de la aplicación
│
└── 📁 logs/                       # Logs (generados automáticamente)
    ├── apache/                   # Logs de Apache
    └── tomcat/                   # Logs de Tomcat
```

---

## 🔧 Instalación y Configuración

### Paso 1: Clonar o Descargar el Proyecto

```powershell
# Si estás en el repositorio
cd c:\xampp\htdocs\laravel\curso-2025\03-despliegue-de-aplicaciones-web\apache-tomcat-docker
```

### Paso 2: Verificar Archivos de Configuración

Asegúrate de que todos los archivos estén presentes:

```powershell
# Verificar estructura
dir
```

### Paso 3: Construir las Imágenes Docker

```powershell
# Construir todas las imágenes
docker-compose build

# O construir cada imagen por separado
docker-compose build apache
docker-compose build tomcat
```

**Tiempo estimado**: 5-10 minutos (primera vez)

### Paso 4: Iniciar los Servicios

```powershell
# Iniciar en modo detached (segundo plano)
docker-compose up -d

# O iniciar en modo interactivo (ver logs en tiempo real)
docker-compose up
```

### Paso 5: Verificar que los Contenedores Están Corriendo

```powershell
# Ver estado de los contenedores
docker-compose ps

# Salida esperada:
# NAME              STATUS          PORTS
# apache-proxy      Up (healthy)    0.0.0.0:80->80/tcp
# tomcat-server     Up (healthy)    0.0.0.0:8080->8080/tcp
```

### Paso 6: Verificar Logs

```powershell
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de Apache
docker-compose logs apache

# Ver logs de Tomcat
docker-compose logs tomcat

# Seguir logs en tiempo real
docker-compose logs -f
```

---

## 🎮 Uso

### Comandos Básicos

```powershell
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose stop

# Reiniciar servicios
docker-compose restart

# Detener y eliminar contenedores
docker-compose down

# Reconstruir e iniciar
docker-compose up -d --build

# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f

# Ver recursos utilizados
docker stats
```

### Acceder a los Contenedores

```powershell
# Acceder a Apache
docker-compose exec apache bash

# Acceder a Tomcat
docker-compose exec tomcat bash

# Ejecutar comando específico
docker-compose exec tomcat ps aux
```

---

## 🌐 Acceso a las Aplicaciones

### Aplicación Demo

| URL | Descripción |
|-----|-------------|
| `http://localhost/demo` | Página principal de la aplicación demo |
| `http://localhost/demo/info.jsp` | Información detallada del sistema |
| `http://localhost/demo/test.jsp` | Página de pruebas interactivas |

### Tomcat Manager (vía Apache Proxy)

| URL | Descripción | Credenciales |
|-----|-------------|--------------|
| `http://localhost/manager` | Tomcat Manager Application | admin / SecurePassword123! |
| `http://localhost/manager/html` | Interfaz HTML del Manager | admin / SecurePassword123! |
| `http://localhost/manager/status` | Estado del servidor | admin / SecurePassword123! |

### Acceso Directo a Tomcat (sin proxy)

| URL | Descripción |
|-----|-------------|
| `http://localhost:8080` | Página principal de Tomcat |
| `http://localhost:8080/demo` | Aplicación demo (acceso directo) |
| `http://localhost:8080/manager` | Manager (acceso directo) |

### Usuarios Configurados

| Usuario | Contraseña | Roles |
|---------|------------|-------|
| **admin** | SecurePassword123! | Todos los roles |
| **manager** | ManagerPass123! | manager-gui, manager-script |
| **deployer** | DeployPass123! | manager-script |
| **monitor** | MonitorPass123! | manager-status, manager-jmx |

> ⚠️ **IMPORTANTE**: Cambiar estas contraseñas en producción.

---

## 📤 Despliegue de Aplicaciones WAR

### Método 1: Copiar Archivo WAR

```powershell
# Copiar archivo .war a la carpeta webapp
cp tu-aplicacion.war webapp/

# Tomcat lo desplegará automáticamente
# Acceder vía: http://localhost/tu-aplicacion
```

### Método 2: Usar Tomcat Manager

1. Acceder a `http://localhost/manager/html`
2. Usuario: `admin` / Password: `SecurePassword123!`
3. En la sección "WAR file to deploy", seleccionar tu archivo `.war`
4. Click en "Deploy"

### Método 3: Copiar Directamente al Contenedor

```powershell
# Copiar WAR al contenedor
docker cp mi-app.war tomcat-server:/usr/local/tomcat/webapps/

# Verificar despliegue
docker-compose exec tomcat ls -la /usr/local/tomcat/webapps/
```

### Verificar Despliegue

```powershell
# Ver logs de despliegue
docker-compose logs -f tomcat

# Buscar mensaje: "Deployment of web application archive ... has finished"
```

### Eliminar Aplicación

```powershell
# Método 1: Borrar directorio
docker-compose exec tomcat rm -rf /usr/local/tomcat/webapps/mi-app

# Método 2: Usar Tomcat Manager
# Ir a http://localhost/manager/html y click en "Undeploy"
```

---

## 🔒 Seguridad

### Configuración Implementada

#### 1. Autenticación en Tomcat

- ✅ Usuarios y roles configurados en `tomcat-users.xml`
- ✅ Manager protegido con autenticación
- ✅ Host Manager protegido

#### 2. Restricciones de Acceso

- ✅ Puerto AJP (8009) no expuesto al host
- ✅ Comunicación AJP solo en red interna Docker
- ✅ `context.xml` configurado para permitir acceso desde proxy

#### 3. Mejores Prácticas Aplicadas

- ✅ Headers de seguridad HTTP
- ✅ Cookies con `HttpOnly`
- ✅ Aplicaciones de ejemplo eliminadas
- ✅ Permisos restrictivos en archivos de configuración

### Recomendaciones para Producción

#### Cambiar Contraseñas

Editar `tomcat-config/tomcat-users.xml`:

```xml
<user username="admin" 
      password="TuContraseñaSegura2024!@#" 
      roles="manager-gui,admin-gui"/>
```

#### Habilitar HTTPS

1. Obtener certificado SSL/TLS
2. Configurar Apache con SSL:

```apache
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
    # ... resto de configuración
</VirtualHost>
```

#### Habilitar Secret en AJP

En `tomcat-config/server.xml`:

```xml
<Connector port="8009" 
           protocol="AJP/1.3"
           secretRequired="true"
           secret="MiSecretoMuySeguros2024!@#" />
```

En `apache-config/httpd-vhosts.conf`:

```apache
ProxyPass /app ajp://tomcat:8009/app secret=MiSecretoMuySeguros2024!@#
```

#### Restringir Acceso por IP

En `tomcat-config/context.xml`:

```xml
<Valve className="org.apache.catalina.valves.RemoteAddrValve"
       allow="127\.\d+\.\d+\.\d+|192\.168\.1\.\d+" />
```

#### Firewall y Rate Limiting

```powershell
# En Apache, instalar mod_evasive para prevenir DoS
# En firewall, permitir solo puertos 80 y 443
```

---

## 📊 Monitorización y Logs

### Ubicación de Logs

```
logs/
├── apache/
│   ├── access.log      # Accesos a Apache
│   ├── error.log       # Errores de Apache
│   └── proxy.log       # Log específico de proxy
│
└── tomcat/
    ├── catalina.out    # Log principal de Tomcat
    ├── localhost.log   # Log del host
    └── manager.log     # Log del Manager
```

### Ver Logs en Tiempo Real

```powershell
# Todos los logs
docker-compose logs -f

# Solo Apache
docker-compose logs -f apache

# Solo Tomcat
docker-compose logs -f tomcat

# Últimas 100 líneas
docker-compose logs --tail=100

# Desde un timestamp específico
docker-compose logs --since 2024-11-04T10:00:00
```

### Análisis de Logs

```powershell
# Errores en Apache
docker-compose exec apache tail -f /usr/local/apache2/logs/error.log

# Errores en Tomcat
docker-compose exec tomcat tail -f /usr/local/tomcat/logs/catalina.out

# Buscar errores específicos
docker-compose logs tomcat | Select-String "ERROR"

# Contar accesos
docker-compose exec apache wc -l /usr/local/apache2/logs/access.log
```

### Métricas y Estadísticas

```powershell
# Uso de recursos
docker stats

# Información detallada de un contenedor
docker inspect tomcat-server

# Healthcheck status
docker inspect --format='{{.State.Health.Status}}' tomcat-server
```

---

## 🔧 Troubleshooting

### Problema: Los contenedores no inician

**Síntomas**: `docker-compose up` falla o contenedores en estado "Exited"

**Soluciones**:

```powershell
# Ver logs detallados
docker-compose logs

# Verificar puertos en uso
netstat -ano | findstr ":80"
netstat -ano | findstr ":8080"

# Detener servicios que usen puertos 80 u 8080
# En Windows: IIS, XAMPP, otros servicios web

# Reconstruir sin caché
docker-compose build --no-cache
docker-compose up -d
```

### Problema: Error 503 al acceder a /demo

**Síntomas**: "Service Unavailable" al acceder vía Apache

**Soluciones**:

```powershell
# Verificar que Tomcat esté healthy
docker-compose ps

# Verificar conectividad AJP desde Apache
docker-compose exec apache nc -zv tomcat 8009

# Ver logs de proxy
docker-compose exec apache tail -f /usr/local/apache2/logs/error.log

# Reiniciar Tomcat
docker-compose restart tomcat
```

### Problema: No puedo acceder a Tomcat Manager

**Síntomas**: Error 403 Forbidden en /manager

**Soluciones**:

```powershell
# Verificar que context.xml permita acceso
docker-compose exec tomcat cat /usr/local/tomcat/webapps/manager/META-INF/context.xml

# Verificar usuarios
docker-compose exec tomcat cat /usr/local/tomcat/conf/tomcat-users.xml

# Reiniciar Tomcat
docker-compose restart tomcat
```

### Problema: La aplicación WAR no se despliega

**Síntomas**: El archivo .war está en webapp/ pero no se despliega

**Soluciones**:

```powershell
# Verificar que el archivo esté en el contenedor
docker-compose exec tomcat ls -la /usr/local/tomcat/webapps/

# Ver logs de despliegue
docker-compose logs tomcat | Select-String "deploy"

# Verificar errores
docker-compose exec tomcat tail -f /usr/local/tomcat/logs/catalina.out

# Verificar permisos
docker-compose exec tomcat ls -la /usr/local/tomcat/webapps/demo.war
```

### Problema: Alto uso de memoria

**Síntomas**: Contenedores consumen demasiada RAM

**Soluciones**:

```powershell
# Ver uso actual
docker stats

# Ajustar límites en docker-compose.yml
# Editar sección deploy.resources.limits

# Ajustar memoria de Java en Tomcat
# Editar JAVA_OPTS en docker-compose.yml:
# JAVA_OPTS=-Xms256m -Xmx512m
```

### Problema: Logs muy grandes

**Síntomas**: Archivos de log ocupan mucho espacio

**Soluciones**:

```powershell
# Rotar logs manualmente
docker-compose exec apache sh -c "echo > /usr/local/apache2/logs/access.log"

# Configurar rotación automática
# Agregar logrotate en los contenedores

# Limpiar logs antiguos
rm -r logs/*
docker-compose restart
```

### Comandos de Diagnóstico

```powershell
# Verificar configuración de Apache
docker-compose exec apache httpd -t

# Verificar configuración de Tomcat
docker-compose exec tomcat /usr/local/tomcat/bin/configtest.sh

# Verificar conectividad de red
docker network inspect apache-tomcat-docker_app-network

# Verificar DNS interno
docker-compose exec apache ping tomcat

# Verificar variables de entorno
docker-compose exec tomcat env
```

---

## ⚙️ Configuración Avanzada

### Ajustar Rendimiento de Tomcat

Editar `docker-compose.yml`:

```yaml
environment:
  - JAVA_OPTS=-Xms1024m -Xmx2048m -XX:+UseG1GC -XX:MaxGCPauseMillis=200
```

### Agregar Múltiples Aplicaciones

En `apache-config/httpd-vhosts.conf`:

```apache
ProxyPass /app1 ajp://tomcat:8009/app1
ProxyPassReverse /app1 ajp://tomcat:8009/app1

ProxyPass /app2 ajp://tomcat:8009/app2
ProxyPassReverse /app2 ajp://tomcat:8009/app2
```

### Configurar Dominio Personalizado

En `apache-config/httpd-vhosts.conf`:

```apache
<VirtualHost *:80>
    ServerName miapp.local
    ServerAlias www.miapp.local
    
    ProxyPass / ajp://tomcat:8009/demo/
    ProxyPassReverse / ajp://tomcat:8009/demo/
</VirtualHost>
```

Agregar a `C:\Windows\System32\drivers\etc\hosts`:

```
127.0.0.1 miapp.local
```

### Habilitar Compresión

Ya está habilitado en `server.xml`:

```xml
<Connector port="8080" 
           compression="on"
           compressionMinSize="2048"
           compressibleMimeType="text/html,text/xml,application/json" />
```

### Configurar Balanceo de Carga

Para múltiples instancias de Tomcat, descomentar en `httpd-vhosts.conf`:

```apache
<Proxy balancer://tomcat-cluster>
    BalancerMember ajp://tomcat1:8009 route=tomcat1
    BalancerMember ajp://tomcat2:8009 route=tomcat2
    ProxySet lbmethod=byrequests
</Proxy>

ProxyPass /app balancer://tomcat-cluster/app
ProxyPassReverse /app balancer://tomcat-cluster/app
```

---

## 🛠️ Mantenimiento

### Actualizar Imágenes Base

```powershell
# Actualizar imágenes
docker-compose pull

# Reconstruir con nuevas imágenes
docker-compose up -d --build
```

### Backup de Configuración

```powershell
# Crear backup
$fecha = Get-Date -Format "yyyyMMdd"
Compress-Archive -Path apache-config, tomcat-config, webapp -DestinationPath "backup-$fecha.zip"
```

### Limpiar Recursos Docker

```powershell
# Limpiar contenedores detenidos
docker container prune

# Limpiar imágenes no usadas
docker image prune

# Limpiar volúmenes no usados
docker volume prune

# Limpiar todo
docker system prune -a
```

### Monitoreo Proactivo

```powershell
# Script de monitoreo
docker-compose ps | Select-String "Up"

# Verificar espacio en disco
docker system df
```

---

## ❓ FAQ

### ¿Por qué usar AJP en lugar de HTTP proxy?

AJP es más eficiente para comunicación Apache-Tomcat:
- Menor overhead de headers
- Mejor rendimiento
- Optimizado específicamente para esta integración

### ¿Puedo usar esto en producción?

Sí, pero primero:
- Cambiar todas las contraseñas
- Habilitar HTTPS
- Configurar secret en AJP
- Implementar respaldos
- Configurar monitoreo

### ¿Cómo escalo la solución?

Opciones:
1. Múltiples instancias de Tomcat con balanceo de carga
2. Docker Swarm para orquestación
3. Kubernetes para entornos grandes

### ¿Funciona en Windows/Mac/Linux?

Sí, Docker es multiplataforma. Solo ajustar rutas en PowerShell/Bash según el sistema.

### ¿Qué versión de Java usa?

Tomcat 10.1 con JDK 17 (definido en Dockerfile.tomcat)

### ¿Cómo depuro problemas de red?

```powershell
docker network inspect apache-tomcat-docker_app-network
docker-compose exec apache ping tomcat
docker-compose exec apache nc -zv tomcat 8009
```

---

## 📚 Referencias y Recursos

### Documentación Oficial

- [Apache HTTP Server](https://httpd.apache.org/docs/)
- [Apache Tomcat](https://tomcat.apache.org/tomcat-10.1-doc/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AJP Protocol](https://tomcat.apache.org/connectors-doc/ajp/ajpv13a.html)

### Tutoriales y Guías

- [Docker para principiantes](https://docs.docker.com/get-started/)
- [Tomcat Configuration](https://tomcat.apache.org/tomcat-10.1-doc/config/)
- [Apache mod_proxy](https://httpd.apache.org/docs/2.4/mod/mod_proxy.html)

---

## 👨‍💻 Autor

**Proyecto de Despliegue de Aplicaciones Web**  
Curso: Despliegue de Aplicaciones Web  
Fecha: Noviembre 2025

---

## 📝 Licencia

Este proyecto es de uso educativo.

---

## 🎉 ¡Proyecto Completado!

Si has llegado hasta aquí, ¡felicidades! Has implementado exitosamente:

- ✅ Dockerfiles optimizados para Apache y Tomcat
- ✅ Configuración de proxy con AJP
- ✅ Seguridad en interfaces administrativas
- ✅ Aplicación demo funcional
- ✅ Documentación completa
- ✅ Solución lista para desarrollo y producción

### Próximos Pasos

1. Personalizar la aplicación demo
2. Desplegar tus propias aplicaciones WAR
3. Configurar HTTPS para producción
4. Implementar CI/CD para despliegues automatizados
5. Escalar la solución según necesidades

**¡Buen despliegue! 🚀**
