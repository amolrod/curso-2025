<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prueba PHP - Apache en Docker</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 800px;
            width: 100%;
            padding: 40px;
        }
        
        h1 {
            color: #667eea;
            margin-bottom: 30px;
            text-align: center;
            font-size: 2.5em;
        }
        
        .php-info {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .info-row:last-child {
            border-bottom: none;
        }
        
        .info-label {
            font-weight: bold;
            color: #333;
        }
        
        .info-value {
            color: #666;
            text-align: right;
        }
        
        .success-badge {
            background: #28a745;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            display: inline-block;
            margin: 10px 0;
        }
        
        .nav-links {
            margin-top: 30px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .nav-links a {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            transition: transform 0.3s ease;
            display: inline-block;
        }
        
        .nav-links a:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .server-info {
            background: #e7f3ff;
            border-left: 4px solid #2196F3;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🐘 Prueba PHP Exitosa</h1>
        
        <div class="success-badge">
            ✓ PHP está funcionando correctamente
        </div>
        
        <div class="php-info">
            <h2 style="color: #667eea; margin-bottom: 15px;">📊 Información de PHP</h2>
            
            <div class="info-row">
                <span class="info-label">Versión de PHP:</span>
                <span class="info-value"><?php echo phpversion(); ?></span>
            </div>
            
            <div class="info-row">
                <span class="info-label">Servidor:</span>
                <span class="info-value"><?php echo $_SERVER['SERVER_SOFTWARE']; ?></span>
            </div>
            
            <div class="info-row">
                <span class="info-label">Sistema Operativo:</span>
                <span class="info-value"><?php echo PHP_OS; ?></span>
            </div>
            
            <div class="info-row">
                <span class="info-label">Fecha y Hora del Servidor:</span>
                <span class="info-value"><?php echo date('d/m/Y H:i:s'); ?></span>
            </div>
            
            <div class="info-row">
                <span class="info-label">Nombre del Host:</span>
                <span class="info-value"><?php echo gethostname(); ?></span>
            </div>
            
            <div class="info-row">
                <span class="info-label">Document Root:</span>
                <span class="info-value"><?php echo $_SERVER['DOCUMENT_ROOT']; ?></span>
            </div>
        </div>
        
        <div class="server-info">
            <h3 style="color: #2196F3; margin-bottom: 10px;">🔧 Extensiones PHP Cargadas</h3>
            <p style="color: #666; line-height: 1.6;">
                <?php 
                    $extensions = get_loaded_extensions();
                    echo implode(', ', array_slice($extensions, 0, 15));
                    if (count($extensions) > 15) {
                        echo '... y ' . (count($extensions) - 15) . ' más';
                    }
                ?>
            </p>
        </div>
        
        <div class="php-info">
            <h3 style="color: #667eea; margin-bottom: 10px;">💾 Configuración de Memoria</h3>
            
            <div class="info-row">
                <span class="info-label">Límite de Memoria:</span>
                <span class="info-value"><?php echo ini_get('memory_limit'); ?></span>
            </div>
            
            <div class="info-row">
                <span class="info-label">Tamaño Máximo POST:</span>
                <span class="info-value"><?php echo ini_get('post_max_size'); ?></span>
            </div>
            
            <div class="info-row">
                <span class="info-label">Tamaño Máximo Upload:</span>
                <span class="info-value"><?php echo ini_get('upload_max_filesize'); ?></span>
            </div>
        </div>
        
        <div class="nav-links">
            <a href="prueba.html">🏠 Prueba HTML</a>
            <a href="http://localhost:8081/sample/hello.jsp">☕ Sample JSP</a>
            <a href="http://localhost:8081/Formulario">📝 Formulario</a>
            <a href="http://localhost:8081/manager">⚙️ Tomcat Manager</a>
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?info=full" onclick="return confirm('¿Mostrar phpinfo() completo? Puede contener información sensible.');">📋 PHPInfo Completo</a>
        </div>
        
        <?php
        if (isset($_GET['info']) && $_GET['info'] === 'full') {
            echo '<div style="margin-top: 30px;">';
            phpinfo();
            echo '</div>';
        }
        ?>
    </div>
</body>
</html>
