# 🚀 Apache + Tomcat en Contenedor Unificado

## 📋 Descripción

Proyecto Docker que implementa **Apache HTTP Server** y **Apache Tomcat** en un **único contenedor Ubuntu 20.04**, conectados mediante **proxy HTTP inverso** (mod_proxy_http).

Este proyecto sigue **exactamente las instrucciones del documento** de la actividad académica.

---

## 🎯 Objetivo

Configurar un entorno Docker con:
- **Ubuntu 20.04** como sistema operativo base
- **Apache HTTP Server** como servidor web frontend (puerto 80)
- **Apache Tomcat** como servidor de aplicaciones Java (puertos 8080 y 8082)
- **Conexión mediante proxy HTTP** entre Apache y Tomcat
- **Despliegue de aplicaciones WAR** (Formulario.war y sample)

---

## 📂 Estructura del Proyecto

```
version-unificada/
│
├── 📄 Dockerfile                      # Construcción del contenedor unificado
├── 📄 docker-compose.yml              # Orquestación y configuración
│
├── 📁 config/                         # Archivos de configuración
│   ├── server.xml                    # Tomcat - Conectores en puertos 8080 y 8082
│   ├── tomcat-users.xml              # Usuarios y roles de Tomcat
│   └── apache2.conf                  # Apache - Módulos proxy y rutas
│
├── 📁 scripts/                        # Scripts de inicio
│   └── start.sh                      # Arranca Apache + Tomcat
│
├── 📁 webapp/                         # Aplicaciones web
│   ├── prueba.html                   # Página de prueba de Apache
│   ├── Formulario.war                # Aplicación WAR del proyecto
│   └── sample/                       # Aplicación de ejemplo
│       ├── hello.jsp                 # JSP de prueba
│       └── WEB-INF/web.xml           # Descriptor de aplicación
│
└── 📁 logs/                           # Logs persistentes (auto-generado)
    ├── apache/                       # Logs de Apache
    └── tomcat/                       # Logs de Tomcat
```

---

## 🔧 Configuración Implementada

### 1. Conectores de Tomcat (server.xml)

```xml
<!-- Conector HTTP estándar -->
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />

<!-- Conector para proxy Apache-Tomcat -->
<Connector port="8082"
           maxThreads="150"
           minSpareThreads="25"
           maxSpareThreads="75"
           enableLookups="false"
           acceptCount="100"
           connectionTimeout="20000"
           proxyPort="80"
           disableUploadTimeout="true" />
```

### 2. Proxy Apache (apache2.conf)

```apache
# Cargar módulos
LoadModule proxy_module /usr/lib/apache2/modules/mod_proxy.so
LoadModule proxy_http_module /usr/lib/apache2/modules/mod_proxy_http.so

# Proxy para aplicación sample
ProxyPass        /tomcat-demo-proxy http://127.0.0.1:8082/sample/
ProxyPassReverse /tomcat-demo-proxy http://127.0.0.1:8082/sample/

# Proxy para Formulario.war
ProxyPass        /Formulario http://127.0.0.1:8082/Formulario/
ProxyPassReverse /Formulario http://127.0.0.1:8082/Formulario/
```

### 3. Usuarios de Tomcat (tomcat-users.xml)

```xml
<role rolename="admin"/>
<role rolename="admin-gui"/>
<role rolename="manager"/>
<role rolename="manager-gui"/>

<user username="admin" password="admin123" 
      roles="admin,admin-gui,manager,manager-gui"/>
```

---

## 🚀 Inicio Rápido

### Opción 1: Docker Compose (Recomendado)

```powershell
# Construir y levantar el contenedor
docker-compose up -d --build

# Ver logs en tiempo real
docker-compose logs -f

# Detener el contenedor
docker-compose down
```

### Opción 2: Docker Puro

