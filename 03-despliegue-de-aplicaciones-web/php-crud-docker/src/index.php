<?php
// Configurar salida UTF-8
header('Content-Type: text/html; charset=utf-8');

// Include config file
require_once "config.php";

// Attempt select query execution
$sql = "SELECT * FROM employees ORDER BY id DESC";
$result = mysqli_query($link, $sql);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Empleados - CRUD</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .header-actions {
            margin-bottom: 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            cursor: pointer;
            border: none;
            font-size: 14px;
            transition: all 0.3s;
        }
        .btn-primary {
            background-color: #007bff;
            color: white;
        }
        .btn-primary:hover {
            background-color: #0056b3;
        }
        .btn-info {
            background-color: #17a2b8;
            color: white;
        }
        .btn-info:hover {
            background-color: #138496;
        }
        .btn-sm {
            padding: 6px 12px;
            font-size: 13px;
        }
        .btn-warning {
            background-color: #ffc107;
            color: #000;
        }
        .btn-warning:hover {
            background-color: #e0a800;
        }
        .btn-danger {
            background-color: #dc3545;
            color: white;
        }
        .btn-danger:hover {
            background-color: #c82333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th {
            background-color: #343a40;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #dee2e6;
        }
        tr:hover {
            background-color: #f8f9fa;
        }
        .actions {
            display: flex;
            gap: 5px;
        }
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #6c757d;
        }
        .empty-state h3 {
            margin-bottom: 10px;
        }
        .info-total {
            margin-top: 15px;
            padding: 10px;
            background-color: #e9ecef;
            border-radius: 4px;
            font-size: 14px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            text-align: center;
            color: #6c757d;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Sistema de Gestion de Empleados</h1>
        <p class="subtitle">Aplicacion CRUD con PHP, MySQL, Docker, SSL y GoAccess</p>

        <div class="header-actions">
            <a href="create.php" class="btn btn-primary">+ Nuevo Empleado</a>
            <a href="/analytics.php" class="btn btn-info">Ver Analytics</a>
        </div>

        <?php
        if($result && mysqli_num_rows($result) > 0){
            echo '<table>';
            echo '<thead>';
            echo '<tr>';
            echo '<th style="width: 60px">ID</th>';
            echo '<th>Nombre</th>';
            echo '<th>Direccion</th>';
            echo '<th style="width: 120px">Salario</th>';
            echo '<th style="width: 200px">Acciones</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';
            
            while($row = mysqli_fetch_array($result)){
                echo '<tr>';
                echo '<td><strong>' . $row['id'] . '</strong></td>';
                echo '<td>' . $row['name'] . '</td>';
                echo '<td>' . $row['address'] . '</td>';
                echo '<td><strong>' . number_format($row['salary'], 2) . ' €</strong></td>';
                echo '<td class="actions">';
                echo '<a href="read.php?id=' . $row['id'] . '" class="btn btn-info btn-sm">Ver</a>';
                echo '<a href="update.php?id=' . $row['id'] . '" class="btn btn-warning btn-sm">Editar</a>';
                echo '<a href="delete.php?id=' . $row['id'] . '" class="btn btn-danger btn-sm">Eliminar</a>';
                echo '</td>';
                echo '</tr>';
            }
            
            echo '</tbody>';
            echo '</table>';
            
            $total = mysqli_num_rows($result);
            echo '<div class="info-total">';
            echo 'Total de empleados registrados: <strong>' . $total . '</strong>';
            echo '</div>';
            
            mysqli_free_result($result);
        } else {
            echo '<div class="empty-state">';
            echo '<h3>No hay empleados registrados</h3>';
            echo '<p>La base de datos esta vacia. Anade el primer empleado para comenzar.</p>';
            echo '<a href="create.php" class="btn btn-primary">+ Anadir Primer Empleado</a>';
            echo '</div>';
        }
        
        mysqli_close($link);
        ?>

        <div class="footer">
            <p><strong>Proyecto CRUD con Docker</strong></p>
            <p>PHP 8.2 + Apache + MySQL 8.0 + SSL/HTTPS + mod_rewrite + GoAccess</p>
        </div>
    </div>
</body>
</html>
