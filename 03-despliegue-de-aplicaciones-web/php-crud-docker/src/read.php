<?php
// Check existence of id parameter before processing further
if(isset($_GET["id"]) && !empty(trim($_GET["id"]))){
    // Include config file
    require_once "config.php";
    
    // Prepare a select statement
    $sql = "SELECT * FROM employees WHERE id = ?";
    
    if($stmt = mysqli_prepare($link, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "i", $param_id);
        
        // Set parameters
        $param_id = trim($_GET["id"]);
        
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            $result = mysqli_stmt_get_result($stmt);
    
            if(mysqli_num_rows($result) == 1){
                /* Fetch result row as an associative array. Since the result set
                contains only one row, we don't need to use while loop */
                $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
                
                // Retrieve individual field value
                $name = $row["name"];
                $address = $row["address"];
                $salary = $row["salary"];
            } else{
                // URL doesn't contain valid id parameter. Redirect to error page
                header("location: error.php");
                exit();
            }
            
        } else{
            echo "¡Oops! Algo salió mal. Por favor, intenta de nuevo más tarde.";
        }
    }
     
    // Close statement
    mysqli_stmt_close($stmt);
    
    // Close connection
    mysqli_close($link);
} else{
    // URL doesn't contain id parameter. Redirect to error page
    header("location: error.php");
    exit();
}
?>
 
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Empleado</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 30px 0;
        }
        .wrapper {
            max-width: 600px;
            margin: 0 auto;
        }
        .card {
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .info-label {
            font-weight: 600;
            color: #6c757d;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .info-value {
            font-size: 1.1rem;
            color: #212529;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="card">
            <div class="card-header bg-info text-white">
                <h2 class="mb-0">
                    <i class="bi bi-eye-fill me-2"></i>Detalle del Empleado
                </h2>
            </div>
            <div class="card-body p-4">
                <div class="mb-4">
                    <p class="info-label">
                        <i class="bi bi-person me-1"></i>Nombre
                    </p>
                    <p class="info-value"><?php echo $row["name"]; ?></p>
                </div>
                <div class="mb-4">
                    <p class="info-label">
                        <i class="bi bi-geo-alt me-1"></i>Dirección
                    </p>
                    <p class="info-value"><?php echo $row["address"]; ?></p>
                </div>
                <div class="mb-4">
                    <p class="info-label">
                        <i class="bi bi-currency-euro me-1"></i>Salario
                    </p>
                    <p class="info-value"><?php echo number_format($row["salary"], 2); ?> €</p>
                </div>
                <div class="d-grid">
                    <a href="index.php" class="btn btn-primary btn-lg">
                        <i class="bi bi-arrow-left me-2"></i>Volver
                    </a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
