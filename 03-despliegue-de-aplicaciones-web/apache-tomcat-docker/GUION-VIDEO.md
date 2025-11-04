# 🎬 GUIÓN PARA VÍDEO DEMOSTRATIVO
## Despliegue de Aplicación Web con Docker: Apache HTTP + Tomcat + AJP

---

## 📋 INFORMACIÓN DEL VÍDEO

**Duración estimada:** 8-10 minutos  
**Formato:** Screencast con narración  
**Objetivo:** Demostrar el despliegue y funcionamiento de una aplicación web Java utilizando Docker, Apache HTTP Server y Apache Tomcat con protocolo AJP

---

## 🎯 ESTRUCTURA DEL VÍDEO

### **FASE 1: INTRODUCCIÓN (1 minuto)**

#### Escena 1.1: Portada y Presentación (15 segundos)
**Visual:**
- Título del proyecto en pantalla
- Logos de Docker, Apache HTTP, Apache Tomcat

**Narración:**
> "Hola, en este vídeo voy a mostrar el despliegue de una aplicación web Java utilizando contenedores Docker. Implementaremos una arquitectura con Apache HTTP Server como proxy inverso y Apache Tomcat como servidor de aplicaciones, comunicándose mediante el protocolo AJP."

#### Escena 1.2: Arquitectura del Sistema (45 segundos)
**Visual:**
- Diagrama de arquitectura mostrando:
  - Cliente → Apache (puerto 80) → AJP (puerto 8009) → Tomcat (puerto 8080)
  - Red Docker interna
  - Volúmenes compartidos

**Narración:**
> "La arquitectura del proyecto consta de dos contenedores Docker:
> 
> 1. Apache HTTP Server actuando como proxy inverso, que recibe las peticiones HTTP del cliente en el puerto 80
> 2. Apache Tomcat como servidor de aplicaciones Java, que procesa las aplicaciones web
> 
> Ambos contenedores se comunican internamente mediante el protocolo AJP en el puerto 8009, lo que proporciona mejor rendimiento que HTTP puro. Todo esto orquestado con Docker Compose en una red aislada."

---

### **FASE 2: REVISIÓN DE LA ESTRUCTURA DEL PROYECTO (2 minutos)**

#### Escena 2.1: Estructura de Directorios (30 segundos)
**Visual:**
- Explorador de archivos mostrando la estructura del proyecto
- Resaltar carpetas principales:
  - `apache-config/`
  - `tomcat-config/`
  - `webapp/`
  - `logs/`

**Narración:**
> "Antes de empezar el despliegue, veamos la estructura del proyecto. Tenemos cuatro carpetas principales:
> 
> - apache-config: con la configuración del VirtualHost y proxy AJP
> - tomcat-config: con server.xml, tomcat-users.xml y context.xml para la autenticación
> - webapp: donde colocamos nuestras aplicaciones, en este caso la app demo
> - logs: para almacenar los registros de ambos servidores"

#### Escena 2.2: Archivo docker-compose.yml (45 segundos)
**Visual:**
- Abrir docker-compose.yml en el editor
- Scroll lento mostrando las secciones principales:
  - Servicios: apache y tomcat
  - Puertos
  - Volúmenes
  - Networks
  - Recursos

**Narración:**
> "El archivo docker-compose.yml define nuestra infraestructura como código. Aquí especificamos:
> 
> - Los dos servicios: apache y tomcat
> - Los puertos expuestos: 80 para Apache y 8080 para acceso directo a Tomcat
> - Los volúmenes que montan las configuraciones y aplicaciones
> - Una red personalizada llamada app-network que conecta ambos contenedores
> - Y límites de recursos para cada servicio"

#### Escena 2.3: Dockerfiles (45 segundos)
**Visual:**
- Mostrar brevemente Dockerfile.apache
- Mostrar brevemente Dockerfile.tomcat
- Destacar partes importantes:
  - Módulos habilitados en Apache
  - Usuarios configurados en Tomcat
  - Conector AJP

