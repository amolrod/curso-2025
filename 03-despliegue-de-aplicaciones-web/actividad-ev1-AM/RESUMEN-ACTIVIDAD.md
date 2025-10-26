# resumen de la actividad - sitios virtuales con docker

## que se ha realizado

### 1. sitios virtuales (virtual hosts)
se han configurado **2 sitios virtuales** en apache:

- **app1.local**: aplicacion php con login/registro (con autenticacion apache)
- **app2.local**: sitio informativo simple (sin autenticacion)

ambos sitios funcionan correctamente y son accesibles via https

### 2. autenticacion y control de acceso
se ha configurado **autenticacion basica de apache** en el sitio1 (app1.local):

- tipo: http basic authentication
- archivo: `.htpasswd` con password hasheado
- credenciales:
  - usuario: `ae_amolrod`
  - contraseña: `1234`

cuando accedes a https://app1.local:9443 el navegador pide usuario y contraseña

### 3. certificados digitales (https)
se ha generado un **certificado ssl autofirmado** con openssl:

- valido por 365 dias
- protocolo: rsa 2048 bits
- configurado en ambos sitios virtuales
- todo el trafico http redirige automaticamente a https

## como probarlo

### paso 1: verificar que los contenedores estan corriendo
```bash
docker ps
```

deberias ver dos contenedores:
- `apache-virtualhosts` (puertos 9080 y 9443)
- `mysql-db` (puerto interno)

### paso 2: acceder a los sitios

1. **sitio 1 con autenticacion**:
   - abrir navegador: https://app1.local:9443
   - aparecera ventana pidiendo usuario/contraseña
   - introducir: admin / admin123
   - veras la aplicacion php con login

2. **sitio 2 sin autenticacion**:
   - abrir navegador: https://app2.local:9443
   - acceso directo sin pedir credenciales
   - veras pagina informativa

### paso 3: aceptar el certificado autofirmado
el navegador mostrara advertencia de seguridad:
- chrome/edge: "avanzado" > "acceder a sitio (no seguro)"
- firefox: "avanzado" > "aceptar el riesgo"
- safari: "mostrar detalles" > "visitar este sitio web"

esto es normal con certificados autofirmados

## archivos importantes

```
actividad-ev1-AM/
├── docker-compose.yml          # configuracion de contenedores
├── apache-config/
│   ├── virtualhosts.conf       # redireccion http a https
│   ├── ssl.conf                # configuracion https de sitios
│   └── .htpasswd               # usuarios para autenticacion
├── ssl/
│   ├── apache.crt              # certificado ssl
│   └── apache.key              # clave privada ssl
├── sitio1/                     # aplicacion php (con auth)
└── sitio2/                     # sitio informativo (sin auth)
```

## comandos utiles

```bash
# iniciar contenedores
docker-compose up -d

# parar contenedores
docker-compose down

# ver logs
docker-compose logs -f

# reiniciar apache
docker-compose restart web

# entrar al contenedor
docker exec -it apache-virtualhosts bash
```

## configuracion tecnica resumida

### virtual hosts
- configurados en `/etc/apache2/sites-available/`
- usan directivas `<VirtualHost *:80>` y `<VirtualHost *:443>`
- cada sitio tiene su propio `ServerName` y `DocumentRoot`

### autenticacion basica
- directiva `AuthType Basic` en configuracion apache
- archivo `.htpasswd` con contraseñas hasheadas (bcrypt)
- directivas `Require valid-user` para proteger directorio

### https/ssl
- modulo `ssl` habilitado en apache
- directivas `SSLEngine on`, `SSLCertificateFile`, `SSLCertificateKeyFile`
- certificado generado con: `openssl req -x509 -nodes -days 365 -newkey rsa:2048`

## cumplimiento de requisitos

✅ **dos sitios virtuales configurados y funcionando**
- app1.local (con autenticacion)
- app2.local (sin autenticacion)

✅ **autenticacion basica implementada**
- archivo .htpasswd
- proteccion del sitio1
- credenciales documentadas

✅ **certificado digital instalado**
- certificado autofirmado generado
- https configurado en ambos sitios
- comunicaciones cifradas

✅ **todo funcional con docker**
- facil de desplegar
- portable
- documentado
