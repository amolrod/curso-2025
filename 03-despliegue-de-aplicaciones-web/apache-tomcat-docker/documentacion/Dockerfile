FROM ubuntu:20.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    default-jdk \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Download and extract Tomcat
RUN wget https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.48/bin/apache-tomcat-10.1.48.tar.gz \
    && tar -xzvf apache-tomcat-10.1.48.tar.gz \
    && rm apache-tomcat-10.1.48.tar.gz \
    && mv apache-tomcat-10.1.48 /opt/tomcat


RUN mkdir /opt/tomcat/myapps
RUN sed -i '/<\/Host>/a\\n<Host name="127.0.0.1" appBase="/opt/tomcat/myapps" unpackWARs="true" autoDeploy="true"><\/Host>' /opt/tomcat/conf/server.xml


# Expose Tomcat port
EXPOSE 8080

# Set environment variables
ENV CATALINA_HOME=/opt/tomcat


# Start Tomcat
CMD ["/opt/tomcat/bin/catalina.sh", "run"]