**Narración:**
> "Tenemos dos Dockerfiles personalizados:
> 
> El Dockerfile de Apache habilita los módulos mod_proxy y mod_proxy_ajp necesarios para la comunicación AJP.
> 
> El Dockerfile de Tomcat configura el conector AJP en el puerto 8009, define usuarios con diferentes roles de administración, y copia las aplicaciones manager y host-manager para la gestión web."

---

### **FASE 3: PROCESO DE DESPLIEGUE (2.5 minutos)**

#### Escena 3.1: Construcción de Imágenes (1 minuto)
**Visual:**
- Terminal PowerShell
- Comando: `docker-compose build`
- Mostrar el proceso de construcción
- Resaltar las capas que se crean

**Narración:**
> "Ahora vamos a construir las imágenes Docker. Ejecuto el comando docker-compose build.
> 
> [PAUSA mientras se ejecuta]
> 
> Como pueden ver, Docker descarga las imágenes base, ejecuta los comandos de los Dockerfiles, y crea nuestras imágenes personalizadas. Este proceso toma unos segundos porque ya tenemos las capas base en caché."

**Comando ejecutado:**
```bash
docker-compose build
```

#### Escena 3.2: Inicio de Contenedores (1 minuto)
**Visual:**
- Terminal PowerShell
- Comando: `docker-compose up -d`
- Comando: `docker-compose ps`
- Mostrar estado de contenedores

**Narración:**
> "Con las imágenes construidas, ahora levantamos los contenedores en modo background usando docker-compose up -d.
> 
> [PAUSA]
> 
> Verificamos que ambos contenedores están ejecutándose con docker-compose ps. Perfecto, vemos que tanto apache-proxy como tomcat-server están en estado Up."

**Comandos ejecutados:**
```bash
docker-compose up -d
docker-compose ps
```

#### Escena 3.3: Verificación de Logs (30 segundos)
**Visual:**
- Terminal PowerShell
- Comando: `docker-compose logs tomcat | Select-Object -Last 10`
- Comando: `docker-compose logs apache | Select-Object -Last 10`

**Narración:**
> "Podemos revisar los logs para confirmar que todo está funcionando correctamente. Los logs de Tomcat muestran que el servidor ha iniciado correctamente, y los de Apache confirman que está listo para recibir peticiones."

**Comandos ejecutados:**
```bash
docker-compose logs tomcat | Select-Object -Last 10
docker-compose logs apache | Select-Object -Last 10
```

---

### **FASE 4: DEMOSTRACIÓN DE FUNCIONALIDAD (3 minutos)**

#### Escena 4.1: Acceso a la Aplicación Demo (1 minuto)
**Visual:**
- Abrir navegador
- Navegar a http://localhost/demo
- Mostrar la página principal
- Resaltar:
  - Diseño responsive
  - Información del sistema
  - Enlaces a otras páginas

**Narración:**
> "Ahora vamos a probar la aplicación. Accedo a localhost/demo a través del proxy Apache.
> 
> Esta es la página principal de nuestra aplicación demo. Como pueden ver, tiene un diseño moderno con gradientes CSS. Muestra información del servidor, la fecha y hora, y enlaces a las diferentes funcionalidades.
> 
> Nótese que estamos accediendo a través del puerto 80 de Apache, que internamente se comunica con Tomcat mediante AJP."

**URL:** http://localhost/demo

#### Escena 4.2: Página de Información del Sistema (45 segundos)
**Visual:**
- Click en "Ver Info del Sistema"
- Mostrar info.jsp
- Scroll por las diferentes secciones:
  - Información del servidor
  - Detalles de la petición
  - Información del cliente
  - Variables Java
  - Sesión
  - Headers HTTP

**Narración:**
> "En la página de información del sistema podemos ver múltiples detalles técnicos:
> 
> - El servidor Tomcat y su versión
> - La dirección IP local y el puerto
> - El método HTTP utilizado
> - Las propiedades de la JVM
> - Las cabeceras HTTP de la petición
> 
> Todo esto es generado dinámicamente por JSP."

**URL:** http://localhost/demo/info.jsp

