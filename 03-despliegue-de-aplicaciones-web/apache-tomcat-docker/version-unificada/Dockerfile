# Dockerfile siguiendo las instrucciones del documento
# Un solo contenedor con Apache + Tomcat en Ubuntu 20.04

FROM ubuntu:20.04

# Evitar prompts interactivos durante instalación
ENV DEBIAN_FRONTEND=noninteractive

# Variables de entorno para Tomcat
ENV CATALINA_HOME=/opt/tomcat
ENV PATH=$CATALINA_HOME/bin:$PATH
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# Paso 1: Actualizar repositorios e instalar herramientas básicas
RUN apt-get update && apt-get install -y \
    curl \
    nano \
    wget \
    && apt-get clean

# Paso 2: Instalar Apache2 y PHP
RUN apt-get update && apt-get install -y \
    apache2 \
    libapache2-mod-php \
    php \
    php-cli \
    php-common \
    && apt-get clean

# Paso 3: Instalar Java (requerido para Tomcat)
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk \
    && apt-get clean

# Paso 4: Descargar e instalar Apache Tomcat 10.1
RUN mkdir -p /opt/tomcat && \
    cd /tmp && \
    wget https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.48/bin/apache-tomcat-10.1.48.tar.gz && \
    tar xzf apache-tomcat-10.1.48.tar.gz && \
    mv apache-tomcat-10.1.48/* /opt/tomcat/ && \
    rm -rf /tmp/apache-tomcat-10.1.48.tar.gz

# Paso 5: Configurar permisos
RUN chmod +x /opt/tomcat/bin/*.sh

# Paso 6: Copiar configuraciones personalizadas
COPY ./config/server.xml /opt/tomcat/conf/server.xml
COPY ./config/tomcat-users.xml /opt/tomcat/conf/tomcat-users.xml
COPY ./config/apache2.conf /etc/apache2/apache2.conf

# Paso 7: Modificar context.xml para permitir acceso remoto a Manager/Host-Manager/Examples
# Tomcat 10 usa RemoteCIDRValve en lugar de RemoteAddrValve
RUN sed -i '/<Valve className="org.apache.catalina.valves.RemoteCIDRValve"/,/\/>/d' \
    /opt/tomcat/webapps/manager/META-INF/context.xml && \
    sed -i '/<Valve className="org.apache.catalina.valves.RemoteCIDRValve"/,/\/>/d' \
    /opt/tomcat/webapps/host-manager/META-INF/context.xml && \
    sed -i '/<Valve className="org.apache.catalina.valves.RemoteCIDRValve"/,/\/>/d' \
    /opt/tomcat/webapps/examples/META-INF/context.xml

# Paso 8: Habilitar módulos proxy en Apache
RUN a2enmod proxy && \
    a2enmod proxy_http && \
    a2enmod headers

# Paso 9: Crear directorio para aplicaciones personalizadas
RUN mkdir -p /opt/tomcat/myapps

# Paso 10: Copiar aplicación de ejemplo (sample)
COPY ./webapp/sample /opt/tomcat/webapps/sample

# Paso 11: Copiar Formulario.war
COPY ./webapp/Formulario.war /opt/tomcat/webapps/

# Paso 12: Crear páginas de prueba en Apache
COPY ./webapp/prueba.html /var/www/html/
COPY ./webapp/prueba.php /var/www/html/

# Paso 13: Exponer puertos
# 80 - Apache Web Server
# 8080 - Tomcat directo
# 8082 - Puerto proxy Apache-Tomcat
EXPOSE 80 8080 8082

# Paso 14: Script de inicio para arrancar ambos servicios
COPY ./scripts/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
