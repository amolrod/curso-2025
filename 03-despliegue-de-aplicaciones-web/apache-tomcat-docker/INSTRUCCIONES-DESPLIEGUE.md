# 🚀 INSTRUCCIONES DE DESPLIEGUE
## Apache Tomcat Docker - Guía Paso a Paso

---

## ✅ PRE-REQUISITOS

Antes de comenzar, asegúrate de tener:

1. ✅ **Docker Desktop instalado y corriendo**
   ```powershell
   docker --version
   # Debe mostrar: Docker version 20.10.x o superior
   ```

2. ✅ **Docker Compose instalado**
   ```powershell
   docker-compose --version
   # Debe mostrar: docker-compose version 1.29.x o superior
   ```

3. ✅ **Puertos 80 y 8080 libres**
   ```powershell
   # Verificar que no haya servicios usando estos puertos
   netstat -ano | findstr ":80 "
   netstat -ano | findstr ":8080"
   
   # Si hay servicios, detenerlos (ej: IIS, XAMPP, etc.)
   ```

---

## 📍 PASO 1: Navegar al Directorio

```powershell
cd c:\xampp\htdocs\laravel\curso-2025\03-despliegue-de-aplicaciones-web\apache-tomcat-docker
```

---

## 🔨 PASO 2: Construir las Imágenes Docker

```powershell
# Construir todas las imágenes
docker-compose build

# Esto tomará 5-10 minutos la primera vez
# Verás mensajes de descarga y construcción de:
# - Apache HTTP Server
# - Apache Tomcat
```

**Salida esperada:**
```
Building apache
[+] Building 120.5s (10/10) FINISHED
Building tomcat
[+] Building 145.2s (12/12) FINISHED
```

---

## 🚀 PASO 3: Iniciar los Servicios

```powershell
# Iniciar en modo detached (segundo plano)
docker-compose up -d
```

**Salida esperada:**
```
Creating network "apache-tomcat-docker_app-network" ... done
Creating tomcat-server ... done
Creating apache-proxy  ... done
```

---

## ✅ PASO 4: Verificar que Todo Está Funcionando

### 4.1 Verificar Estado de Contenedores

```powershell
docker-compose ps
```

**Salida esperada:**
```
NAME              STATUS          PORTS
apache-proxy      Up (healthy)    0.0.0.0:80->80/tcp
tomcat-server     Up (healthy)    0.0.0.0:8080->8080/tcp
```

> ⚠️ **Importante:** Espera hasta que ambos contenedores muestren `(healthy)`

### 4.2 Ver Logs

```powershell
# Ver logs de ambos servicios
docker-compose logs

# O ver logs en tiempo real
docker-compose logs -f

# Presiona Ctrl+C para salir de los logs
```

### 4.3 Probar Acceso Web

**Opción 1: Desde PowerShell**
```powershell
# Probar Apache
curl http://localhost/

# Probar Tomcat
curl http://localhost:8080/

# Probar aplicación demo
curl http://localhost/demo
```

**Opción 2: Desde el Navegador**

Abre tu navegador y visita:
- `http://localhost/demo` ✅ Debería mostrar la aplicación demo
- `http://localhost:8080` ✅ Debería mostrar la página de Tomcat

---

## 🎯 PASO 5: Acceder a las Aplicaciones

### Aplicación Demo

| URL | Descripción |
|-----|-------------|
| http://localhost/demo | Página principal |
| http://localhost/demo/info.jsp | Información del sistema |
| http://localhost/demo/test.jsp | Página de pruebas |

### Tomcat Manager

1. Abrir: `http://localhost/manager/html`
2. Credenciales:
   - **Usuario:** `admin`
   - **Password:** `SecurePassword123!`

---

## 📤 PASO 6: Desplegar Tu Aplicación WAR (Opcional)

### Método 1: Copiar archivo WAR

```powershell
# Copiar tu archivo .war a la carpeta webapp
Copy-Item "ruta\a\tu\aplicacion.war" -Destination "webapp\"

# Esperar unos segundos para que Tomcat lo despliegue automáticamente

# Acceder a tu aplicación en:
# http://localhost/tu-aplicacion
```

### Método 2: Usar Tomcat Manager

1. Ir a `http://localhost/manager/html`
2. Login con `admin` / `SecurePassword123!`
3. Scroll hasta "WAR file to deploy"
4. Seleccionar tu archivo `.war`
5. Click en "Deploy"

---

## 🔍 VERIFICACIÓN FINAL

### Checklist de Verificación

- [ ] Contenedores en estado "healthy"
- [ ] http://localhost/demo carga correctamente
- [ ] http://localhost/manager funciona con login
- [ ] No hay errores en los logs
- [ ] Los puertos 80 y 8080 responden

### Comandos de Verificación