#### Escena 4.3: Página de Pruebas Interactivas (45 segundos)
**Visual:**
- Click en "Ir a Pruebas"
- Mostrar test.jsp
- Interactuar con el formulario:
  - Establecer variable de sesión
  - Probar la calculadora
  - Mostrar tiempo de sesión

**Narración:**
> "La página de pruebas incluye funcionalidad interactiva:
> 
> Puedo establecer variables en la sesión HTTP... [escribir y enviar]
> 
> También hay una calculadora simple que procesa operaciones en el servidor... [hacer una suma]
> 
> Y muestra el tiempo que lleva activa la sesión del usuario. Esto demuestra que el manejo de sesiones funciona correctamente a través del proxy AJP."

**URL:** http://localhost/demo/test.jsp

#### Escena 4.4: Tomcat Manager (30 segundos)
**Visual:**
- Click en "Tomcat Manager"
- Introducir credenciales: admin / SecurePassword123!
- Mostrar panel de administración
- Resaltar:
  - Aplicaciones desplegadas
  - Estado de las aplicaciones
  - Opciones de gestión

**Narración:**
> "Ahora accedamos al Tomcat Manager, la consola de administración web. Introduzco las credenciales de admin.
> 
> Aquí podemos ver todas las aplicaciones desplegadas: nuestra app demo, el propio manager, y el host-manager. Desde aquí podríamos desplegar nuevas aplicaciones WAR, reiniciarlas, o detenerlas."

**URL:** http://localhost/manager  
**Credenciales:** admin / SecurePassword123!

---

### **FASE 5: CARACTERÍSTICAS TÉCNICAS AVANZADAS (1.5 minutos)**

#### Escena 5.1: Acceso Directo a Tomcat (30 segundos)
**Visual:**
- Abrir nueva pestaña
- Navegar a http://localhost:8080/demo
- Mostrar que funciona igual

**Narración:**
> "Una característica útil para debugging es que también podemos acceder directamente a Tomcat sin pasar por Apache, usando el puerto 8080. Esto es útil para diagnosticar problemas y verificar que Tomcat funciona independientemente del proxy."

**URL:** http://localhost:8080/demo

#### Escena 5.2: Configuración del Proxy AJP (30 segundos)
**Visual:**
- Abrir apache-config/httpd-vhosts.conf
- Mostrar configuración ProxyPass
- Resaltar ProxyIOBufferSize

**Narración:**
> "Veamos la configuración que hace esto posible. En el archivo httpd-vhosts.conf tenemos las directivas ProxyPass que redirigen las peticiones de Apache a Tomcat usando el protocolo AJP.
> 
> Nótese el ProxyIOBufferSize aumentado a 65 kilobytes, necesario para manejar respuestas grandes del servidor."

**Archivo:** apache-config/httpd-vhosts.conf

#### Escena 5.3: Configuración de Seguridad (30 segundos)
**Visual:**
- Abrir tomcat-config/tomcat-users.xml
- Mostrar los diferentes roles y usuarios

**Narración:**
> "En cuanto a seguridad, hemos configurado cuatro usuarios con diferentes niveles de acceso:
> 
> - Admin: con todos los permisos
> - Manager: para gestión de aplicaciones
> - Deployer: solo para despliegues
> - Monitor: solo lectura para monitorización
> 
> Esto sigue el principio de mínimos privilegios."

**Archivo:** tomcat-config/tomcat-users.xml

---

### **FASE 6: GESTIÓN Y MANTENIMIENTO (1 minuto)**

#### Escena 6.1: Comandos de Gestión (45 segundos)
**Visual:**
- Terminal PowerShell
- Mostrar comandos comunes:

**Narración:**
> "Para gestionar los contenedores, Docker Compose nos proporciona comandos muy útiles:
> 
> - docker-compose ps para ver el estado
> - docker-compose logs -f para ver logs en tiempo real
> - docker-compose restart para reiniciar servicios
> - docker-compose down para detener todo
> - docker-compose up -d para volver a iniciar"

**Comandos mostrados:**
```bash
# Ver estado
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar un servicio
docker-compose restart apache

# Detener todo
docker-compose down

# Iniciar de nuevo
docker-compose up -d
```

