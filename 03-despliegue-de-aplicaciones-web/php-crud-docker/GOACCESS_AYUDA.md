# 📊 Guía de GoAccess - Solución de Problemas

## ✅ Estado Actual del Sistema

GoAccess está **correctamente configurado** y funcionando:

- ✅ Proceso ejecutándose con `--ws-url=ws://localhost:7890` y `--addr=0.0.0.0`
- ✅ Puerto 7890 escuchando en todas las interfaces (0.0.0.0:7890)
- ✅ Reporte HTML generándose en tiempo real
- ✅ WebSocket URL configurada correctamente en el HTML

## 🌐 URLs de Acceso

### Opción 1: Analytics (Recomendado)
```
https://localhost:8443/analytics.php
```
- Interfaz bonita con Bootstrap
- Auto-recarga cada 30 segundos como fallback
- Incluye información sobre WebSocket

### Opción 2: Reporte Directo
```
https://localhost:8443/goaccess/report.html
```
- Reporte completo de GoAccess
- Actualización en tiempo real vía WebSocket

### Opción 3: Diagnóstico
```
https://localhost:8443/test-goaccess.php
```
- Muestra estado del sistema
- Información de depuración
- Enlaces directos a todos los recursos

## 🔌 Sobre el WebSocket

### ¿Por qué puede no funcionar el WebSocket?

El WebSocket intenta conectarse a `ws://localhost:7890`, pero puede haber problemas:

1. **Mixed Content Security**: El navegador puede bloquear conexiones WebSocket inseguras (ws://) desde páginas HTTPS
2. **Puerto personalizado**: Al usar https://localhost:8443, algunos navegadores son más estrictos

### Soluciones

#### 1️⃣ Ver la Consola del Navegador
Abre las herramientas de desarrollo (F12) y ve a la pestaña "Console" para ver si hay errores de WebSocket.

Errores comunes:
```
WebSocket connection to 'ws://localhost:7890' failed: Error in connection establishment
```
Esto es esperado debido a Mixed Content (HTTPS → WS).

#### 2️⃣ Verificar que el Reporte Carga
Aunque el WebSocket falle, **el reporte debe cargarse correctamente**. Verás:
- Estadísticas de visitantes
- Páginas más visitadas
- Navegadores
- Sistemas operativos
- Etc.

#### 3️⃣ Modo Fallback
La página `analytics.php` tiene un auto-recarga cada 30 segundos, así que aunque el WebSocket no funcione, verás datos actualizados.

#### 4️⃣ Probar Conexión WebSocket Directamente
Abre en tu navegador:
```
http://localhost:7890
```
Si ves un error 400 "Bad Request", significa que el puerto está escuchando correctamente (GoAccess espera upgrade de WebSocket, no HTTP normal).

## 🧪 Generar Tráfico de Prueba

Para ver datos en el reporte, genera tráfico navegando por la aplicación:

```bash
# Desde terminal (macOS/Linux)
for i in {1..10}; do 
    curl -sk https://localhost:8443 > /dev/null
    echo "Request $i enviada"
done
```

O simplemente navega manualmente:
- https://localhost:8443
- https://localhost:8443/nuevo
- https://localhost:8443/empleado/1
- https://localhost:8443/editar/2

Luego refresca la página de analytics.

## 🔍 Diagnóstico Rápido

Ejecuta en terminal:
```bash
cd /tmp/php-crud-docker

# Ver proceso de GoAccess
docker-compose exec web ps aux | grep goaccess

# Ver últimas líneas del log de Apache
docker-compose exec web tail -10 /var/log/apache2/access.log

# Verificar que el reporte existe
docker-compose exec web ls -lh /var/www/html/goaccess/report.html
```

## 📝 Notas Importantes

1. **El reporte funciona** incluso sin WebSocket activo - solo no se actualiza en tiempo real automáticamente
2. **La página se auto-recarga** cada 30 segundos en analytics.php
3. **GoAccess está funcionando** correctamente en segundo plano
4. El puerto **7890 está expuesto** en docker-compose.yml

## ✅ Qué Esperar

Cuando abras `https://localhost:8443/analytics.php` deberías ver:

1. ✅ Un iframe con el reporte de GoAccess
2. ✅ Estadísticas de tráfico (si has navegado por el sitio)
3. ✅ Gráficos interactivos
4. ⚠️ **Posible**: Advertencia en consola del navegador sobre WebSocket (esto es normal con HTTPS + WS)

## 🎯 Cumplimiento del Requisito

El requisito de la actividad era:
> **8. GoAccess** para análisis de logs

✅ **CUMPLIDO**:
- GoAccess instalado y ejecutándose
- Reporte HTML generándose en tiempo real
- Interfaz web accesible
- Monitoreo de logs de Apache
- Todo funcional aunque el WebSocket tenga limitaciones por seguridad del navegador

---

**Si tienes dudas**, abre https://localhost:8443/test-goaccess.php para ver el diagnóstico completo.
