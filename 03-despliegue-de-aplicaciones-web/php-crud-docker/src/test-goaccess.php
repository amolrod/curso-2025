<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test GoAccess</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background: #1a1a1a;
            color: #00ff00;
            padding: 20px;
        }
        .status { margin: 10px 0; padding: 10px; background: #2a2a2a; border-left: 4px solid #00ff00; }
        .error { border-left-color: #ff0000; color: #ff0000; }
        .success { border-left-color: #00ff00; }
        pre { background: #000; padding: 10px; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>🔍 Diagnóstico GoAccess</h1>
    
    <?php
    // 1. Verificar si el archivo existe
    $reportPath = '/var/www/html/goaccess/report.html';
    echo '<div class="status">';
    if (file_exists($reportPath)) {
        echo '<strong>✅ Archivo report.html existe:</strong> ' . $reportPath;
        echo '<br>Tamaño: ' . number_format(filesize($reportPath)) . ' bytes';
        echo '<br>Última modificación: ' . date('Y-m-d H:i:s', filemtime($reportPath));
    } else {
        echo '<strong class="error">❌ ERROR: Archivo no encontrado:</strong> ' . $reportPath;
    }
    echo '</div>';
    
    // 2. Verificar proceso GoAccess
    echo '<div class="status">';
    exec('ps aux | grep goaccess | grep -v grep', $output, $return);
    if ($return === 0 && count($output) > 0) {
        echo '<strong>✅ Proceso GoAccess activo:</strong>';
        echo '<pre>' . htmlspecialchars(implode("\n", $output)) . '</pre>';
    } else {
        echo '<strong class="error">❌ ERROR: GoAccess no está ejecutándose</strong>';
    }
    echo '</div>';
    
    // 3. Verificar puerto WebSocket
    echo '<div class="status">';
    exec('lsof -i :7890 2>/dev/null || ss -tlnp | grep 7890', $portOutput, $portReturn);
    if (!empty($portOutput)) {
        echo '<strong>✅ Puerto 7890 escuchando:</strong>';
        echo '<pre>' . htmlspecialchars(implode("\n", $portOutput)) . '</pre>';
    } else {
        echo '<strong>⚠️ Puerto 7890 - información no disponible</strong>';
    }
    echo '</div>';
    
    // 4. Leer primeras líneas del log de Apache
    echo '<div class="status">';
    $logPath = '/var/log/apache2/access.log';
    if (file_exists($logPath)) {
        $logLines = file($logPath);
        $lastLines = array_slice($logLines, -5);
        echo '<strong>✅ Últimas 5 líneas del access.log:</strong>';
        echo '<pre>' . htmlspecialchars(implode('', $lastLines)) . '</pre>';
    } else {
        echo '<strong class="error">❌ Log no encontrado</strong>';
    }
    echo '</div>';
    
    // 5. Información del servidor
    echo '<div class="status">';
    echo '<strong>📡 Información del servidor:</strong><br>';
    echo 'Host: ' . $_SERVER['HTTP_HOST'] . '<br>';
    echo 'Protocolo: ' . $_SERVER['SERVER_PROTOCOL'] . '<br>';
    echo 'Puerto: ' . $_SERVER['SERVER_PORT'] . '<br>';
    echo 'HTTPS: ' . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'Sí' : 'No');
    echo '</div>';
    
    // 6. URL de acceso a GoAccess
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $wsProtocol = $protocol === 'https' ? 'wss' : 'ws';
    
    echo '<div class="status success">';
    echo '<strong>🔗 URLs de acceso:</strong><br>';
    echo 'Reporte HTML: <a href="/goaccess/report.html" target="_blank" style="color: #00ff00;">' . $protocol . '://' . $host . '/goaccess/report.html</a><br>';
    echo 'Analytics (iframe): <a href="/analytics.php" target="_blank" style="color: #00ff00;">' . $protocol . '://' . $host . '/analytics.php</a><br>';
    echo 'WebSocket esperado: ' . $wsProtocol . '://' . str_replace(':8443', ':7890', $host) . '<br>';
    echo '<br><small>⚠️ Si estás usando HTTPS con puerto personalizado (8443), el WebSocket debe conectarse a ws://localhost:7890</small>';
    echo '</div>';
    ?>
    
    <div class="status">
        <strong>🔄 Acciones:</strong><br>
        <a href="/test-goaccess.php" style="color: #00ff00;">🔄 Recargar diagnóstico</a> | 
        <a href="/goaccess/report.html" target="_blank" style="color: #00ff00;">📊 Ver reporte directo</a> | 
        <a href="/analytics.php" target="_blank" style="color: #00ff00;">📈 Ver analytics</a> |
        <a href="/" style="color: #00ff00;">🏠 Volver al inicio</a>
    </div>
</body>
</html>