#### Escena 6.2: Despliegue de Nuevas Aplicaciones (15 segundos)
**Visual:**
- Mostrar carpeta webapp/
- Mencionar cómo agregar nuevas apps

**Narración:**
> "Para desplegar nuevas aplicaciones, simplemente colocas tus archivos WAR o directorios de aplicación en la carpeta webapp, y Tomcat las detecta automáticamente. El hot deployment está habilitado."

---

### **FASE 7: CIERRE Y CONCLUSIONES (1 minuto)**

#### Escena 7.1: Recapitulación (30 segundos)
**Visual:**
- Volver a mostrar el diagrama de arquitectura
- Resaltar puntos clave

**Narración:**
> "Para recapitular, hemos desplegado exitosamente una aplicación web Java usando Docker. Implementamos:
> 
> - Una arquitectura de dos capas con Apache como proxy y Tomcat como servidor de aplicaciones
> - Comunicación eficiente mediante protocolo AJP
> - Gestión de usuarios y autenticación
> - Aplicaciones de ejemplo completamente funcionales
> - Todo orquestado con Docker Compose"

#### Escena 7.2: Ventajas de esta Arquitectura (20 segundos)
**Visual:**
- Lista en pantalla de ventajas

**Narración:**
> "Las ventajas de esta arquitectura incluyen:
> 
> - Aislamiento y portabilidad gracias a Docker
> - Mejor rendimiento con AJP vs HTTP
> - Separación de responsabilidades entre proxy y aplicación
> - Fácil escalabilidad
> - Configuración como código para reproducibilidad"

**Texto en pantalla:**
- ✅ Portabilidad con Docker
- ✅ Alto rendimiento con AJP
- ✅ Separación de responsabilidades
- ✅ Escalabilidad horizontal
- ✅ Infraestructura como código

#### Escena 7.3: Próximos Pasos (10 segundos)
**Visual:**
- Lista de mejoras potenciales

**Narración:**
> "Como próximos pasos, se podría implementar HTTPS con certificados SSL, configurar balanceo de carga con múltiples instancias de Tomcat, o integrar un sistema de CI/CD para despliegues automatizados."

**Texto en pantalla:**
- 🔐 Implementar HTTPS/SSL
- ⚖️ Balanceo de carga
- 🚀 CI/CD automatizado
- 📊 Monitorización con Prometheus
- 🔄 Backup automatizado

---

## 🎙️ CONSEJOS PARA LA GRABACIÓN

### Audio
- Usa un micrófono de buena calidad
- Graba en un ambiente sin ruido de fondo
- Habla de forma clara y pausada
- Haz pausas entre secciones para facilitar la edición

### Video
- Resolución recomendada: 1920x1080 (Full HD)
- FPS: 30 o 60
- Usa OBS Studio o similar para grabar
- Graba la pantalla completa o solo la ventana activa
- Usa zoom para resaltar detalles importantes

### Edición
- Añade música de fondo suave (opcional)
- Incluye transiciones entre secciones
- Añade textos en pantalla para reforzar conceptos clave
- Incluye timestamps en la descripción del vídeo
- Añade subtítulos si es posible

### Herramientas Recomendadas
- **Grabación:** OBS Studio, Camtasia, ScreenFlow
- **Edición:** DaVinci Resolve, Adobe Premiere, Final Cut Pro
- **Diagramas:** draw.io, Excalidraw, Lucidchart
- **Narración:** Audacity para edición de audio

---

## 📊 TIMESTAMPS PARA LA DESCRIPCIÓN DEL VÍDEO

```
00:00 - Introducción
00:15 - Arquitectura del sistema
01:00 - Estructura del proyecto
01:30 - Docker Compose y configuración
02:15 - Dockerfiles personalizados
03:00 - Construcción de imágenes Docker
04:00 - Inicio de contenedores
04:30 - Verificación de logs
05:00 - Demostración: Aplicación Demo
06:00 - Demostración: Información del sistema
06:45 - Demostración: Pruebas interactivas
07:30 - Demostración: Tomcat Manager
08:00 - Características técnicas avanzadas
08:30 - Configuración de seguridad
09:00 - Comandos de gestión
09:45 - Conclusiones y próximos pasos
```

