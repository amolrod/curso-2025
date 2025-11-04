<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sample Application - Hello JSP</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 {
            color: #667eea;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .info-box h2 {
            color: #333;
            margin-top: 0;
            font-size: 1.3em;
        }
        .info-item {
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .info-item:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #495057;
            display: inline-block;
            width: 180px;
        }
        .value {
            color: #667eea;
            font-family: 'Courier New', monospace;
        }
        .success {
            background-color: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-size: 1.3em;
            font-weight: bold;
            margin: 20px 0;
            border: 2px solid #c3e6cb;
        }
        .timestamp {
            text-align: center;
            color: #6c757d;
            font-style: italic;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
        }
        a {
            color: #667eea;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Hello from Tomcat Sample Application! 🎉</h1>
        
        <div class="success">
            ✓ JSP ejecutándose correctamente en Apache Tomcat
        </div>

        <div class="info-box">
            <h2>📋 Información de la Solicitud</h2>
            <div class="info-item">
                <span class="label">Método HTTP:</span>
                <span class="value"><%= request.getMethod() %></span>
            </div>
            <div class="info-item">
                <span class="label">URI de la Solicitud:</span>
                <span class="value"><%= request.getRequestURI() %></span>
            </div>
            <div class="info-item">
                <span class="label">Protocolo:</span>
                <span class="value"><%= request.getProtocol() %></span>
            </div>
            <div class="info-item">
                <span class="label">Dirección IP Cliente:</span>
                <span class="value"><%= request.getRemoteAddr() %></span>
            </div>
            <div class="info-item">
                <span class="label">Puerto Cliente:</span>
                <span class="value"><%= request.getRemotePort() %></span>
            </div>
        </div>

        <div class="info-box">
            <h2>🖥️ Información del Servidor</h2>
            <div class="info-item">
                <span class="label">Nombre del Servidor:</span>
                <span class="value"><%= request.getServerName() %></span>
            </div>
            <div class="info-item">
                <span class="label">Puerto del Servidor:</span>
                <span class="value"><%= request.getServerPort() %></span>
            </div>
            <div class="info-item">
                <span class="label">Información del Servlet:</span>
                <span class="value"><%= application.getServerInfo() %></span>
            </div>
            <div class="info-item">
                <span class="label">Context Path:</span>
                <span class="value"><%= request.getContextPath() %></span>
            </div>
        </div>

        <div class="info-box">
            <h2>☕ Información de Java</h2>
            <div class="info-item">
                <span class="label">Versión de Java:</span>
                <span class="value"><%= System.getProperty("java.version") %></span>
            </div>
            <div class="info-item">
                <span class="label">Vendor de Java:</span>
                <span class="value"><%= System.getProperty("java.vendor") %></span>
            </div>
            <div class="info-item">
                <span class="label">Sistema Operativo:</span>
                <span class="value"><%= System.getProperty("os.name") %> <%= System.getProperty("os.version") %></span>
            </div>
        </div>

        <div class="info-box">
            <h2>🔗 URLs de Acceso</h2>
            <div class="info-item">
                <strong>Acceso directo a Tomcat:</strong><br>
                <a href="http://localhost:8081/sample/hello.jsp" target="_blank">
                    http://localhost:8081/sample/hello.jsp
                </a>
            </div>
            <div class="info-item">
                <strong>Vía Proxy Apache (puerto 8082):</strong><br>
                <a href="http://localhost:8082/sample/hello.jsp" target="_blank">
                    http://localhost:8082/sample/hello.jsp
                </a>
            </div>
            <div class="info-item">
                <strong>Vía Proxy Apache (ruta /tomcat-demo-proxy):</strong><br>
                <a href="http://localhost:8080/tomcat-demo-proxy/hello.jsp" target="_blank">
                    http://localhost:8080/tomcat-demo-proxy/hello.jsp
                </a>
            </div>
        </div>

        <div class="timestamp">
            <p>Página generada: <%= new java.util.Date() %></p>
            <p>Session ID: <%= session.getId() %></p>
        </div>
    </div>
</body>
</html>
