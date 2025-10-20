<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Análisis de Logs - GoAccess</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .frame-container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            overflow: hidden;
            height: calc(100vh - 100px);
        }
        .frame-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
        }
        .alert-info {
            margin: 20px;
        }
        iframe {
            width: 100%;
            height: calc(100% - 180px);
            border: none;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="frame-container">
            <div class="frame-header">
                <h2 class="mb-0">📊 Análisis de Logs en Tiempo Real - GoAccess</h2>
                <small>Monitoreo de tráfico web del servidor Apache</small>
            </div>
            <div class="alert alert-info mx-3 mt-3">
                <strong>ℹ️ Nota sobre WebSocket:</strong> 
                El reporte se muestra correctamente. Para actualizaciones en tiempo real vía WebSocket, 
                GoAccess escucha en el puerto 7890. 
                <a href="http://localhost:7890" target="_blank" class="alert-link">Test conexión WS</a> | 
                <a href="/test-goaccess.php" class="alert-link">Diagnóstico completo</a>
            </div>
            <iframe src="/goaccess/report.html"></iframe>
        </div>
    </div>
    <script>
        // Recargar el iframe cada 30 segundos como fallback si WebSocket no funciona
        setInterval(function() {
            const iframe = document.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src;
            }
        }, 30000);
    </script>
</body>
</html>
