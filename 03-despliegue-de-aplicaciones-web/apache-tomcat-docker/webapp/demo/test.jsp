<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Pruebas - Demo App</title>
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
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border: 1px solid #ddd;
        }

        h1 {
            font-size: 1.8em;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .subtitle {
            color: #666;
            font-size: 0.95em;
            margin-bottom: 25px;
            padding-bottom: 15px;
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

        .test-section {
            background: #fafafa;
            padding: 20px;
            margin-bottom: 20px;
            border-left: 3px solid #333;
        }

        .test-section h2 {
            font-size: 1.2em;
            font-weight: 600;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #ddd;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            font-size: 0.9em;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            font-size: 0.9em;
            font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #333;
        }

        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }

        .btn {
            background: #333;
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.2s;
        }

        .btn:hover {
            background: #555;
        }

        .result-box {
            background: white;
            border: 1px solid #ddd;
            border-left: 3px solid #333;
            padding: 15px;
            margin-top: 15px;
        }

        .result-box h3 {
            font-size: 1em;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .result-content {
            color: #666;
            font-size: 0.9em;
            line-height: 1.6;
        }

        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            background: #eee;
            border: 1px solid #ccc;
            font-size: 0.85em;
            margin: 5px 5px 5px 0;
        }

        .status-success {
            background: #333;
            color: white;
            border-color: #333;
        }

        .status-info {
            background: #666;
            color: white;
            border-color: #666;
        }

        .status-warning {
            background: #999;
            color: white;
            border-color: #999;
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
        <a href="index.html" class="back-link">← Volver</a>
        
        <h1>Página de Pruebas</h1>
        <p class="subtitle">Prueba las funcionalidades de la aplicación JSP</p>

        <!-- Test de Variables de Sesión -->
        <div class="test-section">
            <h2>🔐 Test de Variables de Sesión</h2>
            <form method="post">
                <div class="form-group">
                    <label for="sessionKey">Clave:</label>
                    <input type="text" id="sessionKey" name="sessionKey" placeholder="Ej: usuario">
                </div>
                <div class="form-group">
                    <label for="sessionValue">Valor:</label>
                    <input type="text" id="sessionValue" name="sessionValue" placeholder="Ej: admin">
                </div>
                <button type="submit" name="action" value="setSession" class="btn">
                    Guardar en Sesión
                </button>
                <button type="submit" name="action" value="clearSession" class="btn" style="background: #dc3545;">
                    Limpiar Sesión
                </button>
            </form>

            <%
                String action = request.getParameter("action");
                
                if ("setSession".equals(action)) {
                    String key = request.getParameter("sessionKey");
                    String value = request.getParameter("sessionValue");
                    if (key != null && !key.trim().isEmpty() && value != null) {
                        session.setAttribute(key, value);
            %>
                        <div class="result-box">
                            <h3>✓ Variable guardada en sesión</h3>
                            <p class="result-content">
                                <strong>Clave:</strong> <code><%= key %></code><br>
                                <strong>Valor:</strong> <code><%= value %></code>
                            </p>
                        </div>
            <%
                    }
                } else if ("clearSession".equals(action)) {
                    session.invalidate();
            %>
                    <div class="result-box">
                        <h3>✓ Sesión limpiada</h3>
                        <p class="result-content">Todas las variables de sesión han sido eliminadas.</p>
                    </div>
            <%
                }
            %>

            <div class="result-box" style="margin-top: 15px; border-left-color: #3b82f6;">
                <h3 style="color: #3b82f6;">Variables en Sesión Actual:</h3>
                <div class="result-content">
                    <%
                        Enumeration<String> sessionAttributes = session.getAttributeNames();
                        if (!sessionAttributes.hasMoreElements()) {
                    %>
                        <p><em>No hay variables guardadas en la sesión</em></p>
                    <%
                        } else {
                            while(sessionAttributes.hasMoreElements()) {
                                String attrName = sessionAttributes.nextElement();
                                Object attrValue = session.getAttribute(attrName);
                    %>
                        <p><strong><%= attrName %>:</strong> <code><%= attrValue %></code></p>
                    <%
                            }
                        }
                    %>
                </div>
            </div>
        </div>

        <!-- Test de Operaciones -->
        <div class="test-section">
            <h2>🔢 Test de Operaciones Matemáticas</h2>
            <form method="get">
                <div class="form-group">
                    <label for="num1">Número 1:</label>
                    <input type="number" id="num1" name="num1" value="10">
                </div>
                <div class="form-group">
                    <label for="num2">Número 2:</label>
                    <input type="number" id="num2" name="num2" value="5">
                </div>
                <div class="form-group">
                    <label for="operation">Operación:</label>
                    <select id="operation" name="operation">
                        <option value="add">Suma</option>
                        <option value="subtract">Resta</option>
                        <option value="multiply">Multiplicación</option>
                        <option value="divide">División</option>
                    </select>
                </div>
                <button type="submit" name="calculate" value="true" class="btn">
                    Calcular
                </button>
            </form>

            <%
                String calculate = request.getParameter("calculate");
                if ("true".equals(calculate)) {
                    try {
                        int num1 = Integer.parseInt(request.getParameter("num1"));
                        int num2 = Integer.parseInt(request.getParameter("num2"));
                        String operation = request.getParameter("operation");
                        double result = 0;
                        String operationSymbol = "";

                        switch(operation) {
                            case "add":
                                result = num1 + num2;
                                operationSymbol = "+";
                                break;
                            case "subtract":
                                result = num1 - num2;
                                operationSymbol = "-";
                                break;
                            case "multiply":
                                result = num1 * num2;
                                operationSymbol = "×";
                                break;
                            case "divide":
                                if (num2 != 0) {
                                    result = (double) num1 / num2;
                                    operationSymbol = "÷";
                                } else {
                                    throw new ArithmeticException("División por cero");
                                }
                                break;
                        }
            %>
                        <div class="result-box">
                            <h3>✓ Resultado del Cálculo</h3>
                            <p class="result-content">
                                <strong><%= num1 %> <%= operationSymbol %> <%= num2 %> = <%= result %></strong>
                            </p>
                        </div>
            <%
                    } catch (Exception e) {
            %>
                        <div class="result-box" style="border-left-color: #dc3545;">
                            <h3 style="color: #dc3545;">✗ Error</h3>
                            <p class="result-content"><%= e.getMessage() %></p>
                        </div>
            <%
                    }
                }
            %>
        </div>

        <!-- Información del Estado -->
        <div class="test-section">
            <h2>📊 Estado del Sistema</h2>
            <div class="result-content">
                <span class="status-badge status-success">✓ Tomcat Activo</span>
                <span class="status-badge status-success">✓ JSP Funcionando</span>
                <span class="status-badge status-success">✓ Sesiones Habilitadas</span>
                <span class="status-badge status-info">Java <%= System.getProperty("java.version") %></span>
                <span class="status-badge status-info">Sesión: <%= session.getId().substring(0, 8) %>...</span>
                <span class="status-badge status-warning">Servidor: <%= request.getServerName() %>:<%= request.getServerPort() %></span>
            </div>
        </div>

        <p style="text-align: center; color: #666; margin-top: 30px;">
            <strong>Hora del servidor:</strong> <%= new Date() %>
        </p>
    </div>
</body>
</html>
