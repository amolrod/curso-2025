#!/bin/bash

# Script de inicio para arrancar Apache y Tomcat en el mismo contenedor
echo "=================================================="
echo "Iniciando Servidor Unificado Apache + Tomcat"
echo "=================================================="

# Iniciar Apache2
echo "[1/3] Iniciando Apache Web Server..."
service apache2 start
if [ $? -eq 0 ]; then
    echo "✓ Apache iniciado correctamente en puerto 80"
else
    echo "✗ Error al iniciar Apache"
    exit 1
fi

# Dar tiempo a Apache para inicializar
sleep 2

# Iniciar Tomcat
echo "[2/3] Iniciando Apache Tomcat..."
$CATALINA_HOME/bin/catalina.sh start
if [ $? -eq 0 ]; then
    echo "✓ Tomcat iniciado correctamente"
    echo "  - Puerto 8080 (acceso directo)"
    echo "  - Puerto 8082 (proxy Apache)"
else
    echo "✗ Error al iniciar Tomcat"
    exit 1
fi

# Dar tiempo a Tomcat para desplegar aplicaciones
echo "[3/3] Esperando despliegue de aplicaciones..."
sleep 10

echo ""
echo "=================================================="
echo "Servidor listo!"
echo "=================================================="
echo ""
echo "URLs de acceso:"
echo ""
echo "Apache (prueba):"
echo "  http://localhost:8080/prueba.html"
echo ""
echo "Tomcat (acceso directo):"
echo "  http://localhost:8081/sample/hello.jsp"
echo "  http://localhost:8081/Formulario"
echo "  http://localhost:8081/manager"
echo ""
echo "Tomcat vía Proxy Apache:"
echo "  http://localhost:8080/tomcat-demo-proxy/hello.jsp"
echo "  http://localhost:8080/Formulario"
echo "  http://localhost:8080/manager"
echo ""
echo "=================================================="

# Mantener el contenedor en ejecución mostrando logs
tail -f $CATALINA_HOME/logs/catalina.out
