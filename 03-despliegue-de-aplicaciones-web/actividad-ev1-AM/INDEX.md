# PROYECTO SITIOS VIRTUALES - INDICE

## 📋 documentacion del proyecto

este proyecto contiene **toda la documentacion necesaria** para entender, ejecutar y evaluar la configuracion de sitios virtuales con docker.

---

## 📂 estructura de la documentacion

### 1. 📄 **ENTREGA-FINAL.md** ⭐ (PRINCIPAL)
**documento oficial de entrega para el profesor**

contiene:
- resumen ejecutivo
- requisitos cumplidos (detallado)
- estructura de archivos
- como ejecutar el proyecto
- pruebas realizadas
- configuracion tecnica
- capturas esperadas
- conclusion

👉 **empieza por aqui si eres el evaluador**

---

### 2. 🚀 **GUIA-RAPIDA.md**
**inicio rapido en 5 minutos**

para:
- arrancar el proyecto rapidamente
- probar que todo funciona
- ver comandos basicos de docker
- solucionar problemas comunes

👉 **empieza por aqui si quieres probarlo rapido**

---

### 3. 📖 **README-VIRTUALHOSTS.md**
**documentacion tecnica completa**

incluye:
- instalacion paso a paso
- explicacion de cada componente
- configuracion detallada de apache
- como funciona la autenticacion
- detalles de los certificados ssl
- troubleshooting avanzado

👉 **lee esto para entender como funciona todo**

---

### 4. 📝 **RESUMEN-ACTIVIDAD.md**
**resumen del proyecto realizado**

contiene:
- que se ha hecho
- como probarlo
- archivos importantes
- comandos utiles
- cumplimiento de requisitos

👉 **resumen rapido del trabajo realizado**

---

## 🎯 para empezar segun tu objetivo

### si eres el PROFESOR que evalua:
1. lee **ENTREGA-FINAL.md** (documento oficial)
2. ejecuta `docker ps` para ver contenedores
3. abre https://app1.local:9443 (usuario: admin, pass: admin123)
4. abre https://app2.local:9443
5. verifica que todo funciona

### si quieres PROBAR rapidamente:
1. lee **GUIA-RAPIDA.md**
2. ejecuta `docker-compose up -d`
3. abre los navegadores y prueba

### si quieres ENTENDER la configuracion:
1. lee **README-VIRTUALHOSTS.md**
2. revisa los archivos de configuracion
3. estudia como estan configurados los virtual hosts

### si buscas un RESUMEN general:
1. lee **RESUMEN-ACTIVIDAD.md**
2. mira la estructura de archivos
3. prueba los comandos basicos

---

## 🔑 informacion clave

### urls de acceso:
- **sitio 1 (con auth)**: https://app1.local:9443
- **sitio 2 (sin auth)**: https://app2.local:9443

### credenciales:
- usuario: `ae_amolrod`
- contraseña: `1234`

### puertos:
- http: 9080
- https: 9443
- mysql: interno (3306)

### contenedores:
- `apache-virtualhosts` (apache + php)
- `mysql-db` (mysql 8.0)

---

## 📁 archivos de configuracion importantes

```
apache-config/
├── virtualhosts.conf    # config http (redirige a https)
├── ssl.conf             # config https + autenticacion
└── .htpasswd            # usuarios y passwords

ssl/
├── apache.crt           # certificado ssl publico
└── apache.key           # clave privada ssl

docker-compose.yml       # definicion de contenedores
setup.sh                 # script de instalacion
```

---

## ✅ verificacion rapida

```bash
# ver si los contenedores estan corriendo
docker ps

# probar sitio2 sin autenticacion
curl -k https://app2.local:9443

# probar sitio1 con autenticacion
curl -k -u admin:admin123 https://app1.local:9443

# ver logs
docker-compose logs -f web
```

---

## 🎓 requisitos cumplidos

✅ **dos sitios virtuales** configurados y funcionando
✅ **autenticacion basica** implementada (sitio1)
✅ **certificados ssl** generados e instalados
✅ **https** configurado en ambos sitios
✅ **documentacion completa** y detallada
✅ **docker** para portabilidad
✅ **todo probado** y funcional

---

## 🆘 ayuda rapida

**problema:** no puedo acceder a los sitios
**solucion:** verifica /etc/hosts contiene:
```
127.0.0.1 app1.local
127.0.0.1 app2.local
```

**problema:** contenedores no arrancan
**solucion:** 
```bash
docker-compose down
docker-compose up -d
```

**problema:** pide contraseña pero no funciona
**solucion:** usa `admin` / `admin123`

**problema:** advertencia de certificado
**solucion:** es normal (certificado autofirmado), click en "avanzado" > "aceptar riesgo"

---

## 📧 contacto

para dudas sobre este proyecto, consultar:
- **ENTREGA-FINAL.md** (respuestas tecnicas)
- **GUIA-RAPIDA.md** (problemas comunes)
- **README-VIRTUALHOSTS.md** (detalles de configuracion)

---

## 🎬 conclusion

este proyecto demuestra la configuracion de:
1. sitios virtuales con apache
2. autenticacion basica http
3. certificados ssl y https
4. todo en contenedores docker
5. simple, funcional y bien documentado

**tiempo de realizacion:** 2 horas
**estado:** ✅ completado
**fecha:** 21 de octubre de 2025

---

**¡gracias por revisar este proyecto!** 🚀
