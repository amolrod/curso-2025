# 📚 Documentación del Proyecto

Esta carpeta contiene la documentación de referencia y los recursos utilizados para el desarrollo de la actividad.

---

## 📄 Documentos PDF de Referencia

### 1. Apache Tomcat
**Archivo:** `1_Apache Tomcat.pdf`

Documento de referencia sobre Apache Tomcat, el servidor de aplicaciones Java utilizado en este proyecto.

### 2. Apache Docker - Servidor Web
**Archivo:** `1_Apache_Docker_ServidorWeb.pdf`

Guía sobre la configuración de Apache HTTP Server en Docker para actuar como servidor web.

### 3. Conectar Apache a Tomcat mediante Proxy
**Archivo:** `2_Conectar el servidor web Apache a Tomcat mediante un proxy.pdf`

Documentación sobre cómo establecer la conexión entre Apache HTTP Server y Apache Tomcat mediante proxy (AJP).

---

## 🎯 Aplicación Web de Ejemplo

### Formulario.war
**Archivo:** `Formulario.war`

Aplicación web Java en formato WAR (Web Application Archive) que contiene un formulario de ejemplo.

**Cómo desplegar:**

#### Método 1: Copiar a la carpeta webapp
```powershell
# Copiar el archivo WAR a la carpeta webapp
Copy-Item documentacion\Formulario.war webapp\

# Reiniciar Tomcat para que lo despliegue
docker-compose restart tomcat
```

#### Método 2: Usar Tomcat Manager
1. Acceder a `http://localhost/manager/html`
2. Usuario: `admin` / Contraseña: `SecurePassword123!`
3. En la sección "WAR file to deploy", seleccionar `Formulario.war`
4. Click en "Deploy"

#### Método 3: Copiar directamente al contenedor
```powershell
docker cp documentacion\Formulario.war tomcat-server:/usr/local/tomcat/webapps/
```

**Acceso después del despliegue:**
- Vía Apache proxy: `http://localhost/Formulario`
- Acceso directo: `http://localhost:8080/Formulario`

---

## 🐳 Dockerfile Alternativo

**Archivo:** `Dockerfile`

Este archivo contiene un Dockerfile alternativo que construye Tomcat desde cero usando Ubuntu 20.04.

**Diferencias con el Dockerfile del proyecto:**

| Aspecto | Dockerfile del Proyecto | Dockerfile Documentación |
|---------|------------------------|--------------------------|
| Imagen base | `tomcat:10.1-jdk17` (oficial) | `ubuntu:20.04` |
| Instalación | Preconfigurada | Manual desde Apache |
| Tamaño | Optimizado | Más grande |
| Uso recomendado | ✅ Producción/Desarrollo | 📚 Aprendizaje |

**Nota:** El proyecto utiliza el Dockerfile oficial (`Dockerfile.tomcat`) porque es más eficiente y sigue las mejores prácticas. Este Dockerfile alternativo es útil para entender el proceso de instalación manual de Tomcat.

---

## 📋 Resumen de Recursos

```
documentacion/
├── 1_Apache Tomcat.pdf                          # Documentación de Tomcat
├── 1_Apache_Docker_ServidorWeb.pdf              # Documentación de Apache en Docker
├── 2_Conectar el servidor web Apache a Tomcat mediante un proxy.pdf  # Proxy Apache-Tomcat
├── Formulario.war                                # Aplicación de ejemplo
└── Dockerfile                                    # Dockerfile alternativo (referencia)
```

---

## 🔗 Referencias Adicionales

Para más información sobre el proyecto, consulta:

- **README.md** - Documentación principal del proyecto
- **GUIA-RAPIDA.md** - Inicio rápido en 5 minutos
- **INSTRUCCIONES-DESPLIEGUE.md** - Paso a paso detallado
- **EVALUACION-PROYECTO.md** - Verificación de requisitos
- **GUION-VIDEO.md** - Script para demostración en vídeo

---

## 💡 Notas Importantes

1. **Formulario.war:** Esta es la aplicación WAR real mencionada en los requisitos de la actividad.

2. **Dockerfile alternativo:** El Dockerfile en esta carpeta es diferente al usado en el proyecto. El proyecto usa imágenes oficiales de Docker Hub que son más eficientes.

3. **Documentos PDF:** Son las referencias teóricas utilizadas para implementar la actividad.

---

**Última actualización:** Noviembre 2025
