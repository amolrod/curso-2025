#!/bin/bash

# script de configuracion inicial para sitios virtuales con docker

echo "=== configuracion de sitios virtuales con https y autenticacion ==="
echo ""

# crear estructura de directorios
echo "1. creando estructura de directorios..."
mkdir -p apache-config
mkdir -p ssl
mkdir -p sitio1
mkdir -p sitio2

# copiar archivos php al sitio1
echo "2. copiando archivos php al sitio1..."
cp *.php sitio1/ 2>/dev/null
cp *.htm sitio1/ 2>/dev/null

# crear pagina simple para sitio2
echo "3. creando contenido para sitio2..."
cat > sitio2/index.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitio 2 - Informacion</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <div class="jumbotron">
            <h1 class="display-4">Bienvenido al Sitio 2</h1>
            <p class="lead">Este es un sitio virtual de ejemplo sin autenticacion.</p>
            <hr class="my-4">
            <p>Caracteristicas de esta configuracion:</p>
            <ul>
                <li>Servidor Apache con PHP 8.1</li>
                <li>Conexion HTTPS con certificado autofirmado</li>
                <li>Acceso libre (sin autenticacion basica)</li>
                <li>Contenedor Docker</li>
            </ul>
            <a class="btn btn-primary btn-lg" href="info.php" role="button">Ver informacion PHP</a>
        </div>
    </div>
</body>
</html>
EOF

cat > sitio2/info.php << 'EOF'
<?php
// pagina de informacion del servidor
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informacion del Servidor</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Informacion del Servidor PHP</h2>
        <div class="alert alert-info">
            <strong>Version PHP:</strong> <?php echo phpversion(); ?><br>
            <strong>Servidor:</strong> <?php echo $_SERVER['SERVER_SOFTWARE']; ?><br>
            <strong>Nombre del Host:</strong> <?php echo $_SERVER['SERVER_NAME']; ?><br>
            <strong>Protocolo:</strong> <?php echo $_SERVER['SERVER_PROTOCOL']; ?><br>
        </div>
        <a href="index.html" class="btn btn-secondary">Volver</a>
    </div>
</body>
</html>
EOF

# generar certificado ssl autofirmado
echo "4. generando certificado ssl autofirmado..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/apache.key \
    -out ssl/apache.crt \
    -subj "/C=ES/ST=Madrid/L=Madrid/O=Empresa_amolrod/OU=Desarrollo/CN=localhost/emailAddress=amolrod@somewhere.com" \
    2>/dev/null

# crear archivo de passwords para autenticacion basica
echo "5. creando archivo de autenticacion (usuario: ae_amolrod, password: 1234)..."
# usamos htpasswd con formato bcrypt
# password: 1234
echo 'ae_amolrod:$2y$05$5lGfaT8uTfzmuzt7xvOGiuOdIdtrxkJpxVkBCaT9Zeq5dxV1NDqlC' > apache-config/.htpasswd

echo ""
echo "=== configuracion completada ==="
echo ""
echo "para iniciar los contenedores ejecuta:"
echo "  docker-compose up -d"
echo ""
echo "para probar los sitios, agrega estas lineas a /etc/hosts:"
echo "  127.0.0.1 app1.local"
echo "  127.0.0.1 app2.local"
echo ""
echo "luego accede a:"
echo "  https://app1.local (requiere usuario: admin, password: admin123)"
echo "  https://app2.local (acceso libre)"
echo ""
echo "nota: tu navegador mostrara una advertencia de seguridad porque"
echo "el certificado es autofirmado. esto es normal en desarrollo."
echo ""
