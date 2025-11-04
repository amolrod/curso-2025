<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información del Sistema - Demo App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            background: #f5f5f5;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border: 1px solid #ddd;
        }

        h1 {
            font-size: 1.8em;
            font-weight: 600;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #333;
        }

        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #333;
            text-decoration: none;
            border: 1px solid #333;
            padding: 8px 16px;
            font-size: 0.9em;
        }

        .back-link:hover {
            background: #333;
            color: white;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            border: 1px solid #ddd;
        }

        .info-table caption {
            background: #333;
            color: white;
            padding: 12px;
            font-size: 1.1em;
            font-weight: 600;
            text-align: left;
        }

        .info-table th {
            background: #fafafa;
            padding: 10px;
            text-align: left;
            font-weight: 600;
            font-size: 0.9em;
            border: 1px solid #ddd;
            width: 30%;
        }

        .info-table td {
            padding: 10px;
            font-size: 0.9em;
            border-bottom: 1px solid #ddd;
            color: #666;
        }

        .info-table tr:last-child td {
            border-bottom: 1px solid #ddd;
        }

        .info-table tr:hover {
            background: #fafafa;
        }

        code {
            background: #f0f0f0;
            padding: 2px 5px;
            font-family: 'Courier New', monospace;
            font-size: 0.85em;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="index.html" class="back-link">← Volver al inicio</a>
        
        <h1>📋 Información Detallada del Sistema</h1>

        <!-- Información del Servidor -->
        <table class="info-table">
            <caption>🖥️ Información del Servidor</caption>
            <tr>
                <th>Servidor</th>
                <td><code><%= request.getServerName() %></code></td>
            </tr>
            <tr>
                <th>Puerto del Servidor</th>
                <td><code><%= request.getServerPort() %></code></td>
            </tr>
            <tr>
                <th>Servidor Info</th>
                <td><code><%= application.getServerInfo() %></code></td>
            </tr>
            <tr>
                <th>Protocolo</th>
                <td><code><%= request.getProtocol() %></code></td>
            </tr>
            <tr>
                <th>Esquema</th>
                <td><code><%= request.getScheme() %></code></td>
            </tr>
            <tr>
                <th>Conexión Segura</th>
                <td><code><%= request.isSecure() ? "Sí (HTTPS)" : "No (HTTP)" %></code></td>
            </tr>
        </table>

        <!-- Información de la Petición -->
        <table class="info-table">
            <caption>📨 Información de la Petición</caption>
            <tr>
                <th>Método HTTP</th>
                <td><code><%= request.getMethod() %></code></td>
            </tr>
            <tr>
                <th>URI de Petición</th>
                <td><code><%= request.getRequestURI() %></code></td>
            </tr>
            <tr>
                <th>URL de Petición</th>
                <td><code><%= request.getRequestURL() %></code></td>
            </tr>
            <tr>
                <th>Context Path</th>
                <td><code><%= request.getContextPath() %></code></td>
            </tr>
            <tr>
                <th>Servlet Path</th>
                <td><code><%= request.getServletPath() %></code></td>
            </tr>
            <tr>
                <th>Query String</th>
                <td><code><%= request.getQueryString() != null ? request.getQueryString() : "N/A" %></code></td>
            </tr>
        </table>

        <!-- Información del Cliente -->
        <table class="info-table">
            <caption>👤 Información del Cliente</caption>
            <tr>
                <th>IP del Cliente</th>
                <td><code><%= request.getRemoteAddr() %></code></td>
            </tr>
            <tr>
                <th>Host del Cliente</th>
                <td><code><%= request.getRemoteHost() %></code></td>
            </tr>
            <tr>
                <th>Puerto del Cliente</th>
                <td><code><%= request.getRemotePort() %></code></td>
            </tr>
            <tr>
                <th>User Agent</th>
                <td><code><%= request.getHeader("User-Agent") != null ? request.getHeader("User-Agent") : "N/A" %></code></td>
            </tr>
            <tr>
                <th>Lenguaje Preferido</th>
                <td><code><%= request.getLocale() %></code></td>
            </tr>
        </table>

        <!-- Información de Java -->
        <table class="info-table">
            <caption>☕ Información de Java</caption>
            <tr>
                <th>Versión de Java</th>
                <td><code><%= System.getProperty("java.version") %></code></td>
            </tr>
            <tr>
                <th>Proveedor de Java</th>
                <td><code><%= System.getProperty("java.vendor") %></code></td>
            </tr>
            <tr>
                <th>Java Home</th>
                <td><code><%= System.getProperty("java.home") %></code></td>
            </tr>
            <tr>
                <th>Sistema Operativo</th>
                <td><code><%= System.getProperty("os.name") %> <%= System.getProperty("os.version") %></code></td>
            </tr>
            <tr>
                <th>Arquitectura</th>
                <td><code><%= System.getProperty("os.arch") %></code></td>
            </tr>
            <tr>
                <th>Memoria Máxima JVM</th>
                <td><code><%= Runtime.getRuntime().maxMemory() / (1024 * 1024) %> MB</code></td>
            </tr>
            <tr>
                <th>Memoria Total JVM</th>
                <td><code><%= Runtime.getRuntime().totalMemory() / (1024 * 1024) %> MB</code></td>
            </tr>
            <tr>
                <th>Memoria Libre JVM</th>
                <td><code><%= Runtime.getRuntime().freeMemory() / (1024 * 1024) %> MB</code></td>
            </tr>
        </table>

        <!-- Información de la Sesión -->
        <table class="info-table">
            <caption>🔐 Información de la Sesión</caption>
            <tr>
                <th>ID de Sesión</th>
                <td><code><%= session.getId() %></code></td>
            </tr>
            <tr>
                <th>Hora de Creación</th>
                <td><code><%= new java.util.Date(session.getCreationTime()) %></code></td>
            </tr>
            <tr>
                <th>Último Acceso</th>
                <td><code><%= new java.util.Date(session.getLastAccessedTime()) %></code></td>
            </tr>
            <tr>
                <th>Timeout de Sesión</th>
                <td><code><%= session.getMaxInactiveInterval() %> segundos</code></td>
            </tr>
            <tr>
                <th>Sesión Nueva</th>
                <td><code><%= session.isNew() ? "Sí" : "No" %></code></td>
            </tr>
        </table>

        <!-- Cabeceras HTTP -->
        <table class="info-table">
            <caption>📋 Cabeceras HTTP</caption>
            <%
                java.util.Enumeration<String> headerNames = request.getHeaderNames();
                while(headerNames.hasMoreElements()) {
                    String headerName = headerNames.nextElement();
                    String headerValue = request.getHeader(headerName);
            %>
            <tr>
                <th><%= headerName %></th>
                <td><code><%= headerValue %></code></td>
            </tr>
            <%
                }
            %>
        </table>

        <p style="text-align: center; color: #666; margin-top: 30px;">
            <strong>Última actualización:</strong> <%= new java.util.Date() %>
        </p>
    </div>
</body>
</html>