```powershell
# Construir imagen
docker build -t apache-tomcat-unificado .

# Ejecutar contenedor
docker run -d --name servidor-unificado `
  -p 8080:80 `
  -p 8081:8080 `
  -p 8082:8082 `
  apache-tomcat-unificado

# Ver logs
docker logs -f servidor-unificado
```

---

## 🌐 URLs de Acceso

### Apache Web Server (Puerto 8080)

| URL | Descripción |
|-----|-------------|
| `http://localhost:8080/prueba.html` | Página de prueba de Apache |
| `http://localhost:8080/tomcat-demo-proxy/hello.jsp` | Sample vía proxy Apache |
| `http://localhost:8080/Formulario` | Formulario.war vía proxy Apache |
| `http://localhost:8080/manager` | Tomcat Manager vía proxy Apache |

### Tomcat Directo (Puerto 8081)

| URL | Descripción |
|-----|-------------|
| `http://localhost:8081/` | Página principal de Tomcat |
| `http://localhost:8081/sample/hello.jsp` | Sample - acceso directo |
| `http://localhost:8081/Formulario` | Formulario.war - acceso directo |
| `http://localhost:8081/manager` | Tomcat Manager - acceso directo |

### Tomcat Puerto Proxy (Puerto 8082)

| URL | Descripción |
|-----|-------------|
| `http://localhost:8082/sample/hello.jsp` | Sample - puerto proxy |
| `http://localhost:8082/Formulario` | Formulario.war - puerto proxy |

**Credenciales Manager:**
- Usuario: `admin`
- Contraseña: `admin123`

---

## 📊 Mapeo de Puertos

| Host | Contenedor | Servicio |
|------|-----------|----------|
| 8080 | 80 | Apache HTTP Server |
| 8081 | 8080 | Tomcat (acceso directo) |
| 8082 | 8082 | Tomcat (puerto proxy) |

---

## ✅ Verificación del Funcionamiento

### 1. Verificar Apache

```powershell
# Desde PowerShell
curl http://localhost:8080/prueba.html
# Debe mostrar: "We made it!!"

# O abrir en navegador
Start-Process "http://localhost:8080/prueba.html"
```

### 2. Verificar Tomcat Directo

```powershell
# Acceso directo a Sample
Start-Process "http://localhost:8081/sample/hello.jsp"
```

### 3. Verificar Proxy Apache → Tomcat

```powershell
# Sample vía proxy Apache
Start-Process "http://localhost:8080/tomcat-demo-proxy/hello.jsp"

# Formulario vía proxy Apache
Start-Process "http://localhost:8080/Formulario"
```

### 4. Verificar Logs

```powershell
# Logs del contenedor
docker-compose logs -f

# Logs de Apache
docker-compose exec servidor-unificado cat /var/log/apache2/access.log

# Logs de Tomcat
docker-compose exec servidor-unificado cat /opt/tomcat/logs/catalina.out
```

---

## 🔍 Comandos de Depuración

```powershell
# Entrar al contenedor
docker-compose exec servidor-unificado bash

# Verificar estado de Apache
service apache2 status

# Verificar procesos de Tomcat
ps aux | grep tomcat

# Verificar puertos en uso
netstat -tulpn | grep LISTEN

# Ver aplicaciones desplegadas en Tomcat
ls -la /opt/tomcat/webapps/

# Probar conectividad interna
curl http://127.0.0.1:80/prueba.html
curl http://127.0.0.1:8080/sample/hello.jsp
curl http://127.0.0.1:8082/sample/hello.jsp
```

---

## 📝 Diferencias con la Versión Anterior

| Aspecto | Versión Anterior | Esta Versión |
|---------|------------------|--------------|
| **Arquitectura** | 2 contenedores separados | 1 contenedor unificado |
| **Protocolo** | AJP (mod_proxy_ajp) | HTTP (mod_proxy_http) |
| **Imagen base** | tomcat:10.1-jdk17 oficial | Ubuntu 20.04 |
| **Puerto proxy** | 8009 (AJP) | 8082 (HTTP) |
| **Instalación Tomcat** | Preinstalado | Manual desde Apache.org |
| **Complejidad** | Baja (Docker Compose) | Media (configuración manual) |
| **Propósito** | Producción/Desarrollo | Educativo (según documento) |

