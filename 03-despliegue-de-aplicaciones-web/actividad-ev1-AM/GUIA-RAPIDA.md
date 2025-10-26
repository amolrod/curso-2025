# guia rapida - sitios virtuales con https

## inicio rapido (ya esta todo configurado!)

los contenedores ya estan corriendo. solo necesitas:

### 1. abrir el navegador y probar los sitios

**sitio 1 (con autenticacion):**
```
https://app1.local:9443
```
- usuario: `ae_amolrod`
- contraseña: `1234`

**sitio 2 (sin autenticacion):**
```
https://app2.local:9443
```
- acceso directo

### 2. aceptar el certificado autofirmado

cuando el navegador muestre "no es seguro":
- **chrome/edge**: click en "avanzado" → "acceder al sitio"
- **firefox**: click en "avanzado" → "aceptar el riesgo"
- **safari**: "mostrar detalles" → "visitar este sitio web"

### 3. primera vez en sitio1
para usar el login/registro de la aplicacion php:
1. accede a: https://app1.local:9443/configuracion.php
2. esto crea la base de datos automaticamente
3. luego ve a https://app1.local:9443/login.php

## estructura del proyecto

```
actividad-ev1-AM/
├── docker-compose.yml          # configuracion docker
├── setup.sh                    # script de instalacion
├── RESUMEN-ACTIVIDAD.md        # resumen completo
├── README-VIRTUALHOSTS.md      # documentacion detallada
│
├── apache-config/              # configuracion de apache
│   ├── virtualhosts.conf       # sitios http (redirige a https)
│   ├── ssl.conf                # sitios https
│   └── .htpasswd               # usuarios autenticacion (admin:admin123)
│
├── ssl/                        # certificados https
│   ├── apache.crt              # certificado autofirmado
│   └── apache.key              # clave privada
│
├── sitio1/                     # app php con autenticacion apache
│   ├── login.php
│   ├── registro.php
│   └── ...
│
└── sitio2/                     # sitio simple sin autenticacion
    ├── index.html
    └── info.php
```

## comandos docker

```bash
# ver estado de contenedores
docker ps

# ver logs de apache
docker-compose logs -f web

# ver logs de mysql
docker-compose logs -f mysql

# reiniciar todo
docker-compose restart

# parar contenedores
docker-compose down

# iniciar contenedores
docker-compose up -d
```

## requisitos cumplidos

✅ **dos sitios virtuales funcionando**
- app1.local y app2.local configurados en apache
- accesibles via https en puerto 9443

✅ **autenticacion basica de apache**
- sitio1 requiere usuario/contraseña antes de acceder
- configurado con .htpasswd
- credenciales: admin / admin123

✅ **certificado ssl (https)**
- certificado autofirmado generado con openssl
- valido por 365 dias
- configurado en ambos sitios
- trafico http redirige automaticamente a https

## demostracion

### paso 1: ver que los contenedores funcionan
```bash
docker ps
```
resultado esperado: 2 contenedores corriendo (apache-virtualhosts y mysql-db)

### paso 2: probar sitio1 con autenticacion
1. abrir: https://app1.local:9443
2. aparece ventana de autenticacion
3. introducir: admin / admin123
4. acceso concedido a la aplicacion php

### paso 3: probar sitio2 sin autenticacion
1. abrir: https://app2.local:9443
2. acceso directo sin pedir credenciales
3. muestra pagina informativa

### paso 4: verificar https
en ambos sitios:
- el navegador muestra candado (puede estar tachado por ser autofirmado)
- la url empieza con https://
- el trafico esta cifrado

## notas

- **puertos**: se usan 9080 (http) y 9443 (https) porque los estandar (80/443) estaban ocupados
- **certificado**: es autofirmado, por eso el navegador muestra advertencia (normal en desarrollo)
- **produccion**: en entorno real se usaria certificado de let's encrypt
- **simple**: todo hecho para cumplir requisitos en 2 horas de clase
- **comentarios**: todos en minuscula y sin tildes como pedido

## problema comun

**"no se puede acceder al sitio"**

solucion: verificar que las entradas estan en /etc/hosts:
```bash
cat /etc/hosts | grep app
```

deberia mostrar:
```
127.0.0.1 app1.local
127.0.0.1 app2.local
```

si no estan, el script setup.sh ya las agrego. prueba reiniciar el navegador.