```powershell
# 1. Estado de contenedores
docker-compose ps

# 2. Healthcheck de Apache
docker inspect --format='{{.State.Health.Status}}' apache-proxy

# 3. Healthcheck de Tomcat
docker inspect --format='{{.State.Health.Status}}' tomcat-server

# 4. Conectividad AJP
docker-compose exec apache nc -zv tomcat 8009

# 5. Ver logs recientes
docker-compose logs --tail=50
```

---

## 🛑 DETENER EL PROYECTO

### Detener servicios (mantener contenedores)

```powershell
docker-compose stop
```

### Detener y eliminar contenedores

```powershell
docker-compose down
```

### Eliminar todo (contenedores + volúmenes)

```powershell
docker-compose down -v
```

---

## 🔄 REINICIAR EL PROYECTO

```powershell
# Reiniciar servicios
docker-compose restart

# O detener y volver a iniciar
docker-compose down
docker-compose up -d
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema 1: Error al construir imágenes

**Síntoma:** Error durante `docker-compose build`

**Solución:**
```powershell
# Limpiar caché y reconstruir
docker-compose build --no-cache
```

### Problema 2: Puerto 80 ya en uso

**Síntoma:** "Error starting userland proxy: listen tcp 0.0.0.0:80: bind: address already in use"

**Solución:**
```powershell
# Detener servicios que usen puerto 80
# En Windows: Detener IIS, XAMPP, etc.

# O cambiar el puerto en docker-compose.yml
# Editar línea: - "8000:80"  # Usar puerto 8000 en lugar de 80
```

### Problema 3: Contenedores no pasan healthcheck

**Síntoma:** Contenedores en estado "unhealthy"

**Solución:**
```powershell
# Ver logs para identificar el problema
docker-compose logs

# Reiniciar servicios
docker-compose restart

# Si persiste, reconstruir
docker-compose down
docker-compose up -d --build
```

### Problema 4: Error 503 al acceder a /demo

**Síntoma:** "Service Unavailable" en el navegador

**Solución:**
```powershell
# Verificar que Tomcat esté corriendo
docker-compose ps

# Ver logs de Tomcat
docker-compose logs tomcat

# Reiniciar Tomcat
docker-compose restart tomcat

# Verificar conectividad AJP
docker-compose exec apache nc -zv tomcat 8009
```

### Problema 5: No puedo acceder a Manager

**Síntoma:** Error 403 o credenciales no funcionan

**Solución:**
```powershell
# Verificar configuración de usuarios
docker-compose exec tomcat cat /usr/local/tomcat/conf/tomcat-users.xml

# Reiniciar Tomcat
docker-compose restart tomcat

# Verificar context.xml
docker-compose exec tomcat cat /usr/local/tomcat/webapps/manager/META-INF/context.xml
```

---

## 📋 COMANDOS ÚTILES

### Gestión de Servicios

```powershell
# Ver estado
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f apache
docker-compose logs -f tomcat

# Reiniciar un servicio
docker-compose restart apache
docker-compose restart tomcat

# Detener todos
docker-compose stop

# Iniciar todos
docker-compose start
```

### Acceso a Contenedores

```powershell
# Acceder a Apache
docker-compose exec apache bash

# Acceder a Tomcat
docker-compose exec tomcat bash

# Ejecutar comando en contenedor
docker-compose exec tomcat ls -la /usr/local/tomcat/webapps/
```

### Monitoreo

```powershell
# Uso de recursos
docker stats

# Información de red
docker network inspect apache-tomcat-docker_app-network

# Información de volúmenes
docker volume ls
```

---

## 📚 SIGUIENTE PASO

Una vez que todo esté funcionando:

1. ✅ Lee el **README.md** completo para conocer todas las características
2. ✅ Prueba la aplicación demo en http://localhost/demo
3. ✅ Explora Tomcat Manager en http://localhost/manager
4. ✅ Despliega tu propia aplicación WAR
5. ✅ Personaliza la configuración según tus necesidades

---

## 🎉 ¡DESPLIEGUE EXITOSO!

Si has llegado hasta aquí sin errores, ¡felicitaciones! 

Tu entorno Docker con Apache + Tomcat está:
- ✅ Completamente funcional
- ✅ Listo para desarrollo
- ✅ Preparado para desplegar aplicaciones WAR

### URLs de Acceso Rápido

- **Demo App:** http://localhost/demo
- **Tomcat Manager:** http://localhost/manager (admin / SecurePassword123!)
- **Tomcat Directo:** http://localhost:8080

---

## 📞 AYUDA ADICIONAL

- **Documentación completa:** `README.md`
- **Guía rápida:** `GUIA-RAPIDA.md`
- **Checklist:** `CHECKLIST.md`
- **Resumen:** `RESUMEN-PROYECTO.md`

---

**¡Buen despliegue! 🚀**