---

## 🎓 Flujo de Solicitudes

```
Cliente → Apache (puerto 80) → Proxy HTTP → Tomcat (puerto 8082) → Aplicación WAR
   ↓
Host:8080
```

### Ejemplo: Acceso a `/tomcat-demo-proxy/hello.jsp`

1. Cliente solicita: `http://localhost:8080/tomcat-demo-proxy/hello.jsp`
2. Apache recibe en puerto 80
3. Apache proxy redirige a: `http://127.0.0.1:8082/sample/hello.jsp`
4. Tomcat procesa en puerto 8082
5. Respuesta JSP → Apache → Cliente

---

## 🛠️ Solución de Problemas

### Error 403 en Manager/Examples

**Problema:** Access Denied al acceder a `/manager` o `/examples`

**Solución:** El Dockerfile ya comenta automáticamente las restricciones de `RemoteAddrValve`. Si persiste:

```powershell
docker-compose exec servidor-unificado bash
nano /opt/tomcat/webapps/manager/META-INF/context.xml
# Comentar el bloque <Valve className="org.apache.catalina.valves.RemoteAddrValve"...
```

### Tomcat no arranca

**Verificar logs:**
```powershell
docker-compose logs servidor-unificado
docker-compose exec servidor-unificado cat /opt/tomcat/logs/catalina.out
```

**Verificar JAVA_HOME:**
```powershell
docker-compose exec servidor-unificado bash -c 'echo $JAVA_HOME'
# Debe mostrar: /usr/lib/jvm/java-11-openjdk-amd64
```

### Proxy no funciona

**Verificar módulos Apache:**
```powershell
docker-compose exec servidor-unificado bash
a2query -m proxy
a2query -m proxy_http
# Deben estar habilitados
```

---

## 📚 Documentación de Referencia

- [Apache HTTP Server Documentation](https://httpd.apache.org/docs/)
- [Apache Tomcat 10.1 Documentation](https://tomcat.apache.org/tomcat-10.1-doc/)
- [mod_proxy Documentation](https://httpd.apache.org/docs/2.4/mod/mod_proxy.html)
- [Docker Documentation](https://docs.docker.com/)

---

## 🆚 Comparación con el Proyecto Principal

### ¿Cuándo usar esta versión?

✅ **Usar versión-unificada si:**
- Necesitas seguir exactamente las instrucciones del documento académico
- Quieres entender cómo instalar Tomcat manualmente
- Prefieres un único contenedor con ambos servicios
- Estás aprendiendo la configuración de proxy HTTP

✅ **Usar versión principal (apache-tomcat-docker) si:**
- Necesitas un entorno de producción optimizado
- Prefieres separación de responsabilidades (contenedores independientes)
- Quieres aprovechar imágenes oficiales de Docker Hub
- Necesitas escalabilidad y mejor rendimiento (AJP)

---

## 📅 Changelog

### v1.0 (04/11/2025)
- ✅ Implementación inicial según documento de la actividad
- ✅ Dockerfile con Ubuntu 20.04
- ✅ Apache + Tomcat en el mismo contenedor
- ✅ Proxy HTTP en puerto 8082
- ✅ Aplicaciones sample y Formulario.war
- ✅ Configuración de usuarios y permisos
- ✅ Script de inicio automatizado
- ✅ Docker Compose funcional

---

## 👨‍💻 Autor

Proyecto desarrollado siguiendo las instrucciones del documento:
**"Configurar un entorno Docker con Ubuntu 20.04 que incluya un servidor web Apache y un servidor de aplicaciones Tomcat"**

---

## 📄 Licencia

Proyecto educativo - Actividad de Despliegue de Aplicaciones Web

---

**🎯 ¡Proyecto listo para demostración y evaluación!**
