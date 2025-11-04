# ==============================================================================
# GUÍA RÁPIDA - Apache Tomcat Docker
# ==============================================================================

## 🚀 INICIO RÁPIDO

### 1. Construir e Iniciar
```powershell
cd apache-tomcat-docker
docker-compose up -d --build
```

### 2. Verificar Estado
```powershell
docker-compose ps
```

### 3. Acceder a la Aplicación
- Demo: http://localhost/demo
- Manager: http://localhost/manager
  - Usuario: admin
  - Password: SecurePassword123!

---

## 📋 COMANDOS ESENCIALES

### Gestión de Servicios
```powershell
# Iniciar
docker-compose up -d

# Detener
docker-compose stop

# Reiniciar
docker-compose restart

# Detener y eliminar
docker-compose down

# Ver logs
docker-compose logs -f
```

### Desplegar Aplicación WAR
```powershell
# Copiar WAR a webapp/
cp mi-app.war webapp/

# La aplicación estará disponible en:
# http://localhost/mi-app
```

### Acceder a Contenedores
```powershell
# Apache
docker-compose exec apache bash

# Tomcat
docker-compose exec tomcat bash
```

---

## 🔍 TROUBLESHOOTING RÁPIDO

### Problema: Error 503 en /demo
```powershell
# Verificar que Tomcat esté corriendo
docker-compose ps

# Reiniciar Tomcat
docker-compose restart tomcat

# Ver logs
docker-compose logs tomcat
```

### Problema: No puedo acceder a Manager
```powershell
# Reiniciar servicios
docker-compose restart

# Verificar credenciales en tomcat-config/tomcat-users.xml
```

### Problema: Puerto 80 ya en uso
```powershell
# Detener servicios que usen puerto 80 (IIS, XAMPP, etc.)
# O cambiar el puerto en docker-compose.yml:
# ports: - "8000:80"
```

---

## 📊 VERIFICACIÓN

### Healthchecks
```powershell
# Apache
curl http://localhost/

# Tomcat directo
curl http://localhost:8080/

# Tomcat vía proxy
curl http://localhost/demo
```

### Ver Logs en Tiempo Real
```powershell
# Apache
docker-compose logs -f apache

# Tomcat
docker-compose logs -f tomcat
```

---

## 🎯 URLS IMPORTANTES

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| Demo App | http://localhost/demo | - |
| Manager | http://localhost/manager | admin / SecurePassword123! |
| Tomcat Root | http://localhost:8080 | - |

---

## 🔒 SEGURIDAD

### Cambiar Contraseñas
Editar: `tomcat-config/tomcat-users.xml`
```xml
<user username="admin" 
      password="TU_NUEVA_PASSWORD" 
      roles="..."/>
```

Después reiniciar:
```powershell
docker-compose restart tomcat
```

---

## 📦 BACKUP

### Crear Backup
```powershell
$fecha = Get-Date -Format "yyyyMMdd"
Compress-Archive -Path apache-config,tomcat-config,webapp -DestinationPath "backup-$fecha.zip"
```

### Restaurar Backup
```powershell
Expand-Archive -Path backup-20241104.zip -DestinationPath .
docker-compose restart
```

---

## 🧹 LIMPIEZA

### Limpiar Todo
```powershell
# Detener y eliminar contenedores
docker-compose down -v

# Limpiar imágenes
docker system prune -a
```

---

## 📞 SOPORTE

Ver documentación completa: `README.md`

¡Buen despliegue! 🚀