---

## 📝 CHECKLIST PRE-GRABACIÓN

Antes de comenzar a grabar, verifica:

- [ ] Docker Desktop está ejecutándose
- [ ] Los contenedores están detenidos (para mostrar el proceso completo)
- [ ] Limpia el terminal de comandos anteriores
- [ ] Cierra pestañas innecesarias del navegador
- [ ] Desactiva notificaciones del sistema
- [ ] Prepara los archivos que vas a mostrar
- [ ] Prueba el micrófono y la calidad de audio
- [ ] Ajusta la resolución de pantalla
- [ ] Aumenta el tamaño de fuente del terminal y editor
- [ ] Prepara un vaso de agua para la grabación

---

## 🎬 TEXTO PARA LA DESCRIPCIÓN DEL VÍDEO

```
🐳 Despliegue de Aplicación Web con Docker: Apache + Tomcat + AJP

En este vídeo te muestro cómo desplegar una aplicación web Java completa usando Docker, Apache HTTP Server y Apache Tomcat, comunicándose mediante el protocolo AJP.

📋 Contenido del vídeo:
✅ Arquitectura de proxy inverso con Apache y Tomcat
✅ Configuración de protocolo AJP para alto rendimiento
✅ Dockerfiles personalizados y Docker Compose
✅ Autenticación y autorización con roles de Tomcat
✅ Demostración completa de la aplicación
✅ Gestión de contenedores y despliegues

🔧 Tecnologías utilizadas:
- Docker & Docker Compose
- Apache HTTP Server 2.4
- Apache Tomcat 10.1
- Java JDK 17
- Protocolo AJP
- JSP (Java Server Pages)

📂 Repositorio del proyecto:
[AÑADIR ENLACE A TU REPOSITORIO]

⏱️ Timestamps:
00:00 - Introducción
01:00 - Estructura del proyecto
03:00 - Construcción y despliegue
05:00 - Demostración de funcionalidades
08:00 - Características avanzadas
09:45 - Conclusiones

🔗 Enlaces útiles:
- Documentación Docker: https://docs.docker.com/
- Apache HTTP Server: https://httpd.apache.org/
- Apache Tomcat: https://tomcat.apache.org/
- Protocolo AJP: https://tomcat.apache.org/connectors-doc/

#Docker #ApacheTomcat #ApacheHTTPServer #DevOps #Java #WebDevelopment #Containers #AJP
```

---

## 💡 NOTAS ADICIONALES

### Variaciones del Guión

**Versión Corta (5 minutos):**
Si necesitas una versión más breve, puedes:
- Reducir la explicación de la arquitectura
- Mostrar menos páginas de la aplicación demo
- Omitir la sección de características avanzadas

**Versión Extendida (15 minutos):**
Para una versión más detallada, añade:
- Explicación línea por línea de los Dockerfiles
- Demostración de troubleshooting de errores comunes
- Explicación más profunda del protocolo AJP
- Monitorización de recursos con docker stats
- Ejemplo de despliegue de una segunda aplicación

### Personalización

Puedes personalizar el guión según tu audiencia:

- **Para principiantes:** Añade más explicaciones básicas sobre Docker y contenedores
- **Para avanzados:** Profundiza en optimizaciones de rendimiento y configuraciones de producción
- **Para entornos académicos:** Añade más teoría sobre arquitecturas de software y patrones de diseño

---

## 🎯 OBJETIVOS DE APRENDIZAJE

Al finalizar el vídeo, el espectador debe ser capaz de:

1. ✅ Comprender la arquitectura de proxy inverso con Apache y Tomcat
2. ✅ Configurar Docker Compose para múltiples servicios
3. ✅ Implementar comunicación AJP entre Apache y Tomcat
4. ✅ Gestionar usuarios y roles en Tomcat
5. ✅ Desplegar aplicaciones Java/JSP
6. ✅ Utilizar comandos básicos de Docker Compose
7. ✅ Resolver problemas comunes de configuración

---

**¡Buena suerte con tu grabación! 🎥**
